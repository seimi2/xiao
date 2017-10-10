const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const answers = require('../../assets/json/8-ball');

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8-ball',
			aliases: ['magic-8-ball', 'eight-ball', 'magic-eight-ball'],
			group: 'random-res',
			memberName: '8-ball',
			description: 'Asks your question to the Magic 8 Ball.',
			args: [
				{
					key: 'question',
					prompt: 'What do you want to ask the 8 ball?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { question }) {
		return msg.say(stripIndents`
			${question}
			🎱 ${answers[Math.floor(Math.random() * answers.length)]} 🎱
		`);
	}
};
