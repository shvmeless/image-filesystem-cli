// IMPORTS
import { Image } from './image'
import natsort from 'natsort'

// FUNCTION
function sortByName (images: Image[], reverse = false): Image[] {

  const sortedImages = images.sort((a, b) => natsort()(a.basename, b.basename))

  if (reverse) return sortedImages.reverse()
  else return sortedImages

}

// FUNCTION
function sortBySize (images: Image[], reverse = false): Image[] {

  const sortedImages = images.sort((a, b) => a.size - b.size)

  if (reverse) return sortedImages.reverse()
  else return sortedImages

}

// FUNCTION
function sortByDate (images: Image[], reverse = false): Image[] {

  const sortedImages = images.sort((a, b) => {

    const aDate = a.date.getTime()
    const bDate = b.date.getTime()

    return aDate - bDate

  })

  if (reverse) return sortedImages.reverse()
  else return sortedImages

}

// FUNCTION
function sortByFormat (images: Image[], reverse = false): Image[] {

  const formats: { [key: string]: Image[] } = {}

  images.forEach((image) => {

    if (formats[image.format] === undefined) formats[image.format] = []
    formats[image.format].push(image)

  })

  const sortedFormats = Object.keys(formats).sort((a, b) => natsort()(a, b))

  sortedFormats.forEach((format) => {

    formats[format] = formats[format].sort((a, b) => natsort()(a.basename, b.basename))

  })

  const sortedImages: Image[] = []

  sortedFormats.forEach((format) => {

    sortedImages.push(...formats[format])

  })

  if (reverse) return sortedImages.reverse()
  else return sortedImages

}

// EXPORTS
export const sortImages = {
  byName: sortByName,
  bySize: sortBySize,
  byDate: sortByDate,
  byFormat: sortByFormat,
}
