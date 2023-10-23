import { WebClient } from '@slack/web-api'

export const sendMessage = async (webClient: WebClient, message: string, channelSelected: string) => {
  try {
    await webClient.chat.postMessage({
      channel: `#${channelSelected}`,
      text: message
    })
  } catch (error: any) {
    console.log(`Error to send message: [reason]: ${error?.message}`)
    process.exit(1)
  }
}

export const createClient = (token: string) => {
  return new WebClient(token)
}
