<script src="./HomeView.js"></script>

<template>
  <div>
    <section id="home" class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="badge">{{ t('hero_badge') }}</p>
          <h1>{{ t('banner_title') }}</h1>
          <p class="lead">{{ t('banner_description') }}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" :href="APP_SIGNUP">{{ t('get_started') }}</a>
            <a class="btn btn-ghost" :href="APP_SIGNIN">{{ t('go_to_signin') }}</a>
          </div>
        </div>
        <div class="hero-visual">
          <ZoomableImage
            :src="heroSrc"
            :alt="t('banner_title')"
            width="640"
            height="480"
          />
        </div>
      </div>
    </section>

    <section id="features" class="section section-soft">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <h2>{{ t('features_detailed_title') }}</h2>
            <p>{{ t('features_detailed_subtitle') }}</p>
          </div>
        </Reveal>
        <div class="feature-grid">
          <Reveal v-for="(item, index) in featureCards" :key="item.titleKey" :delay="`${index * 60}ms`">
            <article class="feature-card">
              <div class="feature-icon" :class="`tone-${item.tone}`">
                <component :is="icons[item.icon]" class="icon-md" />
              </div>
              <h3>{{ t(item.titleKey) }}</h3>
              <p>{{ t(item.descKey) }}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="section mobile-section">
      <div class="container mobile-grid">
        <Reveal>
          <div class="mobile-copy">
            <p class="badge">{{ t('mobile_badge') }}</p>
            <h2 v-html="t('mobile_title')"></h2>
            <p>{{ t('mobile_description_1') }}</p>
            <p>{{ t('mobile_description_2') }}</p>
            <div class="store-row">
              <a class="store-btn" :href="APP_STORE" target="_blank" rel="noopener noreferrer">
                <img src="/images/app-store.png" alt="App Store" width="32" height="32" />
                <span>
                  <small>{{ t('store_label_apple') }}</small>
                  <strong>{{ t('store_name_apple') }}</strong>
                </span>
              </a>
              <a class="store-btn" :href="PLAY_STORE" target="_blank" rel="noopener noreferrer">
                <img src="/images/google-play.png" alt="Google Play" width="32" height="32" />
                <span>
                  <small>{{ t('store_label_google') }}</small>
                  <strong>{{ t('store_name_google') }}</strong>
                </span>
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div class="mobile-visual">
            <div class="mobile-app-glow" aria-hidden="true">
              <span class="mobile-app-glow__orb mobile-app-glow__orb--blue"></span>
              <span class="mobile-app-glow__orb mobile-app-glow__orb--green"></span>
              <span class="mobile-app-glow__orb mobile-app-glow__orb--cyan"></span>
              <span class="mobile-app-glow__spark mobile-app-glow__spark--1"></span>
              <span class="mobile-app-glow__spark mobile-app-glow__spark--2"></span>
              <span class="mobile-app-glow__spark mobile-app-glow__spark--3"></span>
            </div>
            <ZoomableImage
              img-class="mobile-shot"
              :src="appSrc"
              :alt="t('feature_mobile_title')"
              width="260"
              height="500"
            />
          </div>
        </Reveal>
      </div>
    </section>

    <section id="how-it-works" class="section section-soft">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <h2>{{ t('how_title') }}</h2>
            <p>{{ t('how_subtitle') }}</p>
          </div>
        </Reveal>
        <div class="steps">
          <Reveal v-for="(step, index) in steps" :key="step.titleKey" :delay="`${index * 90}ms`">
            <article class="step-card">
              <span class="step-num">{{ index + 1 }}</span>
              <h3>{{ t(step.titleKey) }}</h3>
              <p>{{ t(step.descKey) }}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <Reveal>
          <div class="section-head">
            <h2>{{ t('featured_features') }}</h2>
          </div>
        </Reveal>
        <article
          v-for="block in featuredBlocks"
          :key="block.titleKey"
          class="featured-row"
          :class="{ reverse: block.reverse }"
        >
          <Reveal>
            <div>
              <h3>{{ t(block.titleKey) }}</h3>
              <p>{{ t(block.descKey) }}</p>
            </div>
          </Reveal>
          <Reveal>
            <ZoomableImage
              img-class="featured-shot"
              :src="block.image"
              :alt="t(block.titleKey)"
              width="560"
              height="360"
            />
          </Reveal>
        </article>
      </div>
    </section>

    <PricingSection />
  </div>
</template>
