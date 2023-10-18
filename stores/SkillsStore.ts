import { defineStore } from 'pinia'

export const useSkillsStore = defineStore("SkillStore", () => {
    const skills = ref();
    const scannedJobSkills = ref();
    const scannedJobSkillCounts = ref();
    const scannedResumeSkills = ref();
    const scannedResumeSkillCounts = ref();

    const setSkills = (data?: any) => (skills.value = data);
    const setScannedJobSkills = (data?: any) => (scannedJobSkills.value = data);
    const setScannedJobSkillCounts = (data?: any) => (scannedJobSkillCounts.value = data);
    const setScannedResumeSkills = (data?: any) => (scannedResumeSkills.value = data);
    const setScannedResumeSkillCounts = (data?: any) => (scannedResumeSkillCounts.value = data);

    return { skills, scannedJobSkills, scannedJobSkillCounts, scannedResumeSkills, scannedResumeSkillCounts, setSkills, setScannedJobSkills, setScannedJobSkillCounts, setScannedResumeSkills, setScannedResumeSkillCounts }
});