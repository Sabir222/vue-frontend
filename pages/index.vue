<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
let count = ref(0);
let textInput = ref("");

const increment = () => {
  count.value += 10;
};

const decrement = () => {
  count.value--;
};

const auth = useAuth();

onMounted(() => {
  console.log(
    auth.user?.email,
    auth.user?.full_name,
    auth.user?.user_id,
    auth.user?.role
  );
});

const isAuth = computed(() => {
  if (useAuth().isAuthenticated) {
    return "Logged in Nice !";
  } else {
    return "You not logged in !";
  }
});

const oddOrEven = computed(() => {
  if (count.value % 2 !== 0) {
    return "odd";
  } else {
    return "even";
  }
});
</script>
<template>
  <div class="min-h-screen">
    <div class="p-6">
      <div>{{ count }}</div>
      <div class="flex gap-8">
        <button @click="increment()">increment</button>
        <button @click="decrement()">decrement</button>
      </div>
      <input type="text" v-model="textInput" placeholder="type here" />
      <h1>{{ textInput }}</h1>
      <h1>{{ oddOrEven }}</h1>
      <h1>{{ isAuth }}</h1>
    </div>
  </div>
</template>
