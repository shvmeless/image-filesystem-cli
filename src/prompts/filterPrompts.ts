// IMPORTS
import { ImageFormat } from '../libs/image'
import { prompts } from '../libs/prompts'

// FUNCTION
export async function filterByFormatPrompt (): Promise<ImageFormat[]> {

  const answer = await prompts.checkbox({
    message: 'Check what image formats you want to process:',
    choices: [
      { name: 'JPG', value: 'JPG' },
      { name: 'JPEG', value: 'JPEG' },
      { name: 'PNG', value: 'PNG' },
      { name: 'WEBP', value: 'WEBP' },
    ],
    validate (value: any) {
      if (value.length === 0) return 'You must select at least one format.'
      return true
    },
  })

  return answer

}

// FUNCTION
export async function filterBySizePrompt (): Promise<{ min: number, max: number }> {

  const min = await prompts.number({
    message: 'Enter the min file size you want to filter by:',
    default: 0,
    validate (value: any) {
      const number = parseInt(value)
      if (number < 0) return 'The size must be greater than 0.'
      return true
    },
  }) as any

  const max = await prompts.number({
    message: 'Enter the max file size you want to filter by:',
    default: 0,
    validate (value: any) {
      const number = parseInt(value)
      if (number < 0) return 'The size must be greater than 0.'
      if (number < min) return 'The size must be greater than the minimum size.'
      return true
    },
  }) as any

  return { min, max }

}

// FUNCTION
export async function filterByDatePrompt (): Promise<{ min: Date, max: Date }> {

  let min = await prompts.string({
    message: 'Enter the date you want to filter by:',
    default: new Date(0).toUTCString(),
    validate (value: any) {
      const date = new Date(value).getTime()
      if (isNaN(date)) return 'The date is invalid.'
      return true
    },
  }) as any

  min = new Date(min)

  let max = await prompts.string({
    message: 'Enter the date you want to filter by:',
    default: new Date().toUTCString(),
    validate (value: any) {
      const date = new Date(value).getTime()
      if (isNaN(date)) return 'The date is invalid.'
      if (date < min.getTime()) return 'The date must be greater than the minimum date.'
      return true
    },
  }) as any

  max = new Date(max)

  return { min, max }

}
