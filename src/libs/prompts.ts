// IMPORTS
import { prompt } from 'inquirer'

// FUNCTION
async function stringPrompt (options: {
  message: string
  default?: string
  validate?(input: string): boolean | string
}): Promise<string> {

  let { input } = await prompt({
    type: 'input',
    name: 'input',
    message: options.message,
    default: options.default,
    validate: options.validate,
  })

  input = input.trim()

  return input

}

// FUNCTION
async function numberPrompt (options: {
  message: string
  default?: number
  validate?(input: string): boolean | string
}): Promise<number> {

  let { input } = await prompt({
    type: 'number',
    name: 'input',
    message: options.message,
    default: options.default,
    validate: options.validate,
  })

  input = parseInt(input)

  if (isNaN(input)) return 0

  return input

}

// FUNCTION
async function listPrompt<T extends string> (options: {
  message: string
  choices: { name: string, value: T }[]
}): Promise<T> {

  const { answer } = await prompt({
    type: 'list',
    name: 'answer',
    message: options.message,
    choices: options.choices,
  })

  return answer

}

// FUNCTION
async function checkboxPrompt<T extends string> (options: {
  message: string
  choices: { name: string, value: T }[]
  validate?(input: string): boolean | string
}): Promise<T[]> {

  const { answers } = await prompt({
    type: 'checkbox',
    name: 'answers',
    message: options.message,
    choices: options.choices,
    validate: options.validate,
  })

  return answers

}

// EXPORT
export const prompts = {
  string: stringPrompt,
  number: numberPrompt,
  list: listPrompt,
  checkbox: checkboxPrompt,
}
