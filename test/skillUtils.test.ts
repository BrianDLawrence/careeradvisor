import { assert, expect, test } from 'vitest'
import { parseSkillsFromText, parseSkillsWCountFromText, skillHighlight, createSkillCountCompareArray } from '../composables/skillUtils'

const fs = require('fs')
const TESTSKILLDATA = JSON.parse(fs.readFileSync('test/skillstestdata.json', 'utf8'))

test('test parseSkillsFromText using small skill data', () => {
    const testLoremData = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const validSkills = [{ skill: 'tempor' }, { skill: 'magna' }, { skill: 'reprehenderit' }, { skill: 'officia' }]
    const expected = ['tempor', 'magna', 'reprehenderit', 'officia']

    expect(parseSkillsFromText(validSkills, testLoremData)).toStrictEqual(expected)
})

test('test parseSkillsFromText using TESTSKILLDATA', () => {
    const expected = ['ITIL Certified', 'Test Driven Development', 'Workforce Management']
    const text = ' Skills include \ Test Driven Development for all code\  ITIL Certified \ Workforce Management of professionals\ '

    expect(parseSkillsFromText(TESTSKILLDATA, text)).toStrictEqual(expected)
})

test('test parseSkillsWithCountFromText using TESTSKILLDATA', () => {
    const expected = [
        { skill: 'ITIL Certified', count: '1' }, { skill: 'Test Driven Development', count: '1' }, { skill: 'Workforce Management', count: '1' }
    ]
    const text = ' Skills include \ Test Driven Development for all code\  ITIL Certified \ Workforce Management of professionals\ '

    expect(parseSkillsWCountFromText(parseSkillsFromText(TESTSKILLDATA, text), text)).toStrictEqual(expected)
})

test('test parseSkillsWithCountFromText2 using TESTSKILLDATA', () => {
    const expected = [
        { skill: 'ITIL Certified', count: '1' }, { skill: 'Test Driven Development', count: '1' }, { skill: 'Workforce Management', count: '2' }
    ]
    const text = ' Skills include \ Test Driven Development for all code\  ITIL Certified \ Workforce Management of professionals\ Workforce Management of cats\ '

    expect(parseSkillsWCountFromText(parseSkillsFromText(TESTSKILLDATA, text), text)).toStrictEqual(expected)
})

test('test parseSkillsWithCountFromText3 using TESTSKILLDATA', () => {
    const expected = [
        { skill: 'ITIL Certified', count: '2' }, { skill: 'Test Driven Development', count: '1' }, { skill: 'Workforce Management', count: '3' }
    ]
    const text = ' Skills include \ Test Driven Development for all code\  ITIL Certified \ Workforce Management of professionals\ Workforce Management of cats\ I am additionally ITIL Certified and still love Workforce Management '

    expect(parseSkillsWCountFromText(parseSkillsFromText(TESTSKILLDATA, text), text)).toStrictEqual(expected)
})

test('test to fix second C++ bug but in parseSkillsWithCountFromText3', () => {
    const expected2 = [
        { skill: 'ITIL Certified', count: '2' }, { skill: 'Test Driven Development', count: '1' }, { skill: 'Turbo C++', count: '1' }, { skill: 'Workforce Management', count: '2' }
    ]
    const text2 = ' Skills include \ Test Driven Development for all code\  ITIL Certified \ Workforce Management of professionals\ Workforce Management of cats\ I am additionally ITIL Certified and still love Turbo C++ '

    expect(parseSkillsWCountFromText(parseSkillsFromText(TESTSKILLDATA, text2), text2)).toStrictEqual(expected2)
})

test('test skillHighlight', () => {
    const expected = 'The <mark>ITIL</mark> smart guy knows his <mark>KPIs</mark>!'
    const textinput = 'The ITIL smart guy knows his KPIs!'
    const highlightTheseWordsArray = ['ITIL', 'KPIs']

    expect(skillHighlight(highlightTheseWordsArray, textinput)).toBe(expected)
    const highlightTheseWordsArray2 = ['ITIL', 'KPIs', 'guy']
    const expected2 = 'The <mark>ITIL</mark> smart <mark>guy</mark> knows his <mark>KPIs</mark>!'
    expect(skillHighlight(highlightTheseWordsArray2, textinput)).toBe(expected2)
})

test('test skillHighlight with long inclusive skills', () => {
    const expected = 'The <mark>ITIL</mark> smart guy knows his <mark>KPIs</mark>! He is <mark>Apache Spark</mark> cerified!'
    const textinput = 'The ITIL smart guy knows his KPIs! He is Apache Spark cerified!'
    const highlightTheseWordsArray = ['ITIL', 'KPIs', 'Apache', 'Apache Spark']

    expect(skillHighlight(highlightTheseWordsArray, textinput)).toBe(expected)
})

test('test skillHighlight with skills next to each other in text', () => {
    const expected = 'The smart guy knows his <mark>ITIL</mark> <mark>KPIs</mark>! He is <mark>Apache Spark</mark> cerified!'
    const textinput = 'The smart guy knows his ITIL KPIs! He is Apache Spark cerified!'
    const highlightTheseWordsArray = ['ITIL', 'KPIs', 'Apache', 'Apache Spark']

    expect(skillHighlight(highlightTheseWordsArray, textinput)).toBe(expected)
})

test('test to fix C++ bug', () => {
    const expected = 'The smart guy knows his <mark>C++</mark>! He is <mark>Microsoft</mark> cerified!'
    const textinput = 'The smart guy knows his C++! He is Microsoft cerified!'
    const highlightTheseWordsArray = ['C++', 'KPIs', 'Microsoft']

    expect(skillHighlight(highlightTheseWordsArray, textinput)).toBe(expected)
})

