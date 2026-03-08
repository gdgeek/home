<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n({ useScope: 'global' })

const features = computed(() => [
  { id: 'editor', title: t('xrugc.features.editor.title'), desc: t('xrugc.features.editor.desc'),
    image: '/images/ar-platform/UGC场景编辑器界面.webp', icon: '🎨' },
  { id: 'logic', title: t('xrugc.features.logic.title'), desc: t('xrugc.features.logic.desc'),
    image: '/images/ar-platform/拖拽程序生成工具.webp', icon: '🧩' },
  { id: 'multiview', title: t('xrugc.features.multiview.title'), desc: t('xrugc.features.multiview.desc'),
    image: '/images/ar-platform/三方视角，用户操作AR医疗头骨内容.webp', icon: '👁️' },
  { id: 'collab', title: t('xrugc.features.collab.title'), desc: t('xrugc.features.collab.desc'),
    image: '/images/ar-platform/多人AR游戏，三方视角.webp', icon: '🤝' },
])
</script>

<template>
  <section id="features" class="mu-section">
    <div class="mu-section__header reveal">
      <span class="mu-tag">{{ t('xrugc.features.tag') }}</span>
      <h2 class="mu-section__title">{{ t('xrugc.features.title') }}</h2>
      <p class="mu-section__sub">{{ t('xrugc.features.subtitle') }}</p>
    </div>
    <div class="mu-features">
      <div
        v-for="(f, idx) in features"
        :key="f.id"
        class="mu-feature reveal"
        :class="{ 'mu-feature--reverse': idx % 2 === 1 }"
      >
        <div class="mu-feature__img"><img :src="f.image" :alt="f.title" loading="lazy" width="600" height="240" /></div>
        <div class="mu-feature__text">
          <span class="mu-feature__icon">{{ f.icon }}</span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $vl: mu.$vl; $o: mu.$o;
$bgc: mu.$bgc; $t1: mu.$t1; $tm: mu.$tm;
$bd: mu.$bd; $bdh: mu.$bdh; $sl: mu.$sl;
$r: mu.$r; $mw: mu.$mw; $e: mu.$e;

.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s $e, transform .8s $e; &.revealed{opacity:1;transform:translateY(0)} }

.mu-tag{display:inline-block;padding:6px 16px;background:rgba($v,.1);border:1px solid rgba($v,.2);border-radius:100px;font-size:13px;font-weight:600;color:$vl;letter-spacing:.06em;text-transform:uppercase}

.mu-section {
  position:relative;z-index:1;max-width:$mw;margin:0 auto;padding:80px 24px;
  @media(max-width:768px){padding:48px 16px}
  &__header{text-align:center;margin-bottom:48px}
  &__title{font-size:clamp(28px,4.5vw,44px);font-weight:800;color:$t1;margin-top:16px;letter-spacing:-.02em;line-height:1.2}
  &__sub{font-size:17px;color:$tm;margin-top:12px;max-width:560px;margin-left:auto;margin-right:auto}
}

.mu-features{display:flex;flex-direction:column;gap:32px}
.mu-feature {
  display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center;
  padding:24px;background:$bgc;border:1px solid $bd;border-radius:$r;transition:all .3s $e;
  &:hover{border-color:$bdh;box-shadow:$sl}
  &--reverse{grid-template-columns:1fr 1.2fr;.mu-feature__img{order:2}.mu-feature__text{order:1}}
  @media(max-width:768px){grid-template-columns:1fr;&--reverse{.mu-feature__img{order:0}.mu-feature__text{order:0}}}
  &__img{overflow:hidden;border-radius:12px;
    img{width:100%;height:240px;object-fit:cover;display:block;transition:transform .5s $e}
    .mu-feature:hover & img{transform:scale(1.04)}
  }
  &__text{padding:8px 0;
    h3{font-size:22px;font-weight:700;color:$t1;margin-bottom:10px}
    p{font-size:15px;color:$tm;line-height:1.7}
  }
  &__icon{font-size:32px;margin-bottom:12px;display:block}
}

@media(prefers-reduced-motion:reduce){
  .reveal{transition:opacity .3s ease;transform:none}
  .reveal.revealed{transform:none}
  .mu-feature:hover{transform:none}
}
</style>
