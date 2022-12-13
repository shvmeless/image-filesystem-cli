// IMPORTS
import { Image, ImageFormat } from './Image'

// FUNCTION
function filterByFormat (images: Image[], formats: ImageFormat[]): Image[] {

  formats = Array.from(new Set(formats))

  if (formats.length === 0) return [...images]

  return images.filter((image) => {
    return formats.includes(image.format)
  })

}

// FUNCTION
function filterBySize (images: Image[], size: { min: number, max: number }): Image[] {

  if (size.min < 0) size.min = 0
  if (size.max < 0) size.max = 0

  const min = Math.min(size.min, size.max)
  const max = Math.max(size.min, size.max)

  if (min === 0 && max === 0) return [...images]

  return images.filter((image) => {
    return (image.size >= min && image.size <= max)
  })

}

// FUNCTION
function filterByDate (images: Image[], date: { min: Date, max: Date }): Image[] {

  const minTime = date.min.getTime()
  const maxTime = date.max.getTime()

  const min = Math.min(minTime, maxTime)
  const max = Math.max(minTime, maxTime)

  return images.filter((image) => {
    const imageTime = image.date.getTime()
    return (imageTime >= min && imageTime <= max)
  })

}

// EXPORTS
export const filterImages = {
  byFormat: filterByFormat,
  bySize: filterBySize,
  byDate: filterByDate,
}
