var https = require('https')

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
      switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Hello Vanna, how do I help you?", false),
            {"started":"yes"}
          )
        )
        break;
        
        case "IntentRequest":

        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {
          case "GetOrderDueDate":
              var dd= event.request.intent.slots.OrderNumber.value;
              var inten= event.request.intent.name;
              var endpoint = "https://noblekolarikkal.000webhostapp.com/getorderduedate.php?dd="+ dd+"&int=" + inten;
              var body = "";
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body);
                body = data.res;
                body = body;
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`${body}`, true),
                    {}
                  )
                )
              })
            })
            
            break;
            
            case "GetCustomer":
              var dd= event.request.intent.slots.OrderNumber.value;
              var inten= event.request.intent.name;
              var endpoint = "https://noblekolarikkal.000webhostapp.com/getorderduedate.php?dd="+ dd+"&int=" + inten;
              
              var body = "";
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body);
                body = data.res;
                body = body;
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`${body}`, true),
                    {}
                  )
                )
              })
            })
            break;
            
            case "GetPartsInOrder":
              var dd= event.request.intent.slots.OrderNumber.value;
              var inten= event.request.intent.name;
              var endpoint = "https://noblekolarikkal.000webhostapp.com/getorderduedate.php?dd="+ dd+"&int=" + inten;
              
              var body = "";
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body);
                body = data.res;
                body = body;
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`${body}`, true),
                    {}
                  )
                )
              })
            })
            break;
            
            
            case "GetPendingOrders":
              //var dd= event.request.intent.slots.OrderNumber.value;
              var inten= event.request.intent.name;
              var endpoint = "https://noblekolarikkal.000webhostapp.com/getorderduedate.php?dd=1&int=" + inten;
              var body = "";
              
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body);
                body = data.res;
                body = body;
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`${body}`, true),
                    {}
                  )
                )
              })
            })
            break;
        }
        break;
      
      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }
    }else{
        switch (event.request.type){
            case "LaunchRequest":
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`In`, true),
                    {}
                  )
                )
                break;
            case "IntentRequest":
             switch(event.request.intent.name) {
          case "GetOrderDueDate":
              var dd= event.request.intent.slots.OrderNumber.value;
              var inten= event.request.intent.name;
              var endpoint = "https://noblekolarikkal.000webhostapp.com/getorderduedate.php?dd="+ dd+"&int=" + inten;
              var body = "";
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body);
                body = data.res;
                body = body;
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`${body}`, true),
                    {}
                  )
                )
              })
            })
            
            break;
             }
                break;
            case "SessionEndedRequest":
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`In`, true),
                    {}
                  )
                )
                break;
        }
    }

    

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "SSML",
      ssml: "<speak>"+outputText+"</speak>"
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}

