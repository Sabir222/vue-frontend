<script setup lang="ts">
type userData = {
  user_id: number;
  email: string;
  role_user: string;
  full_name: string;
};
const searchResult = ref<userData[] | null>(null);
onMounted(async () => {
  const id = useAuth().user?.user_id;
  try {
    const reqBody = JSON.stringify({ id });
    const response = await fetch(
      "http://localhost:8080/api/v1/friend/requests",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: reqBody,
      }
    );

    const data = await response.json();
    searchResult.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <Tabs default-value="chat" class="w-full">
    <TabsList class="w-full rounded-none">
    
      <TabsTrigger value="chat"> Chat </TabsTrigger>
      <TabsTrigger value="request"> Request </TabsTrigger>
    </TabsList>
    <TabsContent value="chat"> Chat </TabsContent>
    <TabsContent value="request">
      <div
        v-for="items in searchResult"
        :key="items.user_id"
        class="overflow-y-auto max-h-64"
      >
        <FriendsCardRequest :name="items.full_name" :id="items.user_id" />
      </div>
    </TabsContent>
  </Tabs>
</template>
