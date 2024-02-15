<script setup lang="ts">
import { toast } from "vue-sonner";

type CardProps = {
  name: string;
  id: number;
};

const loading = ref(false);

const props = defineProps<CardProps>();

const user1_id = useAuth().user?.user_id;

const addFriend = async () => {
  try {
    loading.value = true;
    const reqBody = JSON.stringify({
      user2_id: props.id,
      user1_id,
    });
    const result = await fetch("http://localhost:8080/api/v1/friend/add", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: reqBody,
    });

    if (result.ok) {
      toast.success("Friend added successfully");
    } else {
      toast.error("Error happened while adding friend");
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
<template>
  <div class="p-[15px]">
    <div
      class="w-full shadow-md h-[70px] ring-1 ring-black flex items-center px-3"
    >
      <p class="pr-2 mr-auto">{{ name }}</p>
      <Button @click="addFriend" :disabled="loading">Add</Button>
    </div>
  </div>
</template>
