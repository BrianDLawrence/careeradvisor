<template>
  <div class="flex justify-center">
    <div class="prose">
      <h2>Loaded Skills</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: skills } = await useFetch("/api/skills");
</script>