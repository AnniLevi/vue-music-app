import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, usersCollection } from '@/includes/firebase.js'


export const useUserStore = defineStore('user', () => {
  const userLoggedIn = ref(false)

  const login = () => {
    userLoggedIn.value = true
  }

  const signOut = async () => {
    await auth.signOut();
    userLoggedIn.value = false
  }

  const register = async (payload) => {
    const userCred = await auth.createUserWithEmailAndPassword(payload.email, payload.password)

    await usersCollection.doc(userCred.user.uid).set({
      name: payload.name,
      email: payload.email,
      age: payload.age,
      country: payload.country,
    })

    await userCred.user.updateProfile({
      displayName: payload.name,
    })

    userLoggedIn.value = true
  }

  const authenticate = async (payload) => {
    await auth.signInWithEmailAndPassword(payload.email, payload.password);
    userLoggedIn.value = true;
  }

  return { userLoggedIn, login, signOut, register, authenticate }
})
