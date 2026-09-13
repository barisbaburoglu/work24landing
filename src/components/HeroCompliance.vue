<script src="./HeroCompliance.js"></script>

<template>
  <RouterLink
    class="hero-compliance"
    :to="lp('kvkk-corporate')"
  >
    <span class="hero-compliance-ring" aria-hidden="true"></span>
    <span class="hero-compliance-shine" aria-hidden="true"></span>
    <span class="hero-compliance-glow" aria-hidden="true"></span>
    <span class="hero-compliance-icon" aria-hidden="true">
      <span class="hero-compliance-tag">{{ t('hero_compliance_tag') }}</span>
      <ShieldCheck class="hero-compliance-svg" />
    </span>
    <span class="hero-compliance-copy">
      <strong>{{ t('hero_compliance_title') }}</strong>
      <span>{{ t('hero_compliance_desc') }}</span>
    </span>
  </RouterLink>
</template>
