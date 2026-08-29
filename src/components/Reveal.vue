<script src="./Reveal.js"></script>

<template>
  <div ref="root" class="reveal" :class="{ 'is-visible': visible }" :data-delay="delay">
    <slot />
  </div>
</template>
