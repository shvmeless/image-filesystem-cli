// IMPORTS
import { filterByDatePrompt, filterByFormatPrompt, filterBySizePrompt } from './prompts/filterPrompts'
import { dirPathPrompt, filterPrompt } from './prompts/mainPrompts'
import { Image, readImages } from './libs/image'
import { filterImages } from './libs/filtering'
import { sortImages } from './libs/sorting'
import { output } from './libs/output'
import sharp from 'sharp'

// CACHE
sharp.cache(false)

// FUNCTION
async function main (path?: string): Promise<void> {
  try {

    const dirPath = path ?? await dirPathPrompt()

    let images = readImages(dirPath)
    images = sortImages.byName(images)
    images = await filter(images)

    main(dirPath).catch((error) => { output.error(error.message) })

  } catch (error: any) { output.error(error.message) }
}

// FUNCTION
async function filter (images: Image[]): Promise<Image[]> {

  const filters = await filterPrompt()

  if (filters.includes('FORMAT')) {
    const formats = await filterByFormatPrompt()
    images = filterImages.byFormat(images, formats)
  }

  if (filters.includes('SIZE')) {
    const { min, max } = await filterBySizePrompt()
    images = filterImages.bySize(images, { min, max })
  }

  if (filters.includes('DATE')) {
    const { min, max } = await filterByDatePrompt()
    images = filterImages.byDate(images, { min, max })
  }

  output.newline()
  output.info(`${images.length} images found.`)
  output.newline()

  return images

}

// RUN
main().catch((error) => { output.error(error.message) })
