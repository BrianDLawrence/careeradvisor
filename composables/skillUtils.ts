type SkillObject = { skill: string };
type SkillWithCount = {
    skill: string;
    count: string;
};
interface SkillCompareItem {
    skill: string;
    in_resume?: boolean;
    jobskillcount?: string;
    resumeskillcount?: string;
}



export const parseSkillsFromText = (listofskills: SkillObject[], text: string): string[] => {

    // Parse skills from skill json - we expect listofskills to be in this format: [{"skill" : "theskill"}]
    const arrayOfSkills: string[] = listofskills.map(s => s.skill);

    // Crazy Regular Expression coding here - this particular master piece is thanks to my genius friend Stefan Niculescu who was a member of Career Boot Camp Coaches originally
    const skillsRegExp: RegExp = new RegExp('(^|\\W)(' + arrayOfSkills.map(skill => escapeRegExpLocal(skill.toLowerCase())).join("|") + ')(?=\\W|$)', 'g');
    const returnSkills: string[] = [];
    text = text.toLowerCase();

    let match: RegExpExecArray | null;
    while (match = skillsRegExp.exec(text)) {
        returnSkills.push(match[2]);
    }

    // Return original version of skill to maintain case
    return arrayOfSkills.filter(skill => returnSkills.includes(skill.toLowerCase()));
}


export const parseSkillsWCountFromText = (parsedSkills: string[], text: string): SkillWithCount[] => {
    const returnSkills: SkillWithCount[] = [];

    parsedSkills.forEach(skill => {
        const theSkillObject: SkillWithCount = {
            skill: '',
            count: '0'
        };
        theSkillObject.skill = skill;
        const escapedSkill = escapeRegExpLocal(skill); // Escape any special regex characters
        const skillRegExp = new RegExp('(^|\\W)(' + escapedSkill + ')', 'gi');
        theSkillObject.count = String((text.match(skillRegExp) || []).length);
        returnSkills.push(theSkillObject);
    });

    return returnSkills;
}

export const skillHighlight = (arrayOfSkills: string[], text: string): string => {
    const descendLengthSkillsArray = arrayOfSkills.sort((a, b) => b.length - a.length); // This is required to highlight multiple word skills
    const wordsRegExp = new RegExp('(^|\\W)(' + descendLengthSkillsArray.map(o => escapeRegExpLocal(o)).join("|") + ')(?=\\W|$)', 'gi');
    return text ? text.replace(wordsRegExp, '$1<mark>$2</mark>') : "";
}

export const createSkillCountCompareArray = (jobskills: SkillWithCount[], resumeskills: SkillWithCount[]): SkillCompareItem[] => {
    const compareArray: SkillCompareItem[] = [];

    for (const jobskill of jobskills) {
        const skillcompareitem: SkillCompareItem = { "skill": jobskill.skill };

        for (const resumeskill of resumeskills) {
            if (resumeskill.skill === jobskill.skill) {
                skillcompareitem.in_resume = true;
                skillcompareitem.jobskillcount = jobskill.count;
                skillcompareitem.resumeskillcount = resumeskill.count;
                break;
            }
        }

        if (!skillcompareitem.in_resume) {
            skillcompareitem.jobskillcount = jobskill.count;
            skillcompareitem.resumeskillcount = "0";
        }

        compareArray.push(skillcompareitem);
    }

    return compareArray;
}


function escapeRegExpLocal(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
