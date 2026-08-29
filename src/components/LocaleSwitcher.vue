<script src="./LocaleSwitcher.js"></script>

<template>
  <div class="locale" :class="{ open }">
    <button class="locale-trigger" type="button" :aria-expanded="open" @click="open = !open">
      <span>{{ locale === 'en' ? t('lang_en') : t('lang_tr') }}</span>
      <ChevronDown class="icon" />
    </button>
    <div v-if="open" class="locale-menu" role="menu">
      <button class="locale-item" type="button" role="menuitem" @click="choose('tr')">
        {{ t('lang_tr') }}
      </button>
      <button class="locale-item" type="button" role="menuitem" @click="choose('en')">
        {{ t('lang_en') }}
      </button>
    </div>
  </div>
</template>
