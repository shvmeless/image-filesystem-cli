// IMPORts
import { renameSync, rmSync, writeFileSync } from 'fs'
import { Image, ImageFormat } from './image'
import { output } from './output'
import { join } from 'path'
import sharp from 'sharp'

// FUNCTION
async function renameImages (images: Image[], prefix: string): Promise<void> {

  let count = 1
  for (const image of images) {

    if (!image.isValid()) {
      output.error(`Cannot resize **${image.basename}** because it does not exist.`)
      continue
    }

    const newBasename = `${prefix}${count}${image.extension}`
    const newPath = join(image.dirname, newBasename)

    try {

      renameSync(image.path, newPath)

      output.success(`Rename **${image.basename}** to **${newBasename}**.`)
      count++

    } catch { output.error(`Cannot rename **${image.basename}** to **${newBasename}**.`) }

  }

}

// FUNCTION
async function reformatImages (images: Image[], newFormat: ImageFormat): Promise<void> {

  for (const image of images)
    try {

      if (!image.isValid()) {
        output.error(`Cannot resize **${image.basename}** because it does not exist.`)
        continue
      }

      const newBasename = `${image.filename}.${newFormat.toLowerCase()}`
      const newPath = join(image.dirname, newBasename)

      if (image.format === newFormat) {
        output.warning(`Skipping **${image.basename}** because it is already in **${newFormat.toUpperCase()}** format.`)
        continue
      }

      await sharp(image.path).toFile(newPath)
      rmSync(image.path)

      output.success(`Change format of **${image.basename}** from **${image.format.toUpperCase()}** to **${newFormat.toUpperCase()}**.`)

    } catch { output.error(`Cannot change format of ${image.basename} from **${image.format.toUpperCase()}** to **${newFormat.toUpperCase()}**.`) }

}

// FUNCTION
async function resizeImages (images: Image[], size: { width: number, height: number }): Promise<void> {

  if (size.width < 0) size.width = 0
  if (size.height < 0) size.height = 0

  if (size.width === 0 && size.height === 0) return

  for (const image of images)
    try {

      if (!image.isValid()) {
        output.error(`Cannot resize **${image.basename}** because it does not exist.`)
        continue
      }

      const imageData = await sharp(image.path).metadata()
      const imageHeight = imageData.height ?? 0
      const imageWidth = imageData.width ?? 0

      if (imageHeight === 0 || imageWidth === 0) continue

      const newWidth = size.width === 0 ? Math.round(size.height * imageWidth / imageHeight) : size.width
      const newHeight = size.height === 0 ? Math.round(size.width * imageHeight / imageWidth) : size.height

      const newBasename = `${image.filename}${image.extension}`
      const newPath = join(image.dirname, newBasename)

      const buffer = await sharp(image.path)
        .resize(newWidth, newHeight, { kernel: sharp.kernel.lanczos3, withoutEnlargement: true })
        .toBuffer()

      writeFileSync(newPath, buffer)

      output.success(`Resize **${image.basename}** to **${newWidth}**x**${newHeight}**.`)

    } catch { output.error(`Cannot resize **${image.basename}** to **${size.width}**x$**{size.height}**.`) }

}

// EXPORT
export const features = {
  rename: renameImages,
  reformat: reformatImages,
  resize: resizeImages,
}
