// IMPORTS
import { existsSync, readdirSync, statSync } from 'fs'
import pathLib from 'path'

// TYPES
export type ImageFormat = 'JPG' | 'JPEG' | 'PNG' | 'WEBP'
export type ImageExtension = '.jpg' | '.jpeg' | '.png' | '.webp'

// CLASS
export class Image {

  // PROPERTIES
  public path: string
  public dirname: string
  public basename: string
  public filename: string
  public extension: ImageExtension
  public format: ImageFormat
  public size: number
  public date: Date

  // CONSTRUCTOR
  constructor (path: string) {

    const stats = statSync(path)

    if (!stats.isFile()) throw new Error(`The path ${path} is not a file.`)
    if (!existsSync(path)) throw new Error(`The file ${path} does not exist.`)

    this.path = path
    this.extension = pathLib.extname(path) as ImageExtension
    this.dirname = pathLib.dirname(path)
    this.basename = pathLib.basename(path)
    this.filename = pathLib.basename(path, this.extension)
    this.format = this.extension.replace('.', '').toUpperCase() as ImageFormat

    if (this.extension !== '.jpg' && this.extension !== '.jpeg' && this.extension !== '.png' && this.extension !== '.webp')
      throw new Error(`The file "${path}" is not an image.`)

    if (this.format !== 'JPG' && this.format !== 'JPEG' && this.format !== 'PNG' && this.format !== 'WEBP')
      throw new Error(`The file "${path}" is not an image.`)

    this.size = stats.size
    this.date = stats.mtime

  }

  // METHOD
  public isValid (): boolean {
    try {

      const stats = statSync(this.path)
      if (existsSync(this.path)) return true
      if (stats.isFile()) return true
      return false

    } catch { return false }
  }

}

// FUNCTION
export function readImages (dirPath: string): Image[] {

  if (!existsSync(dirPath)) throw new Error(`The path ${dirPath} does not exist.`)

  const isDir = statSync(dirPath).isDirectory()
  if (!isDir) throw new Error(`The path ${dirPath} is not a directory.`)

  const images: Image[] = []

  readdirSync(dirPath).forEach((file) => {
    try {

      const filePath = pathLib.join(dirPath, file)
      const image = new Image(filePath)

      images.push(image)

    } catch {}
  })

  return images

}
