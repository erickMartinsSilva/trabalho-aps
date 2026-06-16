import { XMLParser, XMLBuilder } from 'fast-xml-parser'

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

  // Determine prefix based on the namespace URL, or use a generic 'tns'
  const prefix = 'tns'

  const envelope = {
    'soapenv:Envelope': {
      '@_xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      [`@_xmlns:${prefix}`]: options.namespace,
      'soapenv:Header': {},
      'soapenv:Body': {
        [`${prefix}:${options.operation}Request`]: requestPayload
      }
    }
  }

  const xmlRequest = `<?xml version="1.0" encoding="utf-8"?>\n${builder.build(envelope)}`

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
    throw new Error(`SOAP request failed with status ${response.status}: ${errorText}`)
  }

  const xmlResponse = await response.text()

  const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: true, // This makes it much easier to access properties
  })

  const parsed = parser.parse(xmlResponse)
  const body = parsed?.Envelope?.Body

  if (!body) {
    throw new Error('Invalid SOAP response: missing Envelope/Body')
  }

  if (body.Fault) {
    throw new Error(`SOAP Fault: ${body.Fault.faultstring || 'Unknown error'}`)
  }

  // The response wrapper is typically the operation name + "Response"
  const responseWrapper = body[`${options.operation}Response`]
  return responseWrapper as TResponse
}