test('test skill count compare table', () => {
    const resumeskills = [{ skill: 'dolore', count: '1' }, { skill: 'reprehenderit', count: '2' }]
    const jobskills = [{ skill: 'dolore', count: '2' }, { skill: 'laboris', count: '1' }, { skill: 'reprehenderit', count: '3' }]
    const actual = createSkillCountCompareArray(jobskills, resumeskills)

    expect(actual).toHaveLength(3)
    expect(actual[0]).toHaveProperty('skill')
    expect(actual[0].skill).toBe('dolore')
    expect(actual[0].jobskillcount).toBe('2')
    expect(actual[0].resumeskillcount).toBe('1')
    expect(actual[0]).toHaveProperty('in_resume')

    expect(actual[1].skill).toBe('laboris')
    expect(actual[1].jobskillcount).toBe('1')
    expect(actual[1].resumeskillcount).toBe('0')
    expect(actual[1]).not.toHaveProperty('in_resume')

    expect(actual[2].skill).toBe('reprehenderit')
    expect(actual[2].jobskillcount).toBe('3')
    expect(actual[2].resumeskillcount).toBe('2')
    expect(actual[2]).toHaveProperty('in_resume')
})

test('test skill count compare table 2', () => {
    const resumeskills = [{ skill: 'dolore', count: '1' }, { skill: 'reprehenderit', count: '2' }, { skill: 'laboris', count: '5' }, { skill: 'officia', count: '1' }]
    const jobskills = [{ skill: 'dolore', count: '2' }, { skill: 'laboris', count: '1' }, { skill: 'reprehenderit', count: '3' }]
    const actual = createSkillCountCompareArray(jobskills, resumeskills)

    expect(actual).toHaveLength(3)
    expect(actual[0]).toHaveProperty('skill')
    expect(actual[0].skill).toBe('dolore')
    expect(actual[0].jobskillcount).toBe('2')
    expect(actual[0].resumeskillcount).toBe('1')
    expect(actual[0]).toHaveProperty('in_resume')

    expect(actual[1].skill).toBe('laboris')
    expect(actual[1].jobskillcount).toBe('1')
    expect(actual[1].resumeskillcount).toBe('5')
    expect(actual[1]).toHaveProperty('in_resume')

    expect(actual[2].skill).toBe('reprehenderit')
    expect(actual[2].jobskillcount).toBe('3')
    expect(actual[2].resumeskillcount).toBe('2')
    expect(actual[2]).toHaveProperty('in_resume')
})

test('test skill count compare table 3', () => {
    const jobskills = [{ skill: 'dolore', count: '1' }, { skill: 'reprehenderit', count: '2' }, { skill: 'laboris', count: '5' }, { skill: 'officia', count: '1' }]
    const resumeskills = [{ skill: 'dolore', count: '2' }, { skill: 'laboris', count: '1' }, { skill: 'reprehenderit', count: '3' }]
    const actual = createSkillCountCompareArray(jobskills, resumeskills)

    expect(actual).toHaveLength(4)
    expect(actual[0]).toHaveProperty('skill')
    expect(actual[0].skill).toBe('dolore')
    expect(actual[0].jobskillcount).toBe('1')
    expect(actual[0].resumeskillcount).toBe('2')
    expect(actual[0]).toHaveProperty('in_resume')

    expect(actual[1].skill).toBe('reprehenderit')
    expect(actual[1].jobskillcount).toBe('2')
    expect(actual[1].resumeskillcount).toBe('3')
    expect(actual[1]).toHaveProperty('in_resume')

    expect(actual[2].skill).toBe('laboris')
    expect(actual[2].jobskillcount).toBe('5')
    expect(actual[2].resumeskillcount).toBe('1')
    expect(actual[2]).toHaveProperty('in_resume')

    expect(actual[3].skill).toBe('officia')
    expect(actual[3].jobskillcount).toBe('1')
    expect(actual[3].resumeskillcount).toBe('0')
    expect(actual[3]).not.toHaveProperty('in_resume')
})

test('test skill count compare table with empty resumeskills', () => {
    const resumeskills = [] as any
    const jobskills = [{ skill: 'dolore', count: '1' }, { skill: 'reprehenderit', count: '2' }, { skill: 'laboris', count: '5' }, { skill: 'officia', count: '1' }]
    const actual = createSkillCountCompareArray(jobskills, resumeskills)

    expect(actual).toHaveLength(4)
    expect(actual[0]).toHaveProperty('skill')
    expect(actual[0].skill).toBe('dolore')
    expect(actual[0].jobskillcount).toBe('1')
    expect(actual[0].resumeskillcount).toBe('0')
    expect(actual[0]).not.toHaveProperty('in_resume')

    expect(actual[1].skill).toBe('reprehenderit')
    expect(actual[1].jobskillcount).toBe('2')
    expect(actual[1].resumeskillcount).toBe('0')
    expect(actual[1]).not.toHaveProperty('in_resume')

    expect(actual[2].skill).toBe('laboris')
    expect(actual[2].jobskillcount).toBe('5')
    expect(actual[2].resumeskillcount).toBe('0')
    expect(actual[2]).not.toHaveProperty('in_resume')

    expect(actual[3].skill).toBe('officia')
    expect(actual[3].jobskillcount).toBe('1')
    expect(actual[3].resumeskillcount).toBe('0')
    expect(actual[3]).not.toHaveProperty('in_resume')
})

test('test skill count compare table with empty jobskills', () => {
    const jobskills = [] as any
    const resumeskills = [{ skill: 'dolore', count: '1' }, { skill: 'reprehenderit', count: '2' }, { skill: 'laboris', count: '5' }, { skill: 'officia', count: '1' }]
    const actual = createSkillCountCompareArray(jobskills, resumeskills)

    expect(actual).toHaveLength(0)
})