<template>
    <div class="flex justify-center py-10" v-if="allscanned">
        <div class="card w-9/12 bg-base-100 shadow-xl border">
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold place-content-center">AI Analysis</h2>
                <div v-if="isAnalyzing" class="grid">
                    <span class="loading loading-bars loading-lg justify-self-center"></span>
                </div>
                <div v-if="analyzed && !isAnalyzing" class="whitespace-pre-wrap w-fit">
                    {{ analysis }}
                </div>
                <div v-if="!isAnalyzing" class="card-actions justify-center">
                    <button class="btn btn-accent" @click="analyzeWithChatGptGet()" :tabindex="1">Analyze</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const isAnalyzing = ref(false);
const isError = ref(false);
const analyzed = ref(false);
const analysis = ref("")
const skillStore = useSkillsStore();

const allscanned = computed(() => {
    return (
        skillStore.resume &&
        skillStore.jobdescription
    )
});

const analyzeWithChatGptGet = async () => {

    isAnalyzing.value = true;
    isError.value = false;

    const { data, error } = await useFetch("/api/analyzewithchatgpt", {
        query: {
            resume: skillStore.resume,
            jobdescription: skillStore.jobdescription
        },
    });

    if (error.value) {
        isAnalyzing.value = false;
        isError.value = true;
        console.log("ERROR" + error.value);
    }

    if (data && !isError.value) {
        console.log(data.value);
        analysis.value = String(data.value!);
        isAnalyzing.value = false;
        analyzed.value = true;
    }

}

</script>
