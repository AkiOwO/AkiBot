const { time } = require('console');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

var test = 0;

async function functionName(isAM, parameter2, parameter3) {
    // code to be executed
}

function isAmOrPm(time) {
    if (time.includes("am")) {
        return true;
    } else if (time.includes("pm")) {
        return false;
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeframe')
		.setDescription('Displays a timeframe for all users timezones.')
		.addStringOption(option =>
			option
				.setName('from')
				.setDescription('Timeframe time from.')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName('to')
                .setDescription('Timeframe time to.')
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

        const timeFrom = interaction.options.getString('from').toLowerCase();
        const timeTo = interaction.options.getString('to').toLowerCase();
        const timezone = interaction.options.getString('timezone');

        const timeFromObject = {type:"timeFrom", value:timeFrom};
        const timeToObject = {type:"timeTo", value:timeTo};

        const times = [timeFromObject, timeToObject];
        console.log("test: " + test);
        const currentDate = new Date();
        
        const fullDate = {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
            hour: currentDate.getHours(),
            minute: currentDate.getMinutes(),
            second: currentDate.getSeconds()
        }

        const name = functionName(timeFrom, timeTo, timezone);

        var logDate = `${fullDate.day}-${fullDate.month + 1}-${fullDate.year} ${fullDate.hour}:${fullDate.minute}:${fullDate.second}`;
        var userName = interaction.user.username;

        var logOutput = `[${logDate}] username: ${userName} | timefrom: ${timeFrom} | timeto: ${timeTo} | timezone: ${timezone} | command: timeframe | interaction.user.id: ${interaction.user.id}`;
        console.log(logOutput);
        logOutputConsole.log(logOutput);

        var timeFromArrayHour = 0;
        var timeFromArrayMinute = 0;

        var timeToArrayHour = 0;
        var timeToArrayMinute = 0;

        times.forEach(element => {

            var isAM = true;

            //remove spaces to sanitize input
            element.value.replace(' ', '');
            if (element.value.includes("am") || element.value.includes("pm")) {
                isAM = isAmOrPm(element.value);
                element.value.replace('pm', '');
                element.value.replace('am', '');
            }

            //split the datetime into an array
            const dateTimeArray = element.value.split(':');

            //convert to 24 hour time if PM
            if (!isAM) {
                dateTimeArray[0] = parseInt(dateTimeArray[0]) + 12;
            }

            //convert to 24 hour time if isAM and 12 (because 12:00am is 00:00)
            if (isAM && dateTimeArray[0] == 12) {
                dateTimeArray[0] = 0;
            }

            var dateTimeArrayHour = 0;
            var dateTimeArrayMinute = 0;

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
                    //await interaction.reply(`Your input seems to be invalid. Please try again.`);
                    return;
            }

            console.log(dateTimeArrayHour);

            if(element.type == "timeFrom"){
                timeFromArrayHour = dateTimeArrayHour;
                timeFromArrayMinute = dateTimeArrayMinute;
            }else if(element.type == "timeTo"){
                timeToArrayHour = dateTimeArrayHour;
                timeToArrayMinute = dateTimeArrayMinute;
            }
        });

        var actualDayOffsetShitFrom = (parseInt(timeFromArrayHour) + parseInt(timezone)) + 1;
        var actualDayOffsetShitTo = (parseInt(timeToArrayHour) + parseInt(timezone)) + 1;

        const dFrom = new Date(fullDate.year, fullDate.month, fullDate.day, parseInt(actualDayOffsetShitFrom), parseInt(timeFromArrayMinute));
        const dTo = new Date(fullDate.year, fullDate.month, fullDate.day, parseInt(actualDayOffsetShitTo), parseInt(timeToArrayMinute));

        const dUTCfrom = dFrom.getTime() / 1000;
        const dUTCto = dTo.getTime() / 1000;

        await interaction.reply({ content: `The given timeframe is from <t:${dUTCfrom}:t> to <t:${dUTCto}:t>. To share this, copy and use \`<t:${dUTCfrom}:t> - <t:${dUTCto}:t>\` in your message.`, ephemeral: true });
    },
};