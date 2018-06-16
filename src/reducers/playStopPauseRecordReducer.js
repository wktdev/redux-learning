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
   // recordedTracks: [{ time: "test-123", scheduledToPlay: false }, { time: "test-123", scheduledToPlay: false }, { time: "test-123", scheduledToPlay: false }],
    recordedTracks: [],
    timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: undefined }
}



export default function playToggle(state = initialState, action) {

    if (action.type === "STOP") {
        song.stop()
        console.log("test");
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
            song.play(0,1,1)


            // loop through

            state.recordedTracks.map((val,index)=>{

                 if(val.scheduledToPlay){
                    val.soundClip.play(val.time,1,1)
                 }

            })

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
                isPaused: false,
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
        
        if(state.isPaused){
            console.log("IS PAUSED!");
          
            return Object.assign({}, state)
        }else if (!state.timeStamp.startTime) {
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
                timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined, pauseTime: songPauseTimestamp }
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
            timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined, pauseTime: songPauseTimestamp }
        })


    }

    //______________________________________END pause action response


    //______________________________________BEGIN record action response




    if (action.type === "RECORD") {

        if(state.isPlaying && !state.isRecording){


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
                isRecording: true,
                isPaused:false,
                recordStartTime: audioContext.currentTime,
                timeStamp: { startTime: state.timeStamp.startTime, }
            })

        }else if(state.isPlaying && state.isRecording){
               
            mic.stop();
            recorder.stop();
            let soundClipTimeStamp = state.recordStartTime -  state.timeStamp.startTime;
            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: false,
                isRecording: false,
                recordedTracks: [...state.recordedTracks, { time: soundClipTimeStamp, soundClip: soundClip, scheduledToPlay: false, isPreloaded:false }],
                timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined }
            })

        }


        //  else if (state.isPaused) {
        //     let pauseTime = state.timeStamp.pauseTime;
        //     console.log(pauseTime);
        //     song.play(0, 1, 1, state.timeStamp.pauseTime)

        //     // audioRecorder.record();
        //     mic = new p5.AudioIn();
        //     mic.start();
        //     recorder = new p5.SoundRecorder();
        //     recorder.setInput(mic);
        //     soundClip = new p5.SoundFile();
        //     recordingStartCurrentTime = audioContext.currentTime
        //     recorder.record(soundClip);

        //     return Object.assign({}, state, {
        //         isPlaying: true,
        //         isStopped: false,
        //         isRecording: true,
        //         isPaused:false,
        //         recordStartTime: audioContext.currentTime,
        //         timeStamp: { startTime: audioContext.currentTime, stopTime: undefined }
        //     })

        // } 


        // else if (state.isStopped) {
        //     song.play()


        //     // audioRecorder.record();
        //     mic = new p5.AudioIn();
        //     mic.start();
        //     recorder = new p5.SoundRecorder();
        //     recorder.setInput(mic);
        //     soundClip = new p5.SoundFile();
        //     recordingStartCurrentTime = audioContext.currentTime
        //     recorder.record(soundClip);

        //     return Object.assign({}, state, {
        //         isPlaying: true,
        //         isStopped: false,
        //         isRecording: true,
        //         recordStartTime: audioContext.currentTime,
        //         timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined }
        //     })

        // } else {
        //     mic.stop();
        //     song.stop()
            
        //     let soundClipTimeStamp = recordingStartCurrentTime -  state.timeStamp.startTime 


        //     return Object.assign({}, state, {
        //         isPlaying: false,
        //         isStopped: true,
        //         isPaused: false,
        //         isRecording: false,
        //         recordedTracks: [...state.recordedTracks, { time: soundClipTimeStamp, soundClip: soundClip, scheduledToPlay: false }],
        //         timeStamp: { startTime: undefined, stopTime: undefined }
        //     })
        // }

    }

    //____________________________________________________________END record action response


    //____________________________________________________________BEGIN toggleTrackPlayback response


    if (action.type === "TOGGLE_TRACK_PLAYBACK") {


        console.log(state.recordedTracks);

        let tracksWithNewPlaybackState = state.recordedTracks.map((val, index) => {

            if (index === action.trackNumber) {
                val.scheduledToPlay = val.scheduledToPlay === true ? false : true
                return val
            } else {
                return val
            }
        });




        console.log(tracksWithNewPlaybackState[action.trackNumber].scheduledToPlay + " .....");


        return Object.assign({}, state, {
                recordedTracks: tracksWithNewPlaybackState
         })

    }


    //____________________________________________________________END toggleTrackPlayback response


    // THINGS TO DO....WHERE I LEFT OFF
    // Fix fucked up pause issue
    // calculate start time of each recorded file.
    // loop through all audio files checked to play and sound.play() them

    // Create dummy script to change state and access change in different reducer.




    return state
}