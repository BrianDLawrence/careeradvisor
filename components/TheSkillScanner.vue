<template>
  <div class="flex justify-center py-10">
    <div class="card w-9/12 bg-base-100 shadow-xl border">
      <div class="card-body">
        <h2 class="card-title text-4xl font-bold place-content-center">{{ ScannerTitle }}</h2>
        <p v-if="textscanned">{{ ScannedTextTitle }}</p>
        <p v-else>{{ ScanInstructions }}</p>
        <div v-if="scanning">
          <span class="loading loading-bars loading-lg"></span>
        </div>

        <textarea v-model="textforparsing" class="textarea border-accent text-black" rows="10" placeholder="..."
          :tabindex="1" ref="jobdescriptiontextareabox" v-if="!(textscanned || scanning)"></textarea>

        <div v-if="textscanned && !scanning" class="flex flex-col md:flex-row">
          <div class="basis-full md:basis-3/4">
            <div class="prose px-1 bg-white text-black-content text-xs" v-html="jobdescriptionhighlighted">
            </div>
          </div>
          <div class="basis-full md:basis-1/4 bg-primary text-primary-content p-2 rounded-xl">
            <p class="text-4xl font-bold m-6">Skills</p>
            <ul class="list-disc ml-6 mb-6">
              <li class="m-px" v-for="skill in parsedSkills" :key="skill">
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>

        <div v-if="!scanning && !textscanned" class="card-actions justify-center">
          <button class="btn btn-accent" @click="scan()" :tabindex="2">Scan</button>
        </div>
        <div v-if="textscanned && !scanning" class="card-actions justify-center">
          <button class="btn btn-neutral" @click="scanagain()" :tabindex="1">Rescan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

type SkillWithCount = {
  skill: string;
  count: string;
};

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
const parsedSkills = ref<string[]>([])
const parsedSkillCounts = ref<SkillWithCount[]>([])
const skillStore = useSkillsStore();

const scan = () => {

  scanning.value = true
  parsedSkills.value = parseSkillsFromText(props.skillsArray, textforparsing.value)
  parsedSkillCounts.value = parseSkillsWCountFromText(parsedSkills.value, textforparsing.value)

  saveSkills()
  textscanned.value = true
  scanning.value = false
};

const scanagain = () => {
  textforparsing.value = ""
  textscanned.value = false
};

const saveSkills = () => {
  if (props.ScannerType == "Job") {
    skillStore.setScannedJobSkills(parsedSkills)
    skillStore.setScannedJobSkillCounts(parsedSkillCounts)
  }
  else if (props.ScannerType == "Resume") {
    skillStore.setScannedResumeSkills(parsedSkills)
    skillStore.setScannedResumeSkillCounts(parsedSkillCounts)
  }
}

const jobdescriptionhighlighted = computed(() => {
  return skillHighlight(parsedSkills.value, textforparsing.value)
});
</script>