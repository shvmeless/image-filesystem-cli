// IMPORTS
import { existsSync, statSync } from 'fs'
import { prompts } from '../libs/prompts'
import { cwd } from 'process'

// FUNCTION
export async function dirPathPrompt (): Promise<string> {

  const answer = await prompts.string({
    message: 'Enter the directory:',
    default: cwd(),
    validate (input: string) {
      if (!existsSync(input)) return 'The path does not exist.'
      if (!statSync(input).isDirectory()) return 'The path is not a directory.'
      return true
    },
  })

  return answer

}

// FUNCTION
export async function filterPrompt (): Promise<('FORMAT' | 'SIZE' | 'DATE')[]> {

  const answer = await prompts.checkbox({
    message: 'Check the filters you want to apply:',
    choices: [
      { name: 'Filter by image format.', value: 'FORMAT' },
      { name: 'Filter by file size.', value: 'SIZE' },
      { name: 'Filter by modification date.', value: 'DATE' },
    ],
  })

  return answer

}

// FUNCTION
export async function featurePrompt (): Promise<'RENAME' | 'REFORMAT' | 'RESIZE'> {

  const feature = await prompts.list({
    message: 'Select the feature you want to use:',
    choices: [
      { name: 'RENAME', value: 'RENAME' },
      { name: 'REFORMAT', value: 'REFORMAT' },
      { name: 'RESIZE', value: 'RESIZE' },
    ],
  })

  return feature

}
