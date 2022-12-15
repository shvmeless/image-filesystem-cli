// IMPORTS
import { ImageFormat } from '../libs/image'
import { prompts } from '../libs/prompts'

// FUNCTION
export async function reformatPrompt (): Promise<ImageFormat> {

  const answer = await prompts.list({
    message: 'Select the format you want to use:',
    choices: [
      { name: 'JPG', value: 'JPG' },
      { name: 'JPEG', value: 'JPEG' },
      { name: 'PNG', value: 'PNG' },
      { name: 'WEBP', value: 'WEBP' },
    ],
  })

  return answer

}

// FUNCTION
export async function resizePrompt (): Promise<{ width: number, height: number }> {

  const width = await prompts.number({
    message: 'Enter the width you want to use:',
    validate (value: any) {
      const number = parseInt(value)
      if (number < 1) return 'The width must be greater than 0.'
      return true
    },
  }) as any

  const height = await prompts.number({
    message: 'Enter the height you want to use:',
    validate (value: any) {
      const number = parseInt(value)
      if (number < 1) return 'The height must be greater than 0.'
      return true
    },
  }) as any

  return { width, height }

}

// FUNCTION
export async function renamePrompt (): Promise<{ prefix: string, sort: 'NAME' | 'SIZE' | 'DATE' | 'FORMAT', order: 'ASC' | 'DESC' }> {

  let prefix = await prompts.string({
    message: 'Enter the prefix you want to use:',
    validate (value: any) {
      value = value.trim()
      if ((/[\\/:*?"<>|]/gm).test(value)) return 'The prefix cannot contain any of the following characters: \\/:*?"<>|'
      return true
    },
  })

  prefix = prefix.trim()

  const sort = await prompts.list({
    message: 'Select the sort you want to use:',
    choices: [
      { name: 'NAME', value: 'NAME' },
      { name: 'SIZE', value: 'SIZE' },
      { name: 'DATE', value: 'DATE' },
      { name: 'FORMAT', value: 'FORMAT' },
    ],
  })

  const order = await prompts.list({
    message: 'Select the order you want to use:',
    choices: [
      { name: 'Ascending', value: 'ASC' },
      { name: 'Descending', value: 'DESC' },
    ],
  })

  return { prefix, sort, order }

}
