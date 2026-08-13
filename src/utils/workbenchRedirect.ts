import workbenchDomains from '@/config/workbenchDomains.json'

interface WorkbenchDomainConfig {
  default: string
  domains: Readonly<Record<string, string>>
}

const workbenchConfig = workbenchDomains as WorkbenchDomainConfig
const configuredDomains = Object.entries(workbenchConfig.domains)
  .sort(([left], [right]) => right.length - left.length)

function normalizeHostname(hostname: string): string {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/, '')

  if (!normalized.startsWith('[') && normalized.includes(':')) {
    return normalized.split(':')[0]
  }

  return normalized
}

export function resolveWorkbenchUrl(
  homepageHostname: string,
): string {
  const hostname = normalizeHostname(homepageHostname)
  const matchedDomain = configuredDomains.find(([domain]) =>
    hostname === domain || hostname.endsWith(`.${domain}`)
  )

  return matchedDomain?.[1] ?? workbenchConfig.default
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
