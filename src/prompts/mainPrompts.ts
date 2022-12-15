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
