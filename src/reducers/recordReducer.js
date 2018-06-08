
import 'p5/lib/addons/p5.dom';
import "p5/lib/addons/p5.sound";
import p5 from "p5";

let p5audioContext,
    mic,
    recorder,
    soundFile;

var p5temp = function(sketch) {

    sketch.preload = function() { // @preload is required by P5.js
        p5audioContext = sketch.getAudioContext();
    }
};

let osc = new p5.Oscillator();
// osc.start()

const initialState = {
    isRecording: false
    recordTimestamp: { startRecordTime: undefined, endRecordTime: undefined }
}

export default function record(state = initialState, action) {


    if (action.type === "RECORD") {

        if (state.isRecording) {

            recorder.stop();

     

            return Object.assign({}, state, {
                isRecording: false
            });

        } else {
           
            // audioRecorder.record();
            mic = new p5.AudioIn();
            mic.start();
            recorder = new p5.SoundRecorder();
            recorder.setInput(mic);
            soundFile = new p5.SoundFile();
            //this.recordStartCurrentTime = p5audioContext.currentTime
            recorder.record(soundFile);
            return Object.assign({}, state, {
                isRecording: true
            });
        }

    }

    return state
}