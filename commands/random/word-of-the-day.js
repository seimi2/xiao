const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { WORDNIK_KEY } = process.env;

module.exports = class WordOfTheDayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'word-of-the-day',
			aliases: ['wordnik-word-of-the-day'],
			group: 'random',
			memberName: 'word-of-the-day',
			description: 'Gets the word of the day.',
			clientPermissions: ['EMBED_LINKS']
		});
	}

	async run(msg) {
		try {
			const { body } = await snekfetch
				.get('http://api.wordnik.com/v4/words.json/wordOfTheDay')
				.query({ api_key: WORDNIK_KEY });
			const embed = new MessageEmbed()
				.setAuthor('Wordnik', 'https://i.imgur.com/VcLZLXn.jpg')
				.setColor(0xFE6F11)
				.setTitle(body.word)
				.setURL('http://wordnik.com/word-of-the-day')
				.setDescription(`(${body.definitions[0].partOfSpeech || 'N/A'}) ${body.definitions[0].text}`);
			return msg.embed(embed);
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};