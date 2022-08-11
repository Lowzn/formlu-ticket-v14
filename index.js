const {PermissionsBitField, EmbedBuilder, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, 
    Partials.Channel, 
    Partials.GuildMember, 
    Partials.Reaction, 
    Partials.GuildScheduledEvent,
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildBans, 
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token)


const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Godzilla - Destek Sistemi!')
  const a1 = new TextInputBuilder()
  .setCustomId('sebep')
  .setLabel('Destek Açma Sebebiniz?')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Destek Oluşturma Sebebiniz Nedir?')
  .setRequired(true)
  const row = new ActionRowBuilder().addComponents(a1);
  
  modal.addComponents(row);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "ticket"){
    await interaction.showModal(modal);
	}
})  
client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form') {
    const sebep = interaction.fields.getTextInputValue('sebep')
  
const row = new ActionRowBuilder()
.addComponents( 
  new SelectMenuBuilder()
  .setCustomId('del')
.setPlaceholder('Bileti silmek için seçin!')
.addOptions([
{
label: 'Bileti Sil',
description: 'Kanalı sil',
emoji: "1002538609003470898",
value: 'delete',
}
])
);

  let data3 =  db.get("destek"+ interaction.guild.id)
  let roleStaff = interaction.guild.roles.cache.get(data3.rolID)
  let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
              if (DejaUnChannel) return interaction.reply({content: 'Sunucuda zaten açık bir biletiniz var.', ephemeral: true})
              let role = interaction.guild.roles.cache.find(a => a.name === '@everyone')    
              interaction.guild.channels.create({
              name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
        
                permissionOverwrites: [
                  {   
                      id: interaction.guild.id,
                      deny: [PermissionsBitField.Flags.ViewChannel]
                  },
                  {
                      id: interaction.user.id,
                      allow: [PermissionsBitField.Flags.ViewChannel]
                  },
                  {
                      id: roleStaff,
                      allow: [PermissionsBitField.Flags.ViewChannel]
                  }
              ]
            })
            
                  
                  .then((c)=>{
                 
                      const i1 = new EmbedBuilder()
                      .setTitle('Godzilla - Destek Sistemi')
                      .setDescription(`Kullanıcı Destek Talebini **${sebep}** Sebebiyle Oluşturdu!\n\nDestek Oluşturan: ${interaction.user}`)
                      .setColor(0x0099ff)
                      c.send({embeds: [i1], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                      interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                  })
          
          }
        })
        client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "del") {
          if (interaction.values[0] == "delete") {
	      let log = db.fetch(`log_${interaction.guild.id}`)
              const channel = interaction.channel
              channel.delete();
              client.channels.cache.get(log).send(`<@${interaction.user.id}> Adlı Kullanıcı **${interaction.channel.name}** Adlı Desteği Sildi!`)
            
          }
        }
        })
      
