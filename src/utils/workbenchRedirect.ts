const WORKBENCH_URL_BY_HOMEPAGE_HOST: Readonly<Record<string, string>> = {
  'xiading.cc': 'https://d.xiading.cc',
  'xiading.hxgxonline.com': 'https://d.xiading.hxgxonline.com',
}

function normalizeHostname(hostname: string): string {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/, '')

  if (!normalized.startsWith('[') && normalized.includes(':')) {
    return normalized.split(':')[0]
  }

  return normalized
}

export function resolveWorkbenchUrl(
  configuredWorkbenchUrl: string | undefined,
  homepageHostname: string,
): string | undefined {
  const hostname = normalizeHostname(homepageHostname)

  return WORKBENCH_URL_BY_HOMEPAGE_HOST[hostname] ?? configuredWorkbenchUrl
}

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
