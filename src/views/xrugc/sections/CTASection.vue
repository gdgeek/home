<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  onOpenLogin: () => void
}>()

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section class="mu-cta reveal">
    <div class="mu-cta__inner">
      <h2>{{ t('xrugc.cta.title') }}</h2>
      <p>{{ t('xrugc.cta.desc') }}</p>
      <div class="mu-cta__actions">
        <button class="mu-btn mu-btn--white mu-btn--lg" @click="onOpenLogin">{{ t('xrugc.cta.primary') }}</button>
        <button class="mu-btn mu-btn--ghost-light mu-btn--lg">{{ t('xrugc.cta.secondary') }}</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $o: mu.$o; $r: mu.$r; $rs: mu.$rs; $mw: mu.$mw; $e: mu.$e;

.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s $e, transform .8s $e; &.revealed{opacity:1;transform:translateY(0)} }

.mu-btn {
  display:inline-flex;align-items:center;gap:8px;padding:10px 22px;font-family:inherit;font-size:14px;font-weight:600;
  border-radius:$rs;border:none;cursor:pointer;transition:all .25s $e;letter-spacing:.01em;
  &--white{background:white;color:$v;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.15);&:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.2)}}
  &--ghost-light{background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.2);&:hover{background:rgba(255,255,255,.2);color:white}}
  &--lg{padding:14px 30px;font-size:15px;border-radius:12px}
}

.mu-cta {
  position:relative;z-index:1;margin:0 24px;border-radius:24px;overflow:hidden;
  max-width:$mw;margin-left:auto;margin-right:auto;
  &::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba($v,.92) 0%,rgba(#0369A1,.88) 50%,rgba($o,.82) 100%);z-index:1}
  &__inner{position:relative;z-index:2;text-align:center;padding:64px 24px;
    h2{font-size:clamp(26px,4.5vw,40px);font-weight:800;color:white;margin-bottom:12px;letter-spacing:-.02em}
    p{font-size:16px;color:rgba(255,255,255,.75);margin-bottom:28px;font-weight:400;max-width:480px;margin-left:auto;margin-right:auto}
  }
  &__actions{display:flex;gap:14px;justify-content:center;
    @media(max-width:480px){flex-direction:column;align-items:center}
  }
}

@media(prefers-reduced-motion:reduce){
  .reveal{transition:opacity .3s ease;transform:none}
  .reveal.revealed{transform:none}
}
</style>
