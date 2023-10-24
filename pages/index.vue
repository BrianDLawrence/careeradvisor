<template>
  <div>
    <div class="flex justify-center py-10">
      <div class="prose lg:prose-xl">
        <h1>Resume ATS Advisor</h1>
      </div>
    </div>
    <div v-if="!pending">
      <TheSkillComparer></TheSkillComparer>
      <TheSkillScanner :skillsArray="data" ScannerType="Job" ScannerTitle="Job Skill Scanner"
        ScannedTextTitle="Job Description" ScanInstructions="Copy & Paste a job description" :TabOrderBase=1>
      </TheSkillScanner>
      <TheSkillScanner :skillsArray="data" ScannerType="Resume" ScannerTitle="Resume Skill Scanner"
        ScannedTextTitle="Resume" ScanInstructions="Copy & Paste the contents of your Resume or CV" :TabOrderBase=3>
      </TheSkillScanner>
      <TheChatGptAnalyzer></TheChatGptAnalyzer>

    </div>
  </div>
</template>

<script lang="ts" setup>
import TheChatGptAnalyzer from '~/components/TheChatGptAnalyzer.vue';

useHead({
  title: "Resume ATS Advisor",
  meta: [
    {
      name: "description",
      content:
        "Maximize your job search with Resume-ats.com! Our platform uses resume ATS technology to review and compare resumes with job descriptions, providing AI-driven suggestions to help your resume stand out and land your dream job.",
    },
  ],
});
const { pending, data } = await useLazyFetch("/api/skills");
</script>