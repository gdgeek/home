<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useBrand } from '@/composables/useBrand'

defineProps<{
  copyright: string
  version: string
}>()

const { t } = useI18n({ useScope: 'global' })
const { footer } = useBrand()
</script>

<template>
  <footer class="mu-footer">
    <div class="mu-footer__inner">
      <div class="mu-footer__brand">
        <img src="/logo/XRUGC/xrugc_logo.png" alt="XR UGC" class="mu-footer__logo" width="120" height="28" />
        <p>{{ t('xrugc.footer.tagline') }}</p>
      </div>
      <div class="mu-footer__links">
        <div v-for="(nav, idx) in footer.navigation" :key="idx" class="mu-footer__col">
          <h4>{{ nav.title }}</h4>
          <a v-for="link in nav.links" :key="link.text" :href="link.url">{{ link.text }}</a>
        </div>
      </div>
    </div>
    <div class="mu-footer__bottom">
      <span>{{ copyright || '© 2025 XR UGC. All rights reserved.' }}</span>
      <span class="mu-footer__ver">v{{ version }}</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $vl: mu.$vl;
$t1: mu.$t1; $tm: mu.$tm; $tf: mu.$tf;
$bd: mu.$bd; $mw: mu.$mw; $e: mu.$e;

.mu-footer {
  position:relative;z-index:1;border-top:1px solid $bd;margin-top:48px;
  &__inner{max-width:$mw;margin:0 auto;padding:40px 24px 24px;display:flex;align-items:flex-start;gap:48px;
    @media(max-width:768px){flex-direction:column;gap:28px}
  }
  &__brand{flex:1;p{font-size:14px;color:$tm;margin-top:10px;font-weight:300}}
  &__logo{height:28px}
  &__links{display:flex;flex-wrap:wrap;gap:32px;@media(max-width:768px){gap:20px}}
  &__col{display:flex;flex-direction:column;gap:8px;
    h4{font-size:12px;font-weight:700;color:$tf;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px}
    a{font-size:13px;color:$tm;text-decoration:none;font-weight:400;transition:color .2s;&:hover{color:$vl}}
  }
  &__bottom{max-width:$mw;margin:0 auto;padding:16px 24px;border-top:1px solid $bd;
    display:flex;justify-content:space-between;align-items:center;font-size:12px;color:$tf;font-weight:300;
    @media(max-width:480px){flex-direction:column;gap:8px;text-align:center}
  }
  &__ver{font-family:"Inter",monospace;opacity:.5}
}
</style>
