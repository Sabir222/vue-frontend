export default defineNuxtRouteMiddleware((to, from) => {
  if (useAuth().isAuthenticated === true) {
    return navigateTo("/");
  }
});
