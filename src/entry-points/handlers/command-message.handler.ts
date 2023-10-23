import { intro, outro, text } from '@clack/prompts'
import { trytm } from '@bdsqqq/try'
import { getGitBranch, getGitCommit } from '../../services/git.service'
import colors from 'picocolors'
import { createClient, sendMessage } from '../../services/slack.service'
import { WebClient } from '@slack/web-api'
import path from 'node:path'
import { getChannelSelected } from '../../data-access/channels'
import { commandValidateCancel } from './shared.handler'
import { getToken } from '../../data-access/credentials'
import { commandInitConfigHandler } from './command-credentials.handler'

export const commandMessageHandler = async () => {
  let selectedChannel = getChannelSelected()
  let token = getToken()
  if (!selectedChannel || !token) {
    await commandInitConfigHandler()
    selectedChannel = getChannelSelected()
    token = getToken()
  }

  intro(colors.green('Generate a pull request message for slack'))

  const client = createClient(token)
  const [lastCommitMessage, errorGetCommit] = await trytm(getGitCommit())
  const [branch, errorGetBranch] = await trytm(getGitBranch())
  const currentDirectory = process.cwd()
  const currentDirectoryName = path.basename(currentDirectory)

  if (errorGetCommit ?? errorGetBranch) {
    outro(colors.red('Error: Comprueba que estás en un repositorio de git'))
    process.exit(1)
  }

  const firstLineMessage = await text({
    message: 'Write a branch and lasts commit message: ',
    initialValue: `${currentDirectoryName}: ${lastCommitMessage}`,
    validate (value) {
      if (value.length === 0) return 'Value is required!'
    }
  })
  commandValidateCancel(firstLineMessage)

  const branchMessage = await text({
    message: 'Write a branch: ',
    initialValue: branch ?? '',
    validate (value) {
      if (value.length === 0) return 'branch name is required'
    }
  })
  commandValidateCancel(branchMessage)

  const prLineMessage = await text({
    message: 'Write a Pull Request URL: ',
    validate (value) {
      if (value.length === 0) return 'Pull Request URL is required!'
    }
  })
  commandValidateCancel(prLineMessage)

  const fullMessage = `${firstLineMessage.toString()} \n${branchMessage.toString()}: ${prLineMessage.toString()}`

  await sendMessage(client as WebClient, fullMessage, selectedChannel)

  outro(`Message Send: \n${colors.green(fullMessage)}`)
  process.exit(0)
}
