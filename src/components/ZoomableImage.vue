<script src="./ZoomableImage.js"></script>

<template>
  <button class="zoom-trigger" type="button" :aria-label="alt" @click="show">
    <img :src="src" :alt="alt" :class="imgClass" :width="width" :height="height" />
  </button>

  <Teleport to="body">
    <div v-if="open" class="lightbox" role="dialog" aria-modal="true" :aria-label="alt" @click.self="hide">
      <button class="lightbox-close" type="button" aria-label="Close" @click="hide">
        <X class="icon-md" />
      </button>
      <img class="lightbox-img" :src="src" :alt="alt" />
    </div>
  </Teleport>
</template>
