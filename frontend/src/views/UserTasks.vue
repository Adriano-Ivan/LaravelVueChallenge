<template>User tasks</template>

<script setup>
import getCurrentUser from "@/services/getCurrentUser";
import { onMounted } from "vue";
import axios from "@/services/axios";

onMounted(async () => {
  const user = await getCurrentUser();
  console.log(await user.getIdToken(true));
  const teste = await axios.get("/api/tasks");
  console.log("teste", teste);
});
</script>
