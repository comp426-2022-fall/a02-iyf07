#!/usr/bin/env node

import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2))

var timezone = moment.tz.guess()
var day = 1
var jsononly = false

if (args.h){
    console.log(`Usage: cli.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`)
}
if (args.n){
    var lat = args.n
    
}
if (args.s){
    var lat = args.s * -1
}
if (args.e){
    var lon = args.e
}
if (args.w){
    var lon = args.w * -1
}
if (args.z){
    var timezone = args.z
}
if (args.d){
    var day = args.d
}
if (args.j){
    var jsononly = true
}


const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone='+timezone+'&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant');
const data = await response.json()
if(jsononly){
    console.log(data)
    process.exit(0)
}

const days = args.d 

if (days == 0) {
    var text = "today."
  } else if (days > 1) {
    var text = "in " + days + " days."
  } else {
    var text = "tomorrow."
  }

var prec = data.daily.precipitation_hours[day]

if(prec!=0){
    console.log("You might need your galoshes "+text)
} else {
    console.log("You will not need your galoshes "+text)
}

