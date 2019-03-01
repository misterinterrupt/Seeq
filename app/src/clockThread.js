import { TimingConstants } from './constants';
import fs from 'fs';

const floatSafeRemainder = (val, step) => {
  var valDecCount = (val.toString().split('.')[1] || '').length;
  var stepDecCount = (step.toString().split('.')[1] || '').length;
  var decCount = valDecCount > stepDecCount? valDecCount : stepDecCount;
  var valInt = parseInt(val.toFixed(decCount).replace('.',''));
  var stepInt = parseInt(step.toFixed(decCount).replace('.',''));
  return (valInt % stepInt) / Math.pow(10, decCount);
}

let bigIntToDecimal = (bi) => bi;

let systemClockInterval = 60 / (TimingConstants.maxbpm * TimingConstants.ppqn) * 1000000000000;
let systemClockStartTime = process.hrtime.bigint();
let systemClockTestTime = BigInt(10000000000000) + systemClockStartTime;
console.log('System Clock started at:', bigIntToDecimal(systemClockStartTime));
console.log('System Clock Test Time', bigIntToDecimal(systemClockTestTime));
console.log('systemClockInterval', BigInt(systemClockInterval));
console.log('currentTime', bigIntToDecimal(process.hrtime.bigint()));
console.log('time passed since systemClockStartTime', bigIntToDecimal(process.hrtime.bigint() - systemClockStartTime));

let times = [];
let collecting = true;
let lastTime = systemClockStartTime;


while(collecting) {

  let currentHRTime = process.hrtime.bigint();
  let timeElapsed = currentHRTime - lastTime;

  if(timeElapsed > systemClockTestTime) {
    collecting = false;
    console.log('done');
    console.log('# times', times);
    systemClockTestTime = currentHRTime + BigInt(1000000000000);
    console.log(systemClockTestTime);
  }
  // console.log('currentTime', bigIntToDecimal(process.hrtime.bigint()));
  lastTime = currentHRTime;
  // read from it
  let readable = fs.createReadStream(null, {fd: 3});
  // write to it
  let writable = fs.createWriteStream(null, {fd: 3});

  writeable.write({
  'currentTime': currentHRTime,
  'timeElapsed': timeElapsed
  })

}
