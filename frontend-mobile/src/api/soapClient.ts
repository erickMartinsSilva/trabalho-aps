import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { toast } from 'sonner'

export interface SoapClientOptions {
  endpointPath: string
  namespace: string
  operation: string
}

export async function callSoapService<TResponse>(
  options: SoapClientOptions,
  requestPayload: Record<string, any>
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
        // Optional: some servers require SOAPAction
        // 'SOAPAction': '' 
      },
      body: xmlRequest,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMsg = `Requisição SOAP falhou com status ${response.status}: ${errorText}`
      if (errorText.includes('fk_usuario') || errorText.includes('violates foreign key constraint "fk_usuario"')) {
        errorMsg = 'Usuário não encontrado'
      } else if (errorText.includes('fk_espaco') || errorText.includes('violates foreign key constraint "fk_espaco"')) {
        errorMsg = 'Não é possível remover este espaço pois existem reservas ativas para ele.'
      }
      toast.error(errorMsg)
      const error = new Error(errorMsg) as any
      error.alreadyToasted = true
      throw error
    }

    const xmlResponse = await response.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: true, // This makes it much easier to access properties
    })

    const parsed = parser.parse(xmlResponse)
    const body = parsed?.Envelope?.Body

    if (!body) {
      const errorMsg = 'Resposta SOAP inválida: missing Envelope/Body'
      toast.error(errorMsg)
      const error = new Error(errorMsg) as any
      error.alreadyToasted = true
      throw error
    }

    if (body.Fault) {
      const faultString = String(body.Fault.faultstring || '')
      let errorMsg = `Erro na API: ${faultString || 'Erro desconhecido'}`
      if (faultString.includes('fk_usuario') || faultString.includes('violates foreign key constraint "fk_usuario"')) {
        errorMsg = 'Usuário não encontrado'
      } else if (faultString.includes('fk_espaco') || faultString.includes('violates foreign key constraint "fk_espaco"')) {
        errorMsg = 'Não é possível remover este espaço pois existem reservas ativas para ele.'
      }
      toast.error(errorMsg)
      const error = new Error(errorMsg) as any
      error.alreadyToasted = true
      throw error
    }

    // The response wrapper is typically the operation name + "Response"
    const responseWrapper = body[`${options.operation}Response`]
    return responseWrapper as TResponse
  } catch (err: any) {
    if (!err.alreadyToasted) {
      toast.error(`Erro de conexão com o servidor: ${err.message}`)
    }
    throw err
  }
}

