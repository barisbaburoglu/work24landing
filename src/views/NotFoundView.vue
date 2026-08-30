<script src="./NotFoundView.js"></script>

<template>
  <section class="page">
    <div class="container narrow">
      <article class="legal-card delete-card">
        <h1>404</h1>
        <RouterLink class="btn btn-primary" :to="lp('home')">{{ t('cancel_button') }}</RouterLink>
      </article>
    </div>
  </section>
</template>
