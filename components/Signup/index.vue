<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const formSchema = toTypedSchema(
  z.object({
    fullName: z.string().min(2).max(50),
  })
);

const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});

const mounted = () => {
  console.log("Page loaded!");
};
mounted();
</script>
<template>
  <section class="min-h-screen flex justify-center items-center">
    <div
      class="p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col max-w-xl w-full"
    >
      <h3 class="text-2xl mb-7">Sign up</h3>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="fullName">
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="email" v-bind="componentField" />
              <Input
                type="text"
                placeholder="password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit"> Submit </Button>
      </form>
    </div>
  </section>
</template>
