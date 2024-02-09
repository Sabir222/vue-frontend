<script setup ts="ts">
const open = ref(false);
const handleClick = () => {
  open.value = !open.value;
};
</script>
<template>
  <Button
    class="fixed w-4 rounded-full bottom-4 right-4 p-7"
    @click="handleClick"
  >
  </Button>

  <div
    v-if="open"
    class="w-[330px] fixed bottom-0 h-[500px] bg-white right-[100px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-t-md"
  >
    <div class="flex items-center justify-between p-3 border-b-[1px] shadow-sm">
      <p class="text-xl font-semibold">Friends</p>
      <Button
        class="w-3 h-8 bg-black rounded-full"
        @click="handleClick"
      ></Button>
    </div>
  </div>
</template>
