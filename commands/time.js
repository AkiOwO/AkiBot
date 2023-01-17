const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Displays time for all users timezones.')
		.addStringOption(option =>
			option
				.setName('datetime')
				.setDescription('The time you want to display.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('timezone')
				.setDescription('The timezone you want.')
                .setRequired(true)
                .addChoices(
                    { name: "GMT Greenwich Mean Time (UTC+0)", value: "0" },
                    { name: "ECT European Central Time (UTC+1)", value: "-1" },
                    { name: "EET Eastern European Time (UTC+2)", value: "-2" },
                    { name: "EAT Eastern African Time (UTC+3)", value: "-3" },
                    { name: "NET Near East Time (UTC+4)", value: "-4" },
                    { name: "PLT Pakistan Lahore Time (UTC+5)", value: "-5" },
                    { name: "BST Bangladesh Standard Time (UTC+6)", value: "-6" },
                    { name: "VST Vietnam Standard Time (UTC+7)", value: "-7" },
                    { name: "CTT China Taiwan Time (UTC+8)", value: "-8" },
                    { name: "JST Japan Standard Time (UTC+9)", value: "-9" },
                    { name: "AET Australia Eastern Time (UTC+10)", value: "-10" },
                    { name: "SST Solomon Standard Time (UTC+11)", value: "-11" },
                    { name: "NST New Zealand Standard Time (UTC+12)", value: "-12" },
                    { name: "MIT Midway Islands Time (UTC-11)", value: "11" },
                    { name: "HST Hawaii Standard Time (UTC-10)", value: "10" },
                    { name: "AST Alaska Standard Time (UTC-9)", value: "9" },
                    { name: "PST Pacific Standard Time (UTC-8)", value: "8" },
                    { name: "MST Mountain Standard Time (UTC-7)", value: "7" },
                    { name: "CST Central Standard Time (UTC-6)", value: "6" },
                    { name: "EST Eastern Standard Time (UTC-5)", value: "5" },
                    { name: "IET Indiana Eastern Standard Time (UTC-5)", value: "5" },
                    { name: "PRT Puerto Rico and US Virgin Islands Time (UTC-4)", value: "4" },
                    { name: "AGT Argentina Standard Time (UTC-3)", value: "3" },
                    { name: "BET Brazil Eastern Time (UTC-3)", value: "3" },
                    { name: "CAT Central African Time (UTC-1)", value: "1" }
                )),
    async execute(interaction) {

        //outputs to console and file
        const logOutputConsole = new console.Console(fs.createWriteStream('./log.txt', { flags: 'a' }));

        const datetime = interaction.options.getString('datetime').toLowerCase();
        const timezone = interaction.options.getString('timezone');

        const currentDate = new Date();

        const fullYear = currentDate.getFullYear();
        const fullMonth = currentDate.getMonth();
        const fullDay = currentDate.getDate();
        const fullHour = currentDate.getHours();
        const fullMinute = currentDate.getMinutes();
        const fullSecond = currentDate.getSeconds();

        var logDate = `${fullDay}-${fullMonth + 1}-${fullYear} ${fullHour}:${fullMinute}:${fullSecond}`;
        var userName = interaction.user.username;
        

        var logOutput = `[${logDate}] username: ${userName} | datetime: ${datetime} | timezone: ${timezone} | command: time | interaction.user.id: ${interaction.user.id}`;
        console.log(logOutput);
        logOutputConsole.log(logOutput);

        var dateTimeArrayHour = 0;
        var dateTimeArrayMinute = 0;
        var isAM = false;
        var isPM = false;

        //remove spaces to sanitize input
        datetime.replace(' ', '');

        //check if time is AM or PM
        if (datetime.includes("pm")) {
            isPM = true;
        } else if (datetime.includes("am")) {
            isAM = true;
        }

        //remove AM or PM from datetime for clean splitting later on
        if (isPM) {
            datetime.replace('pm', '');
        } else if (isAM) {
            datetime.split('am', '');
        }

        //split the datetime into an array
        const dateTimeArray = datetime.split(":");

        //convert to 24 hour time if isPM
        if (isPM) {
            dateTimeArray[0] = parseInt(dateTimeArray[0]) + 12;
        }

        //convert to 24 hour time if isAM and 12 (because 12:00am is 00:00)
        if (isAM && dateTimeArray[0] == 12) {
            dateTimeArray[0] = 0;
        }

        //different cases depending on how long the array is
        switch (dateTimeArray.length) {
            case 1:
                dateTimeArrayHour = dateTimeArray[0];
                break;
            case 2:
                dateTimeArrayHour = dateTimeArray[0];
                dateTimeArrayMinute = dateTimeArray[1];
                break;
            case 3:
                break;
            default:
                await interaction.reply(`Your input seems to be invalid. Please try again.`);
                return;
        }

        

        var actualDayOffsetShit = (parseInt(dateTimeArrayHour) + parseInt(timezone)) + 1;

        const d = new Date(fullYear, fullMonth, fullDay, parseInt(actualDayOffsetShit), parseInt(dateTimeArrayMinute));
        const dUTC = d.getTime() / 1000;

        //var utcDate = new Date(Date.UTC(dateDate.getFullYear, dateDate.getMonth, dateDate.getDay, dateDate.getHours, dateDate.getSeconds, dateDate.getMilliseconds));
        //console.log("DAAATEEEEE: " + new Date(utcDate));

        //var utc = dateDate.getTime() + (dateDate.getTimezoneOffset() * 60000);
        //console.log("offset: " + dateDate.getTimezoneOffset());

        //const yes = Math.floor(Date.UTC(2021, 10, 1, 12, 0, 0) / 1000);

        //const test = Math.floor(Date.now() / 1000);

        await interaction.reply({ content: `The given time is: <t:${dUTC}:t>. To share this, copy and use \`<t:${dUTC}:t>\` in your message.`, ephemeral: true });
    },
};