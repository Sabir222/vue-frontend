<script setup lang="ts">
import { computed } from "vue";

const isAuth = computed(() => {
  if (useAuth().isAuthenticated) {
    return "Logged in Nice !";
  } else {
    return "You not logged in !";
  }
});
</script>
<template>
  <div class="min-h-screen">
    <div class="p-6">
      <h1>{{ isAuth }}</h1>
    </div>
  </div>
</template>
