<script setup lang="ts">
const auth = useAuth().isAuthenticated;
const logout = () => {
  useAuth().logout();
  reloadNuxtApp({
    persistState: false,
  });
};
</script>

<template>
  <nav
    class="fixed top-0 h-[60px] w-full shadow-md shadow-gray-200/35 flex items-center px-10 gap-5"
  >
    <NuxtLink to="/" class="mr-auto"><Button>Home</Button> </NuxtLink>
    <NuxtLink to="/signup" v-if="!auth"><Button>Signup</Button> </NuxtLink>
    <Avatar />
    <Button class="" v-if="auth" @click="logout">Logout</Button>
  </nav>
</template>
