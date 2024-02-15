<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>
<template>
  <div class="pt-[70px]">
    <Toaster rich-colors />
    <Navbar />


    <slot />
  </div>
</template>
