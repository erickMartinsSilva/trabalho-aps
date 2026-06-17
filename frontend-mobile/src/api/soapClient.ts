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
      const errorMsg = `Requisição SOAP falhou com status ${response.status}: ${errorText}`
      toast.error(errorMsg)
      throw new Error(errorMsg)
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
      throw new Error(errorMsg)
    }

    if (body.Fault) {
      const errorMsg = `Erro na API: ${body.Fault.faultstring || 'Erro desconhecido'}`
      toast.error(errorMsg)
      throw new Error(errorMsg)
    }

    // The response wrapper is typically the operation name + "Response"
    const responseWrapper = body[`${options.operation}Response`]
    return responseWrapper as TResponse
  } catch (err: any) {
    if (!err.message?.startsWith('Requisição SOAP falhou') && 
        !err.message?.startsWith('Resposta SOAP inválida') && 
        !err.message?.startsWith('Erro na API')) {
      toast.error(`Erro de conexão com o servidor: ${err.message}`)
    }
    throw err
  }
}

