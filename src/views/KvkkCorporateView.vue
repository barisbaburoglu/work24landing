<script src="./KvkkCorporateView.js"></script>

<template>
  <section class="page">
    <div class="container narrow">
      <article class="legal-card">
        <h1>{{ t('kvkk_corporate_title') }}</h1>
        <p class="legal-date">{{ t('privacy_updated') }}</p>
        <div class="legal-body" v-html="body"></div>
      </article>
    </div>
  </section>
</template>
