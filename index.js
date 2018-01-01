'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "";

const languageStrings = {
    'en-US': {
        translation: {
            MODELS: [
                {"name":"golf", "speed": 200, "regx": new RegExp("g.*?l.*?f")},
                {"name":"touareg", "speed": 180, "regx": new RegExp("t.*?r.*?g")},
                {"name": "veyron", "speed": 500, "regx": new RegExp("v.*?r.*?n")}
            ],
            LAUNCH_MESSAGE: 'Welcome to ROSHANs CAR INFO'
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = this.t('LAUNCH_MESSAGE');
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'GetCarFactIntent': function () {
        // Use this.t() to get corresponding language data
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);
        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
            this.context.succeed({
                "response": {
                    "directives": [
                        {
                            "type": "Dialog.Delegate"
                        }
                    ],
                    "shouldEndSession": false
                },
                "sessionAttributes": {}
            });
        } else {
            var carModel = "golf";
            if(this.event.request.intent.slots.CarModel != null ) {
                if(this.event.request.intent.slots.CarModel.value != undefined ) {
                    carModel = this.event.request.intent.slots.CarModel.value.toLowerCase();
                }
            }

            var carModels = this.t('MODELS');
            var activeCar = null;

            console.log("the len " + carModels.length);

            for (var index = 0; index < carModels.length; index++) {
              console.log(carModels[index].regx.test(carModel));
              if(carModels[index].regx.test(carModel)){
                  console.log('found match.');
                  activeCar = carModels[index];
              }
            }

            var speechOutput = "the car was not found";

            if(activeCar != null){
              speechOutput = "the " + carModel + ' speed is ' + activeCar.speed;
            }
           // Create speech output
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        }
    },
    'SessionEndedRequest': function () {
       console.log('session ended!');
   },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
