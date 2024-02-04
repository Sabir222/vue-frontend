<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const formSchema = toTypedSchema(
  z.object({
    fullName: z.string().min(2).max(50).nonempty("Name is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Must be a valid email"),
    hashedPassword: z
      .string()
      .nonempty("Password is required")
      .min(8, "Too short"),
  })
);

const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit(async (values) => {
  console.log("Form submitted!", values);
  try {
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      console.log("registered successfully!");
    } else {
      throw new Error("registration failed!");
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <section class="min-h-screen flex justify-center items-center">
    <div
      class="p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col max-w-xl w-full"
    >
      <h3 class="text-2xl mb-7">Register</h3>
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="fullName">
          <FormItem>
            <FormControl>
              <Input
                type="text"
                placeholder="Full name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="hashedPassword">
          <FormItem>
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit"> Register </Button>
      </form>
    </div>
  </section>
</template>
