import { intro, outro, text } from '@clack/prompts'
import picocolors from 'picocolors'
import { commandValidateCancel } from './shared.handler'
import { updateToken } from '../../data-access/credentials'
import { getChannelSelected, updateChannel } from '../../data-access/channels'

export const commandChangeChannelSendMessageHandler = (channelName: string) => {
  updateChannel(channelName)
  process.exit(0)
}

export const commandChangeTokenHandler = (newToken: string) => {
  updateToken(newToken)
  process.exit(0)
}

export const commandChannelListHandler = () => {
  const channel = getChannelSelected()
  console.log(`* ${channel}`)
  process.exit(0)
}

export const commandInitConfigHandler = async () => {
  intro(picocolors.green('Welcome to command line! let\'s start with the configuration'))

  const tokenConfiguration = await text({
    message: 'Write a slack token: ',
    validate (value: string) {
      if (value.length === 0) return 'token is required'
    }
  })
  commandValidateCancel(tokenConfiguration)

  const channelNameConfiguration = await text({
    message: 'Write a channel name to send message: ',
    validate (value: string) {
      if (value.length === 0) return 'channel name is required'
    }
  })
  commandValidateCancel(channelNameConfiguration)

  updateToken(tokenConfiguration.toString())
  updateChannel(channelNameConfiguration.toString())

  outro(picocolors.green('Configuration complete!'))
}
