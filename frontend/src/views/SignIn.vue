<template>
  <h1>Sign In</h1>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p>
    <button @click="signIn">Sign In</button>
  </p>
  <p>
    <button @click="signInWithGoogle">Sign In With Google</button>
  </p>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered !", data);
      console.log(auth.currentUser);
      router.push("/user-tasks");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
      }
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/user-tasks");
    })
    .catch((error) => {
      // handler error
      console.log("error", error);
    });
};
</script>
