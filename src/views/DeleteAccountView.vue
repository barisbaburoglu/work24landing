<script src="./DeleteAccountView.js"></script>

<template>
  <section class="page">
    <div class="container narrow">
      <article class="legal-card delete-card">
        <h1>{{ t('delete_account_title') }}</h1>
        <p>{{ t('delete_account_description') }}</p>
        <div class="warn-box">
          <h2>{{ t('warning_title') }}</h2>
          <ul>
            <li>{{ t('delete_warn_1') }}</li>
            <li>{{ t('delete_warn_2') }}</li>
            <li>{{ t('delete_warn_3') }}</li>
            <li>{{ t('delete_warn_4') }}</li>
          </ul>
        </div>
        <div class="info-box">
          <p>{{ t('delete_account_info') }}</p>
          <a class="email-link" :href="mailHref">{{ CONTACT_EMAIL }}</a>
        </div>
        <RouterLink class="btn btn-ghost" to="/">{{ t('cancel_button') }}</RouterLink>
      </article>
    </div>
  </section>
</template>
