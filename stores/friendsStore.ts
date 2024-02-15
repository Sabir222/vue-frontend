import { defineStore } from "pinia";
import { useAuth } from "./authStatusStore";
type Friends = {
  user1_id: number;
  user2_id: number;
};
type FriendState = {
  friends: Friends[];
};

export const useFriendStore = defineStore("friends", {
  state: (): FriendState => ({
    friends: [],
  }),
  persist: { storage: persistedState.localStorage },
  actions: {
    async fetchFriends(): Promise<void> {
      const id = useAuth().user?.user_id;
      const requestBody = JSON.stringify({
        id,
      });
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/friend/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: requestBody,
          }
        );
        console.log("fetch friends");

        if (response.ok) {
          const data = await response.json();
          this.friends = data;
        } else {
          throw new Error("failed to fetch friends!");
        }
      } catch (error) {
        console.log(error);
      }
    },

    resetState(): void {
      this.friends = [];
    },
  },
});

export function useFriends() {
  return useFriendStore();
}
