<template>
  <div class="flex justify-center py-10">
    <div class="card w-96 bg-base-100 shadow-xl bg-primary text-primary-content">
    <div class="card-body">
    <h2 class="card-title">{{ ScannerTitle }}</h2>
    <p>{{ ScanInstructions }}</p>
    <textarea
          v-model="textforparsing"
          class="textarea border text-black"
          rows="10"
          placeholder="..."
          :tabindex="1"
          ref="jobdescriptiontextareabox"
          v-if="!(textscanned || scanning)"
        ></textarea>
    <div class="card-actions justify-center">
      <button class="btn btn-secondary" @click="scan()">Scan</button>
    </div>
  </div>
</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  skillsArray: {
    type: Array as any,
    required: true,
  },
  ScannerType: {
      type: String,
      required: true,
    },
    ScannerTitle: {
      type: String,
      required: true,
    },
    ScannedTextTitle: {
      type: String,
      required: true,
    },
    ScanInstructions: {
      type: String,
      required: true,
    },
});

const textforparsing = ref("")
const textscanned = ref(false)
const scanning = ref(false)
const parseSkills = ref<string[]>([])

const scan = () => {
  console.log("IN SCAN")
  parseSkills.value = parseSkillsFromText(props.skillsArray, textforparsing.value)
  console.log(parseSkillsFromText(props.skillsArray, textforparsing.value))
  console.log("PARSESKILLS"+parseSkills.value)
};
</script>