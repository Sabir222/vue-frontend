<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useFriends } from "~/stores/friendsStore";

const isAuthenticated = useAuth().isAuthenticated;
const user = useAuth().user;

const friendsStore = useFriends();
const friends = friendsStore.friends;

onMounted(() => {
  if (isAuthenticated) {
    friendsStore.fetchFriends();
  }
});

const isAuth = computed(() => {
  if (isAuthenticated) {
    return `Logged in Nice ! ${user?.user_id}`;
  } else {
    return "You're not logged in!";
  }
});
</script>

<template>
  <FriendsChat v-if="useAuth().isAuthenticated" />
  <div class="min-h-screen">
    <div class="p-6">
      <h1>{{ isAuth }}</h1>
    </div>
    <div v-if="isAuthenticated && friends.length > 0">
      <p v-for="friend in friends" :key="friend.user1_id">
        {{ friend.user1_id }}///
        {{ friend.user2_id }}
      </p>
    </div>
    <div v-else>
      <p v-if="isAuthenticated">No friends found.</p>
      <p v-else>You're not logged in!</p>
    </div>
  </div>
</template>
