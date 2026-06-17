import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { toast } from 'sonner'

export interface SoapClientOptions {
  endpointPath: string
  namespace: string
  operation: string
}

export async function callSoapService<TResponse>(
  options: SoapClientOptions,
  requestPayload: Record<string, unknown>
): Promise<TResponse> {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/ws'
  const url = `${baseUrl}${options.endpointPath}`

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
  })

  const envelope = {
    'soapenv:Envelope': {
      '@_xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      '@_xmlns': options.namespace,
      'soapenv:Header': {},
      'soapenv:Body': {
        [`${options.operation}Request`]: requestPayload
      }
    }
  }

  const xmlRequest = `<?xml version="1.0" encoding="utf-8"?>\n${builder.build(envelope)}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
      },
      body: xmlRequest,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMsg = `Requisição SOAP falhou com status ${response.status}: ${errorText}`
      if (errorText.includes('fk_usuario') || errorText.includes('violates foreign key constraint "fk_usuario"')) {
        errorMsg = 'Usuário não encontrado'
      }
      toast.error(errorMsg)
      throw new Error(errorMsg)
    }

    const xmlResponse = await response.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: true,
    })

    const parsed = parser.parse(xmlResponse)
    const body = parsed?.Envelope?.Body

    if (!body) {
      const errorMsg = 'Resposta SOAP inválida: missing Envelope/Body'
      toast.error(errorMsg)
      throw new Error(errorMsg)
    }

    if (body.Fault) {
      const faultString = String(body.Fault.faultstring || '')
      let errorMsg = `Erro na API: ${faultString || 'Erro desconhecido'}`
      if (faultString.includes('fk_usuario') || faultString.includes('violates foreign key constraint "fk_usuario"')) {
        errorMsg = 'Usuário não encontrado'
      }
      toast.error(errorMsg)
      throw new Error(errorMsg)
    }

    const responseWrapper = body[`${options.operation}Response`]
    return responseWrapper as TResponse
  } catch (err) {
    const error = err as Error
    if (!error.message?.startsWith('Requisição SOAP falhou') && 
        !error.message?.startsWith('Resposta SOAP inválida') && 
        !error.message?.startsWith('Erro na API') &&
        error.message !== 'Usuário não encontrado') {
      toast.error(`Erro de conexão com o servidor: ${error.message}`)
    }
    throw err
  }
}
