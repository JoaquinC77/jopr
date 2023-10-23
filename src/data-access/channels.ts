import path from 'node:path'
import fs from 'node:fs'
import { fileChannelName, folderName } from '../constants/constants'
import picocolors from 'picocolors'

export const changeChannelSendMessageHandler = (channelName: string) => {
  try {
    const filePath = path.join(folderName, fileChannelName)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `[channel]::${channelName}`)
      console.log('Configuration credential file create')
    } else {
      fs.writeFileSync(filePath, `[channel]::${channelName}`)
    }
    process.exit(0)
  } catch (error: any) {
    console.log(`Error to register token: [reason]: ${error?.message}`)
    process.exit(1)
  }
}

export const channelListHandler = () => {
  try {
    const filePath = path.join(folderName, fileChannelName)
    if (!fs.existsSync(filePath)) {
      console.log('No channel list')
      process.exit(0)
    }
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const [, channel] = fileContent.split('::')
    console.log(picocolors.green(`* ${channel}`))
    process.exit(0)
  } catch (error: any) {
    console.log(`Error to get channel-list: [reason]: ${error?.message}`)
    process.exit(1)
  }
}

export const getChannelSelected = () => {
  try {
    const file = fs.readFileSync('./.jopr/channels', 'utf-8')
    if (!file) {
      throw new Error('No channel selected')
    }
    const [, channel] = file.toString().split('::')
    return channel
  } catch (error: any) {
    console.log(`Error to get channel selected: [reason]: ${error?.message}`)
    process.exit(1)
  }
}

export const updateChannel = (channelName: string) => {
  try {
    const filePath = path.join(folderName, fileChannelName)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `[channel]::${channelName}`)
      console.log('Configuration credential file create')
    } else {
      fs.writeFileSync(filePath, `[channel]::${channelName}`)
    }
  } catch (error: any) {
    console.log(`Error to register token: [reason]: ${error?.message}`)
    process.exit(1)
  }
}
