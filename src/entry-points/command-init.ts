import { program } from 'commander'
import { commandMessageHandler } from '../entry-points/handlers/command-message.handler'
import { initConfigsCommand } from '../config/configs'
import { commandChangeChannelSendMessageHandler, commandChangeTokenHandler, commandChannelListHandler, commandInitConfigHandler } from './handlers/command-credentials.handler'

initConfigsCommand()

program.version('0.0.1').description('Command line to create pull request message for slack')
program.command('channel-config <channel>').alias('c').description('Command to configuration channel name to send messages').action(commandChangeChannelSendMessageHandler)
program.command('channel-list').alias('l').description('Command to list all channels').action(commandChannelListHandler)
program.command('token <token>').alias('t').description('Command to configuration slack token').action(commandChangeTokenHandler)
program.command('message').alias('m').description('Command to send message to slack').action(commandMessageHandler)
program.command('init').alias('i').description('init configuration application commands').action(commandInitConfigHandler)
program.parse(process.argv)
