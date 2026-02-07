<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="loginShowAlert"
    :class="loginAlertVariant"
  >
    {{ loginAlertMessage }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="submit">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loginInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>
<script setup>
import { ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const loginSchema = {
  email: 'required|email',
  password: 'required|min:8|max:50',
}

const loginInSubmission = ref(false)
const loginShowAlert = ref(false)
const loginAlertVariant = ref('bg-blue-500')
const loginAlertMessage = ref('Please wait while we log you in.')

const submit = async (values) => {
  loginInSubmission.value = true
  loginShowAlert.value = true
  loginAlertVariant.value = 'bg-blue-500'
  loginAlertMessage.value = 'Please wait while we log you in.'

  try {
    await userStore.authenticate(values)
  } catch (error) {
    loginInSubmission.value = false
    loginAlertVariant.value = 'bg-red-500'
    loginAlertMessage.value = 'Login failed! ' + error.message
    return
  }

  //success
  loginAlertVariant.value = 'bg-green-500'
  loginAlertMessage.value = 'Login successful!'

  window.location.reload();
}
</script>
