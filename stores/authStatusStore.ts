import { defineStore } from "pinia";
type AuthState = {
  isAuthenticated: boolean;
  user: null | {
    user_id: number;
    full_name: string;
    role: string;
    email: string;
  };
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),
  persist: { storage: persistedState.localStorage },
  actions: {
    async login(email: string, password: string): Promise<void> {
      const requestBody = JSON.stringify({
        email: email,
        password: password,
      });
      try {
        const response = await fetch("http://localhost:8080/api/v1/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });
        if (response.ok) {
          const { user_id, full_name, email, role } = await response.json();
          this.isAuthenticated = true;
          this.user = { user_id, full_name, email, role };
        } else {
          throw new Error("failed to log!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/logout"
        );
        if (response.ok) {
          console.log("Logged out successfully");
        } else {
          throw new Error("failed to log out!");
        }
      } catch (error) {
        console.log(error);
      }

      this.isAuthenticated = false;
      this.user = null;
    },
  },
});

export function useAuth() {
  return useAuthStore();
}
