<script src="./ContactView.js"></script>

<template>
  <section class="page">
    <div class="container narrow">
      <Reveal>
        <div class="page-head">
          <h1>{{ t('contact_title') }}</h1>
          <p>{{ t('contact_lead') }}</p>
        </div>
      </Reveal>
      <div class="contact-grid">
        <article class="contact-card">
          <h2>{{ t('contact_address') }}</h2>
          <p>{{ t('contact_company') }}</p>
          <p>{{ t('contact_street') }}</p>
          <p>{{ t('contact_city') }}</p>
        </article>
        <article class="contact-card">
          <h2>{{ t('contact_phone') }}</h2>
          <p><a :href="telHref">{{ CONTACT_PHONE }}</a></p>
        </article>
        <article class="contact-card">
          <h2>{{ t('contact_fax') }}</h2>
          <p>{{ CONTACT_FAX }}</p>
        </article>
        <article class="contact-card">
          <h2>{{ t('contact_email') }}</h2>
          <p><a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a></p>
        </article>
      </div>
    </div>
  </section>
</template>
