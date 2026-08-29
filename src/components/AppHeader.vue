<script src="./AppHeader.js"></script>

<template>
  <header class="header" :class="{ compact: scrolled }">
    <div class="container header-inner">
      <RouterLink class="header-brand" to="/">
        <BrandLogo />
      </RouterLink>

      <nav class="header-nav" aria-label="Work24">
        <RouterLink class="nav-link" to="/#home">{{ t('menu_home') }}</RouterLink>
        <RouterLink class="nav-link" to="/#features">{{ t('menu_features') }}</RouterLink>
        <RouterLink class="nav-link" to="/#how-it-works">{{ t('menu_how_it_works') }}</RouterLink>
        <RouterLink class="nav-link" to="/#pricing">{{ t('menu_pricing') }}</RouterLink>
        <div class="nav-more" :class="{ open: supportOpen }">
          <button class="nav-link nav-more-btn" type="button" @click="supportOpen = !supportOpen">
            {{ t('menu_support') }}
          </button>
          <div v-if="supportOpen" class="nav-submenu">
            <RouterLink to="/faq" @click="supportOpen = false">{{ t('menu_faq') }}</RouterLink>
            <RouterLink to="/solutions" @click="supportOpen = false">{{ t('menu_solutions') }}</RouterLink>
            <RouterLink to="/contact" @click="supportOpen = false">{{ t('menu_contact') }}</RouterLink>
          </div>
        </div>
      </nav>

      <div class="header-actions">
        <LocaleSwitcher />
        <a class="btn btn-ghost" :href="APP_SIGNIN">{{ t('go_to_signin') }}</a>
        <a class="btn btn-primary" :href="APP_SIGNUP">{{ t('get_started') }}</a>
        <button class="menu-btn" type="button" :aria-expanded="menuOpen" @click="openMenu">
          <Menu class="icon-md" />
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <div class="drawer-root" :class="{ open: menuOpen }">
      <button class="drawer-backdrop" type="button" tabindex="-1" aria-hidden="true" @click="closeMenu"></button>
      <aside class="drawer" :aria-hidden="!menuOpen">
        <div class="drawer-top">
          <RouterLink to="/" @click="closeMenu">
            <BrandLogo />
          </RouterLink>
          <button class="drawer-close" type="button" @click="closeMenu">
            <X class="icon-md" />
          </button>
        </div>
        <nav class="drawer-nav">
          <RouterLink to="/#home" @click="closeMenu">{{ t('menu_home') }}</RouterLink>
          <RouterLink to="/#features" @click="closeMenu">{{ t('menu_features') }}</RouterLink>
          <RouterLink to="/#how-it-works" @click="closeMenu">{{ t('menu_how_it_works') }}</RouterLink>
          <RouterLink to="/#pricing" @click="closeMenu">{{ t('menu_pricing') }}</RouterLink>
          <RouterLink to="/faq" @click="closeMenu">{{ t('menu_faq') }}</RouterLink>
          <RouterLink to="/solutions" @click="closeMenu">{{ t('menu_solutions') }}</RouterLink>
          <RouterLink to="/contact" @click="closeMenu">{{ t('menu_contact') }}</RouterLink>
        </nav>
        <div class="drawer-bottom">
          <LocaleSwitcher />
          <a class="btn btn-ghost btn-block" :href="APP_SIGNIN">{{ t('go_to_signin') }}</a>
          <a class="btn btn-primary btn-block" :href="APP_SIGNUP">{{ t('get_started') }}</a>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
