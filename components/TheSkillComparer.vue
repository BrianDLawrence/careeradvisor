<template>
    <div class="flex justify-center py-10" v-if="allscanned">
        <div class="card w-9/12 bg-base-100 shadow-xl border">
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold place-content-center">Skill Comparison</h2>
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Job Skill</th>
                                <th>Skill in Resume?</th>
                                <th>Skill count in Job</th>
                                <th>Skill count in Resume</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="skillRow in skillCompareArray">
                                <th>{{ skillRow.skill }}</th>
                                <td>
                                    <div v-if="skillRow.in_resume">&#9989;</div>
                                </td>
                                <td>{{ skillRow.jobskillcount }}</td>
                                <td>{{ skillRow.resumeskillcount }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

const skillStore = useSkillsStore();

const allscanned = computed(() => {
    return (
        skillStore.scannedJobSkillCounts &&
        skillStore.scannedResumeSkillCounts
    )
});

const skillCompareArray = computed(() => {
    if (allscanned)
        return createSkillCountCompareArray(skillStore.scannedJobSkillCounts.value, skillStore.scannedResumeSkillCounts.value)
});

</script>