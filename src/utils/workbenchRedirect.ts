export function buildWorkbenchSsoUrl(
  workbenchUrl: string,
  refreshToken: string,
  lang?: string
): string {
  const baseUrl = workbenchUrl.replace(/\/+$/, '')
  const url = new URL(`${baseUrl}/sso`)
  const hashParams = new URLSearchParams()

  hashParams.set('refreshToken', refreshToken)

  if (lang) {
    hashParams.set('lang', lang)
  }

  url.hash = hashParams.toString()

  return url.toString()
}
