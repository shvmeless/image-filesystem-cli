// IMPORTS
import { dirPathPrompt } from './prompts/mainPrompts'
import { output } from './libs/output'
import sharp from 'sharp'

// CACHE
sharp.cache(false)

// FUNCTION
export async function main (path?: string): Promise<void> {
  try {

    const dirPath = path ?? await dirPathPrompt()

    main(dirPath).catch((error) => { output.error(error.message) })

  } catch (error: any) { output.error(error.message) }
}

// RUN
main().catch((error) => { output.error(error.message) })
