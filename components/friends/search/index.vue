<script setup lang="ts">
const searchTerm = ref<string>("");
type userData = {
  user_id: number;
  email: string;
  role_user: string;
  full_name: string;
};
const searchResult = ref<userData[] | null>(null);

const sendData = async () => {
  try {
    const reqBody = JSON.stringify({
      searchTerm: searchTerm.value,
    });
    const response = await fetch(
      "http://localhost:8080/api/v1/users/usersearch",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: reqBody,
      }
    );
    const data = await response.json();

    searchResult.value = data;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="h-full pb-20 overflow-y-auto">
    <div class="relative flex items-center gap-3 p-1">
      <Input class="rounded-none" v-model="searchTerm" />
      <Button
        class="absolute w-2 h-8 rounded-full right-3"
        @click="sendData"
      ></Button>
    </div>

    <div
      v-for="items in searchResult"
      :key="items.user_id"
      class="overflow-y-auto max-h-64"
    >
      <FriendsCardFriend :name="items.full_name" :id="items.user_id" />
    </div>
  </div>
</template>
