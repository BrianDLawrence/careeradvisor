<template>
  <div>
    <div class="flex justify-center py-10">
      <div class="prose lg:prose-xl">
        <h1>Career Advisor</h1>
      </div>
    </div>
    <div v-if="!pending">
      <TheSkillComparer></TheSkillComparer>
      <TheSkillScanner :skillsArray="data" ScannerType="Job" ScannerTitle="Job Skill Scanner"
        ScannedTextTitle="Job Description" ScanInstructions="Copy & Paste a job description"></TheSkillScanner>
      <TheSkillScanner :skillsArray="data" ScannerType="Resume" ScannerTitle="Resume Skill Scanner"
        ScannedTextTitle="Resume" ScanInstructions="Copy & Paste the contents of your Resume or CV"></TheSkillScanner>

    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Career Advisor",
  meta: [
    {
      name: "description",
      content:
        "A Digital Career Coach that guides individuals to realize their personal and career potential by exploring powerful, proven, and practical techniques at the intersection of Information Science, Computer Science, and Career Development. We believe that you need to know yourself to know your plan.",
    },
  ],
});
const { pending, data } = await useLazyFetch("/api/skills");
</script>