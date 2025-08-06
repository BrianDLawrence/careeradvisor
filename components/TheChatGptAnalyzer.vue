<template>
    <div class="flex justify-center py-10" v-if="allscanned">
        <div class="card w-9/12 bg-base-100 shadow-xl border">
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold place-content-center">AI Analysis</h2>
                <div v-if="isAnalyzing" class="grid">
                    <span class="loading loading-bars loading-lg justify-self-center"></span>
                </div>
                <div v-if="analyzed && !isAnalyzing" class="whitespace-pre-wrap w-fit">
                    <div class="prose max-w-none" v-html="analysis"></div>
                </div>
                <div class="mx-auto justify-items-center md:col-span-2 py-2 hover:cursor-pointer" v-if="isError">
                    <div class="alert alert-error" @click="confirmError">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Oh No! Something went wrong with the analysis, please try
                            again.</span>
                    </div>
                </div>
                <div v-if="!isAnalyzing" class="card-actions justify-center">
                    <button class="btn btn-accent" @click="analyzeWithChatGptGet()" :tabindex="10">Analyze</button>
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

const confirmError = () => {
    isError.value = false;
};

</script>
