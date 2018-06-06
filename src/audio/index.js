
import  {name} from './test';

export let audioContext = new AudioContext();

function audioFileLoader(fileDirectory) {
    var soundObj = {};
    var playSound = undefined;
    var getSound = new XMLHttpRequest();
    soundObj.fileDirectory = fileDirectory;
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;
          
        });
    };

    getSound.send();

    soundObj.play = function(time, setStart, setDuration) {
        playSound = audioContext.createBufferSource();
        playSound.buffer = soundObj.soundToPlay;
        playSound.connect(audioContext.destination);
        playSound.start(audioContext.currentTime + time || audioContext.currentTime, setStart || 0, setDuration || soundObj.soundToPlay.duration);
    };

    soundObj.stop = function(time) {
        playSound.stop(audioContext.currentTime + time || audioContext.currentTime);
    };

    soundObj.duration = function(){
        return soundObj.soundToPlay.duration
    }
    return soundObj;
}


function audioBatchLoader(obj) {

    for (var prop in obj) {
        obj[prop] = audioFileLoader(obj[prop]);

    }

    return obj;

}


export let song = audioFileLoader('./song.wav');







