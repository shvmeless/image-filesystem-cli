// IMPORTS
import { stdout } from 'process'

// STYLES
const ITALIC = '\x1b[3m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

// COLORS
const ERROR = '\x1b[31m'
const INFO = '\x1b[36m'
const SUCCESS = '\x1b[32m'
const WARNING = '\x1b[33m'
const LIGHT = '\x1b[90m'

// FUNCTION
function formatMessage (message: string, color: string): string {

  const regex = /(\*{1,3})([^*]+)(\*{1,3})/g

  message = message.replace(regex, (match, p1: string, p2: string) => {

    if (p1.length === 3) return `${LIGHT}${BOLD}${ITALIC}${p2}${RESET}`
    if (p1.length === 2) return `${color}${BOLD}${p2}${RESET}`
    if (p1.length === 1) return `${LIGHT}${ITALIC}${p2}${RESET}`

    return ''

  })

  return message

}

// FUNCTION
function infoOutput (message: string): void {

  const title = `${BOLD}${INFO}Info${RESET}`
  message = formatMessage(message, INFO)

  stdout.write(`${title} ${message}\n`)

}

// FUNCTION
function successOutput (message: string): void {

  const title = `${BOLD}${SUCCESS}Success${RESET}`
  message = formatMessage(message, SUCCESS)

  stdout.write(`${title} ${message}\n`)

}

// FUNCTION
function warningOutput (message: string): void {

  const title = `${BOLD}${WARNING}Warning${RESET}`
  message = formatMessage(message, WARNING)

  stdout.write(`${title} ${message}\n`)

}

// FUNCTION
function errorOutput (message: string): void {

  const title = `${BOLD}${ERROR}Error${RESET}`
  message = formatMessage(message, ERROR)

  stdout.write(`${title} ${message}\n`)

}

// FUNCTION
function newlineOutput (): void {
  stdout.write('\n')
}

// EXPORTS
export const output = {
  success: successOutput,
  info: infoOutput,
  warning: warningOutput,
  error: errorOutput,
  newline: newlineOutput,
}
