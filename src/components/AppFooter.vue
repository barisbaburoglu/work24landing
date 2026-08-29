<script src="./AppFooter.js"></script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <RouterLink to="/" class="footer-brand">
          <BrandLogo />
        </RouterLink>
        <p class="footer-text" v-html="t('footer_text')"></p>
        <div class="footer-social">
          <a
            v-for="item in SOCIAL"
            :key="item.name"
            :href="item.href"
            :class="['social-btn', item.className]"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.name"
          >
            {{ item.name.charAt(0) }}
          </a>
        </div>
      </div>

      <div>
        <h2>{{ t('footer_quick') }}</h2>
        <ul>
          <li><RouterLink to="/">{{ t('menu_home') }}</RouterLink></li>
          <li><a :href="APP_SIGNUP">{{ t('footer_signup') }}</a></li>
          <li><a :href="APP_SIGNIN">{{ t('footer_signin') }}</a></li>
          <li><RouterLink to="/delete-account">{{ t('footer_delete') }}</RouterLink></li>
        </ul>
      </div>

      <div>
        <h2>{{ t('footer_support') }}</h2>
        <ul>
          <li><RouterLink to="/faq">{{ t('menu_faq') }}</RouterLink></li>
          <li><RouterLink to="/solutions">{{ t('menu_solutions') }}</RouterLink></li>
          <li><RouterLink to="/contact">{{ t('menu_contact') }}</RouterLink></li>
          <li><RouterLink to="/privacy">{{ t('privacy_title') }}</RouterLink></li>
          <li>
            <a href="/kvkk-clarification-notice-corporate.html">{{ t('footer_kvkk_corporate') }}</a>
          </li>
          <li>
            <a href="/kvkk-clarification-notice-employees.html">{{ t('footer_kvkk_employees') }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h2>{{ t('footer_contact') }}</h2>
        <ul>
          <li><a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a></li>
          <li><a :href="telHref">{{ CONTACT_PHONE }}</a></li>
          <li>
            <span>{{ t('contact_company') }}</span>
            <span>{{ t('contact_street') }}</span>
            <span>{{ t('contact_city') }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="container footer-copy">
      <p>{{ t('footer_copy') }}</p>
    </div>
  </footer>
</template>
