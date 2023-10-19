import { defineStore } from 'pinia'

export const useSkillsStore = defineStore("SkillStore", () => {

    const resume = ref();
    const jobdescription = ref();
    const scannedJobSkills = ref();
    const scannedJobSkillCounts = ref();
    const scannedResumeSkills = ref();
    const scannedResumeSkillCounts = ref();

    const setResume = (data?: any) => (resume.value = data);
    const setJobDescription = (data?: any) => (jobdescription.value = data);
    const setScannedJobSkills = (data?: any) => (scannedJobSkills.value = data);
    const setScannedJobSkillCounts = (data?: any) => (scannedJobSkillCounts.value = data);
    const setScannedResumeSkills = (data?: any) => (scannedResumeSkills.value = data);
    const setScannedResumeSkillCounts = (data?: any) => (scannedResumeSkillCounts.value = data);

    return { resume, jobdescription, scannedJobSkills, scannedJobSkillCounts, scannedResumeSkills, scannedResumeSkillCounts, setResume, setJobDescription, setScannedJobSkills, setScannedJobSkillCounts, setScannedResumeSkills, setScannedResumeSkillCounts }
});