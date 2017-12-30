const Alexa = require('alexa-sdk');

const handlers = {
    'LaunchRequest': function () {
    	this.emit('HelloWorldIntent');
	},

	'HelloWorldIntent': function () {
    	this.emit(':tell', 'Hello Smurfberry Catsapulus!');
	}
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
