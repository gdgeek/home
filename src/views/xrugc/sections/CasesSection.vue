<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n({ useScope: 'global' })

const cases = computed(() => [
  { org: t('xrugc.cases.c1.org'), quote: t('xrugc.cases.c1.quote'), person: t('xrugc.cases.c1.person'), role: t('xrugc.cases.c1.role'),
    stat: { value: t('xrugc.cases.c1.statVal'), label: t('xrugc.cases.c1.statLabel') } },
  { org: t('xrugc.cases.c2.org'), quote: t('xrugc.cases.c2.quote'), person: t('xrugc.cases.c2.person'), role: t('xrugc.cases.c2.role'),
    stat: { value: t('xrugc.cases.c2.statVal'), label: t('xrugc.cases.c2.statLabel') } },
  { org: t('xrugc.cases.c3.org'), quote: t('xrugc.cases.c3.quote'), person: t('xrugc.cases.c3.person'), role: t('xrugc.cases.c3.role'),
    stat: { value: t('xrugc.cases.c3.statVal'), label: t('xrugc.cases.c3.statLabel') } },
])
</script>

<template>
  <section id="cases" class="mu-section">
    <div class="mu-section__header reveal">
      <span class="mu-tag">{{ t('xrugc.cases.tag') }}</span>
      <h2 class="mu-section__title">{{ t('xrugc.cases.title') }}</h2>
    </div>
    <div class="mu-testimonials">
      <div v-for="(c, idx) in cases" :key="idx" class="mu-testimonial reveal">
        <div class="mu-testimonial__top">
          <span class="mu-testimonial__mark">&ldquo;</span>
          <div class="mu-testimonial__stat">
            <span class="mu-testimonial__stat-val">{{ c.stat.value }}</span>
            <span class="mu-testimonial__stat-lbl">{{ c.stat.label }}</span>
          </div>
        </div>
        <blockquote>{{ c.quote }}</blockquote>
        <div class="mu-testimonial__author">
          <span class="mu-testimonial__org">{{ c.org }}</span>
          <span class="mu-testimonial__person">{{ c.person }} &middot; {{ c.role }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $vl: mu.$vl; $o: mu.$o;
$bgc: mu.$bgc; $t1: mu.$t1; $t2: mu.$t2; $tm: mu.$tm; $tf: mu.$tf;
$bd: mu.$bd; $bdh: mu.$bdh; $sl: mu.$sl; $r: mu.$r; $mw: mu.$mw; $e: mu.$e;

.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s $e, transform .8s $e; &.revealed{opacity:1;transform:translateY(0)} }

.mu-tag{display:inline-block;padding:6px 16px;background:rgba($v,.1);border:1px solid rgba($v,.2);border-radius:100px;font-size:13px;font-weight:600;color:$vl;letter-spacing:.06em;text-transform:uppercase}

.mu-section {
  position:relative;z-index:1;max-width:$mw;margin:0 auto;padding:80px 24px;
  @media(max-width:768px){padding:48px 16px}
  &__header{text-align:center;margin-bottom:48px}
  &__title{font-size:clamp(28px,4.5vw,44px);font-weight:800;color:$t1;margin-top:16px;letter-spacing:-.02em;line-height:1.2}
}

.mu-testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;
  @media(max-width:1024px){grid-template-columns:1fr;max-width:560px;margin:0 auto}
}
.mu-testimonial {
  padding:28px;background:$bgc;border:1px solid $bd;border-radius:$r;transition:all .3s $e;display:flex;flex-direction:column;
  &:hover{border-color:$bdh;transform:translateY(-3px);box-shadow:$sl}
  &__top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
  &__mark{font-size:56px;font-weight:900;line-height:.7;color:rgba($v,.2)}
  &__stat{text-align:right}
  &__stat-val{display:block;font-size:28px;font-weight:900;color:$o;line-height:1.1}
  &__stat-lbl{font-size:12px;color:$tf}
  blockquote{font-size:15px;color:$t2;line-height:1.7;margin:0 0 auto;padding-bottom:20px;font-style:italic;font-weight:300}
  &__author{display:flex;flex-direction:column;gap:2px;padding-top:16px;border-top:1px solid rgba($v,.08)}
  &__org{font-size:14px;font-weight:700;color:$t1}
  &__person{font-size:13px;color:$tf}
}

@media(prefers-reduced-motion:reduce){
  .reveal{transition:opacity .3s ease;transform:none}
  .reveal.revealed{transform:none}
  .mu-testimonial:hover{transform:none}
}
</style>
