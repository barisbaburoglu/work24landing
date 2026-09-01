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
      <ShieldCheck class="hero-compliance-svg" />
    </span>
    <span class="hero-compliance-copy">
      <span class="hero-compliance-tag">{{ t('hero_compliance_tag') }}</span>
      <strong>{{ t('hero_compliance_title') }}</strong>
      <span>{{ t('hero_compliance_desc') }}</span>
    </span>
    <span class="hero-compliance-cta" aria-hidden="true">→</span>
  </RouterLink>
</template>
