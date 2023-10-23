import path from 'node:path'
import fs from 'node:fs'
import { fileCredentialName, folderName } from '../constants/constants'

export const changeTokenHandler = (newToken: string) => {
  try {
    const filePath = path.join(folderName, fileCredentialName)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `[token]::${newToken}`)
      console.log('Configuration credential file create')
    } else {
      fs.writeFileSync(filePath, `[token]::${newToken}`)
    }

    console.log('Save token success')
    process.exit(0)
  } catch (error: any) {
    console.log(`Error to register token: [reason]: ${error?.message}`)
    process.exit(1)
  }
}

export const getToken = () => {
  try {
    const file = fs.readFileSync('./.jopr/credentials', 'utf-8')
    if (!file) {
      throw new Error('No credentials found')
    }
    const [, token] = file.toString().split('::')
    return token
  } catch (error: any) {
    console.log(`Error to get token: [reason]: ${error?.message}`)
    process.exit(1)
  }
}

export const updateToken = (newToken: string) => {
  try {
    const filePath = path.join(folderName, fileCredentialName)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `[token]::${newToken}`)
      console.log('Configuration credential file create')
    } else {
      fs.writeFileSync(filePath, `[token]::${newToken}`)
    }

    console.log('Save token success')
  } catch (error: any) {
    console.log(`Error to register token: [reason]: ${error?.message}`)
    process.exit(1)
  }
}
