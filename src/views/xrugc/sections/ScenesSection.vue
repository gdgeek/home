<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n({ useScope: 'global' })

const scenes = computed(() => [
  { title: t('xrugc.scenes.education.title'), desc: t('xrugc.scenes.education.desc'), image: '/images/ar-platform/高中生操作AR内容，欢笑.webp', tag: 'EDU' },
  { title: t('xrugc.scenes.healthcare.title'), desc: t('xrugc.scenes.healthcare.desc'), image: '/images/ar-platform/婴幼儿护理 外伤处理.webp', tag: 'MED' },
  { title: t('xrugc.scenes.industrial.title'), desc: t('xrugc.scenes.industrial.desc'), image: '/images/ar-platform/AR掘进机展示.webp', tag: 'IND' },
  { title: t('xrugc.scenes.entertainment.title'), desc: t('xrugc.scenes.entertainment.desc'), image: '/images/ar-platform/两个人玩AR游戏.webp', tag: 'PLAY' },
])
</script>

<template>
  <section id="scenes" class="mu-section mu-section--alt">
    <div class="mu-section__header reveal">
      <span class="mu-tag">{{ t('xrugc.scenes.tag') }}</span>
      <h2 class="mu-section__title">{{ t('xrugc.scenes.title') }}</h2>
    </div>
    <div class="mu-scenes reveal">
      <div v-for="(s, idx) in scenes" :key="idx" class="mu-scene">
        <div class="mu-scene__img">
          <img :src="s.image" :alt="s.title" loading="lazy" width="300" height="180" />
          <span class="mu-scene__tag">{{ s.tag }}</span>
        </div>
        <div class="mu-scene__body">
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $vl: mu.$vl; $o: mu.$o;
$bg2: mu.$bg2; $bgc: mu.$bgc; $t1: mu.$t1; $tm: mu.$tm;
$bd: mu.$bd; $bdh: mu.$bdh; $sl: mu.$sl; $r: mu.$r; $mw: mu.$mw; $e: mu.$e;

.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s $e, transform .8s $e; &.revealed{opacity:1;transform:translateY(0)} }

.mu-tag{display:inline-block;padding:6px 16px;background:rgba($v,.1);border:1px solid rgba($v,.2);border-radius:100px;font-size:13px;font-weight:600;color:$vl;letter-spacing:.06em;text-transform:uppercase}

.mu-section {
  position:relative;z-index:1;max-width:$mw;margin:0 auto;padding:80px 24px;
  @media(max-width:768px){padding:48px 16px}
  &--alt{background:$bg2;max-width:none;>*{max-width:$mw;margin-left:auto;margin-right:auto}}
  &__header{text-align:center;margin-bottom:48px}
  &__title{font-size:clamp(28px,4.5vw,44px);font-weight:800;color:$t1;margin-top:16px;letter-spacing:-.02em;line-height:1.2}
}

.mu-scenes{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;
  @media(max-width:1024px){grid-template-columns:repeat(2,1fr)}
  @media(max-width:600px){grid-template-columns:1fr}
}
.mu-scene {
  background:$bgc;border:1px solid $bd;border-radius:$r;overflow:hidden;transition:all .3s $e;cursor:pointer;
  &:hover{transform:translateY(-6px);border-color:$bdh;box-shadow:$sl;.mu-scene__img img{transform:scale(1.08)}}
  &__img{position:relative;height:180px;overflow:hidden;
    img{width:100%;height:100%;object-fit:cover;transition:transform .5s $e}
  }
  &__tag{position:absolute;top:10px;left:10px;padding:4px 10px;font-size:11px;font-weight:700;background:linear-gradient(135deg,$v,$o);color:white;border-radius:6px;letter-spacing:.06em}
  &__body{padding:18px;h3{font-size:16px;font-weight:700;color:$t1;margin-bottom:6px}p{font-size:13px;color:$tm;line-height:1.6}}
}

@media(prefers-reduced-motion:reduce){
  .reveal{transition:opacity .3s ease;transform:none}
  .reveal.revealed{transform:none}
  .mu-scene:hover{transform:none}
}
</style>
