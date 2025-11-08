function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default function Head() {
  const baseUrl = getBaseUrl()
  const canonicalUrl = `${baseUrl}/kalkulator/kredyt-hipoteczny`

  return (
    <>
      <title>Kalkulator kredytu hipotecznego | Kalkulator Kredytowy</title>
      <meta
        name="description"
        content="Policz ratę kredytu hipotecznego i porównaj aktualne oferty banków. Zobacz ranking dostosowany do Twoich parametrów finansowych."
      />
      <link rel="canonical" href={canonicalUrl} />
    </>
  )
}
