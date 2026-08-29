<script src="./FaqView.js"></script>

<template>
  <section class="page">
    <div class="container narrow">
      <Reveal>
        <div class="page-head">
          <h1>{{ t('faq_page_title') }}</h1>
          <p>{{ t('faq_page_desc') }}</p>
        </div>
      </Reveal>
      <div class="faq-list">
        <Reveal v-for="id in faqIds" :key="id" :delay="`${Math.min(id, 8) * 40}ms`">
          <article class="faq-item" :class="{ open: openId === id }">
            <button type="button" @click="toggle(id)">
              <span>{{ t(`faq_q${id}_question`) }}</span>
            </button>
            <p v-if="openId === id">{{ t(`faq_q${id}_answer`) }}</p>
          </article>
        </Reveal>
      </div>
    </div>
  </section>
</template>
