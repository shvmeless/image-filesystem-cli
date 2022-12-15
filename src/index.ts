// IMPORTS
import { filterByDatePrompt, filterByFormatPrompt, filterBySizePrompt } from './prompts/filterPrompts'
import { reformatPrompt, renamePrompt, resizePrompt } from './prompts/featurePrompts'
import { dirPathPrompt, featurePrompt, filterPrompt } from './prompts/mainPrompts'
import { Image, readImages } from './libs/image'
import { filterImages } from './libs/filtering'
import { sortImages } from './libs/sorting'
import { features } from './libs/features'
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
    images = await filterMenu(images)

    output.newline()
    output.info(`${images.length} images found.`)
    output.newline()

    main(dirPath).catch((error) => { output.error(error.message) })

  } catch (error: any) { output.error(error.message) }
}

// FUNCTION
async function filterMenu (images: Image[]): Promise<Image[]> {

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

  await featureMenu(images)

  return images

}

// FUNCTION
async function featureMenu (images: Image[]): Promise<void> {

  const feature = await featurePrompt()

  if (feature === 'RENAME') {

    const rename = await renamePrompt()

    const prefix = rename.prefix
    const sort = rename.sort
    const reverse = rename.order === 'DESC'

    if (sort === 'NAME') images = sortImages.byName(images, reverse)
    else if (sort === 'SIZE') images = sortImages.bySize(images, reverse)
    else if (sort === 'DATE') images = sortImages.byDate(images, reverse)
    else if (sort === 'FORMAT') images = sortImages.byFormat(images, reverse)

    output.newline()
    await features.rename(images, prefix)

  } else if (feature === 'REFORMAT') {

    const format = await reformatPrompt()
    output.newline()
    await features.reformat(images, format)

  } else if (feature === 'RESIZE') {

    const { width, height } = await resizePrompt()
    output.newline()
    await features.resize(images, { width, height })

  }

}

// RUN
main().catch((error) => { output.error(error.message) })
