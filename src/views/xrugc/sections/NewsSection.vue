<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { NewsItem } from '@/types'

defineProps<{
  news: NewsItem[]
  blogUrl: string
  onOpenNewsDetail: (item: NewsItem) => void
  formatDate: (dateString: string) => string
}>()

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section v-if="news?.length" id="news" class="mu-section mu-section--alt">
    <div class="mu-section__header reveal">
      <span class="mu-tag">{{ t('xrugc.news.tag') }}</span>
      <h2 class="mu-section__title">{{ t('xrugc.news.title') }}</h2>
    </div>
    <div class="mu-news reveal">
      <article
        v-for="item in news.slice(0, 3)"
        :key="item.id"
        class="mu-news__card"
        @click="onOpenNewsDetail(item)"
      >
        <span class="mu-news__date">{{ formatDate(item.date) }}</span>
        <h3>{{ item.title }}</h3>
        <p v-if="item.excerpt">{{ item.excerpt }}</p>
      </article>
    </div>
    <div class="mu-news__more">
      <a :href="blogUrl" target="_blank" rel="noopener" class="mu-btn mu-btn--outline">{{ t('xrugc.news.viewAll') }}</a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $vl: mu.$vl; $o: mu.$o;
$bg2: mu.$bg2; $bgc: mu.$bgc; $t1: mu.$t1; $tm: mu.$tm; $tf: mu.$tf;
$bd: mu.$bd; $bdh: mu.$bdh; $sl: mu.$sl; $r: mu.$r; $rs: mu.$rs; $mw: mu.$mw; $e: mu.$e;

.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s $e, transform .8s $e; &.revealed{opacity:1;transform:translateY(0)} }

.mu-tag{display:inline-block;padding:6px 16px;background:rgba($v,.1);border:1px solid rgba($v,.2);border-radius:100px;font-size:13px;font-weight:600;color:$vl;letter-spacing:.06em;text-transform:uppercase}

.mu-btn {
  display:inline-flex;align-items:center;gap:8px;padding:10px 22px;font-family:inherit;font-size:14px;font-weight:600;
  border-radius:$rs;border:none;cursor:pointer;transition:all .25s $e;letter-spacing:.01em;
  &--outline{background:transparent;color:mu.$t2;border:1.5px solid $bdh;&:hover{border-color:$vl;color:$vl}}
}

.mu-section {
  position:relative;z-index:1;max-width:$mw;margin:0 auto;padding:80px 24px;
  @media(max-width:768px){padding:48px 16px}
  &--alt{background:$bg2;max-width:none;>*{max-width:$mw;margin-left:auto;margin-right:auto}}
  &__header{text-align:center;margin-bottom:48px}
  &__title{font-size:clamp(28px,4.5vw,44px);font-weight:800;color:$t1;margin-top:16px;letter-spacing:-.02em;line-height:1.2}
}

.mu-news{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;@media(max-width:768px){grid-template-columns:1fr}
  &__card{padding:24px;background:$bgc;border:1px solid $bd;border-radius:$r;cursor:pointer;transition:all .3s $e;
    &:hover{border-color:$bdh;transform:translateY(-3px);box-shadow:$sl}
    h3{font-size:16px;font-weight:700;color:$t1;margin-bottom:8px;line-height:1.4}
    p{font-size:13px;color:$tm;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  }
  &__date{font-size:12px;color:$tf;font-weight:500;margin-bottom:8px;display:block}
  &__more{text-align:center;margin-top:32px}
}

@media(prefers-reduced-motion:reduce){
  .reveal{transition:opacity .3s ease;transform:none}
  .reveal.revealed{transform:none}
  .mu-news__card:hover{transform:none}
}
</style>
