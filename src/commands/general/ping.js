const Discord = require('discord.js')
const { BaseCommand } = require('../../structures')

class Command extends BaseCommand {
  constructor (client) {
    super(client,
      'ping',
      ['핑'],
      ['Everyone'],
      'GENERAL_INFO',
      {
        audioNodes: false,
        playingStatus: false,
        voiceStatus: {
          listenStatus: false,
          sameChannel: false,
          voiceIn: false
        }
      },
      false
    )
  }

  async run ({ message, guildData }) {
    const { locale } = guildData
    const picker = this.client.utils.localePicker
    const embed = new Discord.MessageEmbed()

    embed.setTitle(picker.get(locale, 'COMMANDS_PING_PING'))
    embed.setColor(this.client.utils.find.getColor(message.member))
    embed.setDescription(picker.get(locale, 'COMMANDS_PING_PINGING'))

    const m = await message.channel.send(message.author, embed)
    embed.setTitle(picker.get(locale, 'COMMANDS_PING_PONG'))
    embed.setDescription(picker.get(locale, 'COMMANDS_PING_RESULT', { WEBSOCKET: `${this.client.ws.ping}ms`, RESPONSE: `${m.createdAt - message.createdTimestamp}ms` }))
    embed.setTimestamp(new Date().getTime())
    await m.edit(message.author, embed)
  }
}

module.exports = Command
