<script setup lang="ts">
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useBrand } from '@/composables/useBrand'
import { useLocaleRoute } from '@/composables/useLocaleRoute'
import { getDevlogEntry } from '@/services/devlog'

const route = useRoute()
const { t } = useI18n({ useScope: 'global' })
const { locale: brandLocale } = useBrand()
useLocaleRoute(brandLocale.value)

const slug = computed(() => String(route.params.slug ?? ''))
const entry = computed(() => getDevlogEntry(slug.value))
const sanitizedHtml = computed(() => entry.value ? DOMPurify.sanitize(entry.value.html) : '')

function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <main class="devlog-detail">
    <nav class="devlog-detail__nav" :aria-label="t('devlog.detailNavLabel')">
      <RouterLink :to="{ path: '/devlog', query: route.query }">
        {{ t('devlog.backList') }}
      </RouterLink>
      <RouterLink :to="{ path: '/', query: route.query }">
        {{ t('devlog.backHome') }}
      </RouterLink>
    </nav>

    <article v-if="entry" class="devlog-article">
      <header class="devlog-article__header">
        <time :datetime="entry.date">{{ formatDate(entry.date) }}</time>
        <h1>{{ entry.title }}</h1>
        <div v-if="entry.tags.length" class="devlog-article__tags">
          <span v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
        </div>
      </header>

      <div class="devlog-article__body" v-html="sanitizedHtml"></div>

      <footer class="devlog-article__source">
        {{ t('devlog.sourceLabel') }} {{ entry.source }}
      </footer>
    </article>

    <section v-else class="devlog-missing">
      <h1>{{ t('devlog.notFoundTitle') }}</h1>
      <p>{{ t('devlog.notFoundBody') }}</p>
      <RouterLink :to="{ path: '/devlog', query: route.query }">
        {{ t('devlog.backList') }}
      </RouterLink>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.devlog-detail {
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(14, 165, 233, 0.16) 0%, rgba(10, 15, 26, 0) 280px),
    #0a0f1a;
  color: #cbd5e1;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.devlog-detail__nav {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  max-width: 880px;
  margin: 0 auto;
  padding: 24px;

  a {
    color: #7dd3fc;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      color: #e0f2fe;
    }
  }
}

.devlog-article,
.devlog-missing {
  max-width: 880px;
  margin: 0 auto;
  padding: 44px 24px 96px;
}

.devlog-article__header {
  time {
    color: #7dd3fc;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 {
    max-width: 780px;
    margin: 14px 0 18px;
    color: #f8fafc;
    font-size: clamp(34px, 6vw, 58px);
    line-height: 1.08;
    font-weight: 900;
  }
}

.devlog-article__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;

  span {
    padding: 5px 10px;
    border: 1px solid rgba(125, 211, 252, 0.24);
    border-radius: 8px;
    color: #bae6fd;
    font-size: 12px;
    font-weight: 700;
  }
}

.devlog-article__body {
  margin-top: 48px;
  color: #cbd5e1;
  font-size: 17px;
  line-height: 1.85;

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    margin: 38px 0 14px;
    color: #f8fafc;
    line-height: 1.25;
  }

  :deep(h1) {
    font-size: 34px;
  }

  :deep(h2) {
    font-size: 28px;
  }

  :deep(h3) {
    font-size: 22px;
  }

  :deep(p),
  :deep(ul),
  :deep(ol),
  :deep(blockquote),
  :deep(pre) {
    margin: 0 0 18px;
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 24px;
  }

  :deep(li) {
    margin: 8px 0;
  }

  :deep(a) {
    color: #7dd3fc;
    font-weight: 700;
    text-decoration: none;
  }

  :deep(code) {
    border-radius: 6px;
    background: rgba(148, 163, 184, 0.16);
    color: #e0f2fe;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: 0.92em;
    padding: 2px 5px;
  }

  :deep(pre) {
    overflow-x: auto;
    padding: 18px;
    border: 1px solid rgba(125, 211, 252, 0.16);
    border-radius: 8px;
    background: rgba(2, 6, 23, 0.72);

    code {
      display: block;
      padding: 0;
      background: transparent;
      white-space: pre;
    }
  }

  :deep(blockquote) {
    padding-left: 18px;
    border-left: 3px solid #0ea5e9;
    color: #94a3b8;
  }

  :deep(hr) {
    margin: 34px 0;
    border: 0;
    border-top: 1px solid rgba(125, 211, 252, 0.16);
  }
}

.devlog-article__source {
  margin-top: 52px;
  padding-top: 18px;
  border-top: 1px solid rgba(125, 211, 252, 0.16);
  color: #64748b;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.devlog-missing {
  h1 {
    color: #f8fafc;
    font-size: 34px;
  }

  p {
    margin: 12px 0 24px;
    color: #94a3b8;
    font-size: 16px;
    line-height: 1.7;
  }

  a {
    color: #7dd3fc;
    font-weight: 700;
    text-decoration: none;
  }
}
</style>
