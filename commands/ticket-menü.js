const {ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const db = require("croxydb")
const config = require("../config.js")
const prefix = config.prefix
exports.run = async (client, message, args) => {
	if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olman gerekiyor!")
	let tit = message.content.slice(prefix.length + 'ticket-oluştur'.length);
	if(!tit.includes("+")) return message.reply("!ticket-oluştur Buton Yazısı + Embed Yazısı")
        let tit2 = tit.split('+');
 
	
  let hm = await db.get("destek"+ message.guild.id)
  if(!hm) return message.channel.send('Destek Rolü Ayarlamadan Menüyü Göremezsin :D?')
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setLabel(`${tit2[0]}`)
				.setStyle(ButtonStyle.Primary)
				.setCustomId("ticket")
			)
			const embed = new EmbedBuilder()
			.setTitle("Godzilla - Destek Sistemi!")
			.setDescription(`${tit2[1]}`)
			.setColor(0x0099ff)
		
        message.channel.send({embeds: [embed], components: [row]})
    }
	exports.conf = {
	  aliases: []
	};
	
	exports.help = {
	  name: "ticket-oluştur"
	};
	


