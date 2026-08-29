<script src="./PricingSection.js"></script>

<template>
  <section
    id="pricing"
    ref="sectionRef"
    class="section pricing-section"
    :class="{ 'is-lit': lit }"
  >
    <div class="pricing-glow pricing-glow-blue" aria-hidden="true"></div>
    <div class="pricing-glow pricing-glow-green" aria-hidden="true"></div>
    <div class="pricing-glow pricing-glow-mid" aria-hidden="true"></div>
    <div class="container">
      <Reveal>
        <div class="section-head">
          <h2>{{ t('pricing_title') }}</h2>
          <p>{{ t('pricing_description') }}</p>
        </div>
      </Reveal>

      <Reveal>
        <div class="pricing-control">
          <p class="pricing-label">{{ t('pricing_users_label') }}</p>
          <div class="pricing-stepper">
            <button type="button" @click="changeUsers(-1)">−</button>
            <input v-model.number="userCount" type="number" min="1" @blur="normalizeUsers" />
            <button type="button" @click="changeUsers(1)">+</button>
          </div>
          <p class="pricing-hint">{{ t('pricing_users_hint') }}</p>
        </div>
      </Reveal>

      <div class="pricing-grid">
        <Reveal v-for="(card, index) in cards" :key="card.key" :delay="`${index * 80}ms`">
          <article class="pricing-card" :class="{ featured: card.featured, hidden: !card.visible }">
            <p v-if="card.discountText" class="pricing-discount">{{ card.discountText }}</p>
            <p v-if="card.featured" class="pricing-badge">{{ t('pricing_popular') }}</p>
            <h3>{{ t(card.titleKey) }}</h3>
            <p class="pricing-sub">{{ t(card.subtitleKey) }}</p>
            <p class="pricing-amount">
              <span>₺</span>
              <s v-if="card.original">{{ card.original }}</s>
              <strong>{{ card.amount }}</strong>
              <em>{{ t('pricing_per_month') }}</em>
            </p>
            <p class="pricing-yearly">{{ t('pricing_due') }} {{ card.yearly }}</p>
            <p class="pricing-user">
              <template v-if="locale === 'en'">
                <strong>{{ card.perUser }}</strong> {{ t('pricing_per_user') }}
              </template>
              <template v-else>
                {{ t('pricing_per_user') }} <strong>{{ card.perUser }}</strong>
              </template>
            </p>
            <ul>
              <li>{{ card.range }}</li>
              <li v-if="trialText" class="pricing-trial">{{ trialText }}</li>
            </ul>
            <a class="btn btn-primary btn-block" :href="APP_SIGNUP">{{ t('get_started') }}</a>
          </article>
        </Reveal>
      </div>
    </div>
  </section>
</template>
