<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useBrand } from '@/composables/useBrand'
import { useLocaleRoute } from '@/composables/useLocaleRoute'
import { devlogEntries } from '@/services/devlog'

const route = useRoute()
const { t } = useI18n({ useScope: 'global' })
const { brandName, locale: brandLocale, theme } = useBrand()
useLocaleRoute(brandLocale.value)

const entries = computed(() => devlogEntries)

function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <main class="devlog-page">
    <header class="devlog-nav">
      <RouterLink :to="{ path: '/', query: route.query }" class="devlog-nav__brand">
        <img :src="theme.logoPath" :alt="theme.logoAlt" />
        <span>{{ brandName }}</span>
      </RouterLink>
      <RouterLink :to="{ path: '/', query: route.query }" class="devlog-nav__link">
        {{ t('devlog.backHome') }}
      </RouterLink>
    </header>

    <section class="devlog-hero">
      <span class="devlog-kicker">{{ t('devlog.kicker') }}</span>
      <h1>{{ t('devlog.title') }}</h1>
      <p>{{ t('devlog.subtitle') }}</p>
    </section>

    <section v-if="entries.length > 0" class="devlog-list" :aria-label="t('devlog.listLabel')">
      <article v-for="entry in entries" :key="entry.slug" class="devlog-card">
        <div class="devlog-card__meta">
          <time :datetime="entry.date">{{ formatDate(entry.date) }}</time>
          <span v-if="entry.tags.length">{{ entry.tags.join(' / ') }}</span>
        </div>
        <h2>{{ entry.title }}</h2>
        <p>{{ entry.excerpt }}</p>
        <RouterLink
          :to="{ path: `/devlog/${entry.slug}`, query: route.query }"
          class="devlog-card__link"
        >
          {{ t('devlog.readMore') }}
        </RouterLink>
      </article>
    </section>

    <section v-else class="devlog-empty">
      <h2>{{ t('devlog.emptyTitle') }}</h2>
      <p>{{ t('devlog.emptyBody') }}</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.devlog-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 18% 12%, rgba(14, 165, 233, 0.16), transparent 30%),
    linear-gradient(180deg, #0a0f1a 0%, #111827 100%);
  color: #cbd5e1;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.devlog-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px;

  &__brand,
  &__link {
    color: #f8fafc;
    text-decoration: none;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    font-size: 15px;
    font-weight: 700;

    img {
      width: 34px;
      height: 34px;
      object-fit: contain;
    }

    span {
      overflow-wrap: anywhere;
    }
  }

  &__link {
    flex: 0 0 auto;
    padding: 9px 14px;
    border: 1px solid rgba(125, 211, 252, 0.28);
    border-radius: 8px;
    color: #bae6fd;
    font-size: 14px;
    font-weight: 600;
    transition: background 0.2s ease, border-color 0.2s ease;

    &:hover {
      border-color: rgba(125, 211, 252, 0.52);
      background: rgba(14, 165, 233, 0.12);
    }
  }
}

.devlog-hero {
  max-width: 900px;
  margin: 0 auto;
  padding: 72px 24px 44px;

  h1 {
    max-width: 760px;
    margin: 12px 0 16px;
    color: #f8fafc;
    font-size: clamp(36px, 7vw, 68px);
    line-height: 1.05;
    font-weight: 900;
  }

  p {
    max-width: 620px;
    color: #94a3b8;
    font-size: 18px;
    line-height: 1.7;
  }
}

.devlog-kicker {
  display: inline-flex;
  padding: 6px 12px;
  border: 1px solid rgba(14, 165, 233, 0.28);
  border-radius: 8px;
  color: #7dd3fc;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.devlog-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 24px 96px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding-bottom: 64px;
  }
}

.devlog-card {
  display: flex;
  min-height: 260px;
  flex-direction: column;
  padding: 22px;
  border: 1px solid rgba(14, 165, 233, 0.16);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(56, 189, 248, 0.42);
    background: rgba(255, 255, 255, 0.065);
  }

  h2 {
    margin: 18px 0 10px;
    color: #f8fafc;
    font-size: 22px;
    line-height: 1.3;
  }

  p {
    color: #94a3b8;
    font-size: 15px;
    line-height: 1.7;
  }

  &__meta {
    display: flex;
    min-height: 42px;
    flex-wrap: wrap;
    gap: 8px;
    color: #64748b;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__link {
    margin-top: auto;
    padding-top: 22px;
    color: #7dd3fc;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      color: #e0f2fe;
    }
  }
}

.devlog-empty {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 24px 96px;

  h2 {
    color: #f8fafc;
    font-size: 26px;
    line-height: 1.3;
  }

  p {
    margin-top: 10px;
    color: #94a3b8;
    font-size: 16px;
    line-height: 1.7;
  }
}
</style>
