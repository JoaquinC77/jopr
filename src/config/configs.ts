import fs from 'node:fs'
import path from 'node:path'
import { fileChannelName, fileCredentialName, folderName } from '../constants/constants'
import colors from 'picocolors'

export const initConfigsCommand = () => {
  const filePathCredentials = path.join(folderName, fileCredentialName)
  const filePathChannels = path.join(folderName, fileChannelName)

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true })
      console.log('Configuration credential file create')
    }

    if (!fs.existsSync(filePathCredentials) || !fs.existsSync(filePathChannels)) {
      fs.writeFileSync(filePathCredentials, '[token]::')
      fs.writeFileSync(filePathChannels, '[channel]::')
      console.log('Configuration credential file create')
    }
  } catch (error) {
    console.log(colors.red('Error create configuration file'))
    process.exit(1)
  }
}
