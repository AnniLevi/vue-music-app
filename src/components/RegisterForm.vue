<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="registrationShowAlert"
    :class="registrationAlertVariant"
  >
    {{ registrationAlertMessage }}
  </div>
  <vee-form :validation-schema="schema" @submit="submit" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" as="span" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field type="password" name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="registrationInSubmission"
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

const schema = {
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:5|max:100|email',
  age: 'required|min_value:18|max_value:100',
  password: 'required|min:8|max:50',
  confirm_password: 'passwords_mismatch:@password|min:8|max:50',
  country: 'required|country_excluded:Antarctica,Mexico',
  tos: 'tos',
}

const userData = ref({
  country: 'USA',
})

const registrationInSubmission = ref(false)
const registrationShowAlert = ref(false)
const registrationAlertVariant = ref('bg-blue-500')
const registrationAlertMessage = ref('Please wait while we register your account.')

const submit = async (values) => {
  registrationShowAlert.value = true
  registrationInSubmission.value = true
  registrationAlertVariant.value = 'bg-blue-500'
  registrationAlertMessage.value = 'Please wait while we register your account.'

  try {
    await userStore.register(values)
  } catch (error) {
    registrationInSubmission.value = false
    registrationAlertVariant.value = 'bg-red-500'
    registrationAlertMessage.value = 'Registration failed! ' + error.message
    return
  }

  // success
  registrationAlertVariant.value = 'bg-green-500'
  registrationAlertMessage.value = 'Registration successful!'

  window.location.reload();
}
</script>
