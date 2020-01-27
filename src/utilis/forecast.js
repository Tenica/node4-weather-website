const request = require('request')

const forecast = (latitude,longitude, callback) => {
      
      const url = 'https://api.darksky.net/forecast/d2ae4cb5701eff8c0caf6abe5c4bf02f/' + latitude + ',' +  longitude 

    request({url, json: true}, (error, {body}) => {
      if (error) {
          callback('unable to connect to the Internet', undefined)
      } else if (body.error) {
          callback('Unable to find forcast,try another location', undefined)
      } else {
          callback(undefined, body.daily.data[0].summary + 'It is currently '+ body.currently.temperature + ' degree out. ' + 'The temperature high is ' + body.daily.data[0].temperatureHigh + ' and a low of ' + body.daily.data[0].temperatureLow + ' .There is a ' + body.currently.precipProbability + ' %  chance of rain. ' + 'The Current Temperature is '+ body.currently.temperature + ' degree.')
      }

    })
}


module.exports = forecast