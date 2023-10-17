type SkillObject = { skill: string };
type SkillWithCount = {
    skill: string;
    count: string;
};


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


function escapeRegExpLocal(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
