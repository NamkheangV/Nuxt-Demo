<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const email = ref('')

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  // toast({
  //   title: 'You submitted the following values:',
  //   description: 'Username: ' + values.username,
  // })
})
</script>

<template>
  <Toaster />
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <form class="w-2/3 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <InputBox
                v-model="email"
                name="email"
                type="text"
                placeholder="Email"
                input-icon="ic:round-mail-outline"
                input-float
                input-size="large"
            />

            <Input placeholder="Hello"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        Submit
      </Button>
    </form>
  </div>
</template>