import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { toast } from 'sonner'

function getFriendlyErrorMessage(rawMessage: string): string | null {
  const mappings = [
    {
      patterns: ['fk_usuario', 'violates foreign key constraint "fk_usuario"'],
      message: 'Usuário não encontrado'
    },
    {
      patterns: ['referenced from table "reserva"', 'fk_espaco" on table "reserva"'],
      message: 'Não é possível remover este espaço pois existem reservas ativas para ele.'
    },
    {
      patterns: ['is not present in table "espaco"', 'fk_espaco'],
      message: 'Espaço não encontrado.'
    },
    {
      patterns: ['usuario_pkey', 'duplicate key value violates unique constraint'],
      message: 'Usuário (CPF) já cadastrado.'
    }
  ]

  const matched = mappings.find(m => 
    m.patterns.some(p => rawMessage.includes(p))
  )
  return matched ? matched.message : null
}

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
      },
      body: xmlRequest,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMsg = `Requisição SOAP falhou com status ${response.status}: ${errorText}`
      const friendly = getFriendlyErrorMessage(errorText)
      if (friendly) {
        errorMsg = friendly
      }
      toast.error(errorMsg)
      const error = new Error(errorMsg) as any
      error.alreadyToasted = true
      throw error
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
      const error = new Error(errorMsg) as any
      error.alreadyToasted = true
      throw error
    }

    if (body.Fault) {
      const faultString = String(body.Fault.faultstring || '')
      let errorMsg = `Erro na API: ${faultString || 'Erro desconhecido'}`
      const friendly = getFriendlyErrorMessage(faultString)
      if (friendly) {
        errorMsg = friendly
      }
      toast.error(errorMsg)
      const error = new Error(errorMsg) as any
      error.alreadyToasted = true
      throw error
    }

    const responseWrapper = body[`${options.operation}Response`]
    return responseWrapper as TResponse
  } catch (err: any) {
    if (!err.alreadyToasted) {
      toast.error(`Erro de conexão com o servidor: ${err.message}`)
    }
    throw err
  }
}

