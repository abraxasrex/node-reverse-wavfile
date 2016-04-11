var fs = require('fs');
var path = require('path');

exports.reverseWav = function (fileName) {

  function reOrderOctets(wav_buffer) {
    var octets = [];
    var newWav;
    dataOctets = ( (wav_buffer.length - 44) / 8 );
    var totalBufferLength = 0;
  // push reversed data octets to new array
    for (var i = 44; i < dataOctets; i++) {
      octets.push(wav_buffer.slice( (i * 8), (i * 8) + 8));
    }
  // calculate length for concatenation
    for (var j = 0; j < octets.length; j++ ) {
      totalBufferLength += octets[j].length;
    }
    // place the original .wav's header on our new one
    octets.reverse().unshift(wav_buffer.slice(0, 44));
    return new Buffer.concat(octets, totalBufferLength);
  }
  // read local .wav file //
  fs.readFile(path.resolve(process.cwd(), fileName), function (err, data){
    if (err) {
      return console.log(err);
    } else {
      //make a buffer copy of original .wav
      var newFile = new Buffer(data);
      ///write renamed and reversed audio file to cwd
      setTimeout(fs.writeFile((fileName.slice(0, fileName.length - 4) + '_reversed.wav'), reOrderOctets(newFile)), 2500);
    }
  });
};
