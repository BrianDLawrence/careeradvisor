import { assert, expect, test } from 'vitest'
import { parseSkillsFromText, parseSkillsWCountFromText } from '../composables/skillUtils'

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