<script src="./SolutionsView.js"></script>

<template>
  <section class="page">
    <div class="container narrow">
      <Reveal>
        <div class="page-head">
          <h1>{{ t('solutions_page_title') }}</h1>
          <p>{{ t('solutions_page_desc') }}</p>
        </div>
      </Reveal>
      <Reveal v-for="category in solutionCategories" :key="category.titleKey">
        <article class="solution-card">
          <h2>{{ t(category.titleKey) }}</h2>
          <ul>
            <li v-for="[titleKey, descKey] in category.items" :key="titleKey">
              <strong>{{ t(titleKey) }}</strong>
              <span>{{ t(descKey) }}</span>
            </li>
          </ul>
        </article>
      </Reveal>
    </div>
  </section>
</template>
