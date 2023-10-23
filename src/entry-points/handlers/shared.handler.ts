import { cancel, isCancel } from '@clack/prompts'
import colors from 'picocolors'

export const commandValidateCancel = (value: string | symbol) => {
  if (isCancel(value)) {
    cancel(colors.yellow('Operation cancelled.'))
    process.exit(0)
  }
}
