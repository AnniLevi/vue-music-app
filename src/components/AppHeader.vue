<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        active-class="no-active"
      >
        Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="modalStore.open()">
              Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user.js'
import { useRoute, useRouter } from 'vue-router'

const modalStore = useModalStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const signOut = async () => {
  await userStore.signOut;

  if (route.meta.requiresAuth) {
    await router.push({ name: 'home' })
  }
};
</script>
