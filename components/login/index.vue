<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Must be valid email").min(2).max(50),
    password: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit(async (values) => {
  const { email, password } = values;
  const auth = useAuth();
  try {
    await auth.login(email, password);
  } catch (error) {
    console.error(error);
  }
});

// const auth = useAuth().isAuthenticated;

// if (auth) navigateTo("/");

const toRegister = () => {
  return navigateTo("/register");
};
</script>
<template>
  <section class="flex items-center justify-center min-h-screen">
    <div
      class="p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col max-w-xl w-full"
    >
      <h3 class="text-2xl mb-7">Login</h3>
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormControl>
              <Input
                required
                type="email"
                placeholder="email"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormControl>
              <Input
                required
                type="password"
                placeholder="password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit"> Login </Button>
        <p class="text-sm text-center text-gray-400">
          You dont have an account ?
          <span @click="toRegister" class="cursor-pointer">Register</span>
        </p>
      </form>
    </div>
  </section>
</template>
