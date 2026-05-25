const getRuntimeEnv = () =>
  (window as unknown as { __ENV__?: Record<string, string | undefined> }).__ENV__ || {}

const truthy = (value: string | undefined) =>
  Boolean(value && ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase()))

export const deploymentMode = () => {
  const viteEnv = import.meta.env as unknown as Record<string, string | undefined>
  const raw = getRuntimeEnv().DEPLOYMENT_MODE || getRuntimeEnv().VITE_APP_DEPLOYMENT_MODE || viteEnv.VITE_APP_DEPLOYMENT_MODE
  const mode = raw?.trim().toLowerCase()
  return mode === 'local' || mode === 'private' ? 'local' : 'cloud'
}

export function featureEnabled(name: string, defaultValue: boolean) {
  const viteEnv = import.meta.env as unknown as Record<string, string | undefined>
  const raw = getRuntimeEnv()[name] || viteEnv[name]
  if (!raw) return defaultValue
  return truthy(raw)
}

export function externalCdnEnabled() {
  return featureEnabled('ENABLE_EXTERNAL_CDN', deploymentMode() !== 'local')
}

export function loadExternalStylesheet(id: string, href: string) {
  if (!externalCdnEnabled() || document.getElementById(id)) {
    return
  }

  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}
