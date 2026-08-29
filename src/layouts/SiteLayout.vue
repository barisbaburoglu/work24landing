<script src="./SiteLayout.js"></script>

<template>
  <div class="site">
    <div class="site-orb site-orb-blue"></div>
    <div class="site-orb site-orb-green"></div>
    <div class="site-grid"></div>
    <AppHeader />
    <main class="site-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
