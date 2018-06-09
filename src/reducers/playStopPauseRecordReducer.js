import { song } from '../audio'
import { audioContext } from '../audio'
import 'p5/lib/addons/p5.dom';
import "p5/lib/addons/p5.sound";
import p5 from "p5";

let mic,
    recorder,
    soundClip,
    recordingStartCurrentTime;


const initialState = {
    isPlaying: false,
    isStopped: true,
    isPaused: false,
    isRecording: false,
    recordedTracks:[{time:"test-123"},{time:"test-123"},{time:"test-123"}],
    timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: undefined }
}

export default function playToggle(state = initialState, action) {

    if (action.type === "STOP") {
        song.stop()
        return Object.assign({}, state, {
            isPlaying: false,
            isStopped: true,
            isPaused: false,
            timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: undefined }
        })

    }

    //______________________________________BEGIN toggle play/stop response

    if (action.type === "PLAY") {
        if (state.isPlaying) {
            // do nothing if already playing

        } else if (state.isStopped) {
            song.play()
            let pauseTime = state.timeStamp.pauseTime;
            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                timeStamp: { startTime: audioContext.currentTime, stopTime: undefined, pauseTime: pauseTime }
            })

        } else if (state.isPaused) {
            let pauseTime = state.timeStamp.pauseTime;
            song.play(0, 1, 1, state.timeStamp.pauseTime)
            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                timeStamp: { startTime: audioContext.currentTime, stopTime: undefined, pauseTime: pauseTime }
            })
        } else {
            song.stop()
            return Object.assign({}, state, {
                isPlaying: false,
                isStopped: true,
                timeStamp: { startTime: undefined, stopTime: audioContext.currentTime }
            })
        }
    }

    //______________________________________END toggle play/stop response



    //______________________________________BEGIN pause action response

    if (action.type === "PAUSE") {

        let songPauseTimestamp = state.timeStamp.pauseTime + (audioContext.currentTime - state.timeStamp.startTime);

        if (!state.timeStamp.startTime) {
            return Object.assign({}, state)
        } else if (state.timeStamp.pauseTime) {

            //____BEGIN get point in song where it is paused
            songPauseTimestamp = state.timeStamp.pauseTime + (audioContext.currentTime - state.timeStamp.startTime);
            //____END get point in song where it is paused

            song.stop()

            return Object.assign({}, state, {
                isPlaying: false,
                isStopped: false,
                isPaused: true,
                timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: songPauseTimestamp }
            })

        } else

            //____BEGIN get point in song where it is paused
            songPauseTimestamp = audioContext.currentTime - state.timeStamp.startTime;
        //____END get point in song where it is paused

        song.stop()

        return Object.assign({}, state, {
            isPlaying: false,
            isStopped: false,
            isPaused: true,
            timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: songPauseTimestamp }
        })


    }

    //______________________________________END pause action response


    if (action.type === "RECORD") {


        if (state.isStopped) {
            song.play()


            // audioRecorder.record();
            mic = new p5.AudioIn();
            mic.start();
            recorder = new p5.SoundRecorder();
            recorder.setInput(mic);
            soundClip = new p5.SoundFile();
            recordingStartCurrentTime = audioContext.currentTime
            recorder.record(soundClip);

             return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isRecording:true,
                recordStartTime:audioContext.currentTime,
                timeStamp: { startTime:  audioContext.currentTime, stopTime: undefined }
            })

        }else{
            mic.stop();
            song.stop()
           
           

            return Object.assign({}, state, {
                isPlaying: false,
                isStopped: true,
                isPaused: false,
                isRecording:false,
                recordedTracks:[...state.recordedTracks,{time:0, soundClip:soundClip}],
                timeStamp: { startTime: undefined, stopTime: undefined }
            })
        }

    }

    return state
}