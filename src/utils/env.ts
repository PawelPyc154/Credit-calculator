import { type ZodObject, type ZodRawShape, z } from 'zod'

/**
 * Prosta walidacja zmiennych środowiskowych z Zod
 */
interface CreateEnvOptions<TServer extends ZodRawShape, TClient extends ZodRawShape> {
  server: TServer
  client: TClient
  runtimeEnv: Record<string, string | undefined>
  skipValidation?: boolean
  emptyStringAsUndefined?: boolean
}

function createEnv<TServer extends ZodRawShape, TClient extends ZodRawShape>({
  server,
  client,
  runtimeEnv,
  skipValidation,
  emptyStringAsUndefined,
}: CreateEnvOptions<TServer, TClient>): z.infer<ZodObject<TServer>> & z.infer<ZodObject<TClient>> {
  if (skipValidation) {
    return runtimeEnv as z.infer<ZodObject<TServer>> & z.infer<ZodObject<TClient>>
  }

  // Walidacja zmiennych serwerowych
  const serverSchema = z.object(server)

  // Walidacja zmiennych klienckich
  const clientSchema = z.object(client)

  // Przetwórz wartości jeśli emptyStringAsUndefined
  const processedEnv = emptyStringAsUndefined
    ? Object.fromEntries(
        Object.entries(runtimeEnv).map(([key, value]) => [key, value === '' ? undefined : value]),
      )
    : runtimeEnv

  // Waliduj zmienne serwerowe (tylko na serwerze)
  if (typeof window === 'undefined') {
    const serverEnv = Object.fromEntries(Object.keys(server).map((key) => [key, processedEnv[key]]))
    serverSchema.parse(serverEnv)
  }

  // Waliduj zmienne klienckie
  const clientEnv = Object.fromEntries(Object.keys(client).map((key) => [key, processedEnv[key]]))
  clientSchema.parse(clientEnv)

  return new Proxy(processedEnv, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined

      // Na kliencie blokuj dostęp do zmiennych serwerowych
      if (typeof window !== 'undefined' && prop in server) {
        throw new Error(`❌ Próba dostępu do zmiennej serwerowej "${prop}" po stronie klienta!`)
      }

      return target[prop]
    },
  }) as z.infer<ZodObject<TServer>> & z.infer<ZodObject<TClient>>
}

export const env = createEnv({
  /**
   * Zmienne środowiskowe po stronie serwera
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    // Google Analytics API (opcjonalne)
    GA4_PROPERTY_ID: z.string().optional(),
    GOOGLE_APPLICATION_CREDENTIALS_JSON: z.string().optional(),
  },

  /**
   * Zmienne środowiskowe po stronie klienta
   * Muszą mieć prefix NEXT_PUBLIC_
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * Mapowanie zmiennych z process.env
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID,
    GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  /**
   * Pomiń walidację (przydatne dla Docker builds)
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Traktuj puste stringi jako undefined
   */
  emptyStringAsUndefined: true,
})
