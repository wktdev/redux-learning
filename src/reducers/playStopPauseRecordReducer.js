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
        console.log(song.currentTime());
        song.stop()
        console.log("test");

        //_____________________________________BEGIN stop all cued recordings
        state.recordedTracks.map((val, index) => {
            val.soundClip.stop()
        });
        //_____________________________________END stop all cued recordings

        if(state.isRecording){
         mic.stop();
            recorder.stop();
            let soundClipTimeStamp = state.recordStartTime - state.timeStamp.startTime;
            return Object.assign({}, state, {
                isPlaying: false,
                isStopped: true,
                isPaused: false,
                isRecording: false,
                recordedTracks: [...state.recordedTracks, { time: soundClipTimeStamp, soundClip: soundClip, scheduledToPlay: false, isPreloaded: false }],
                timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined }
            })

        }else{


            return Object.assign({}, state, {
                isPlaying: false,
                isStopped: true,
                isPaused: false,
                timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: undefined }
            })
        }




    }

    //______________________________________BEGIN toggle play/stop response

    if (action.type === "PLAY") {
        if (state.isPlaying && state.isPaused) {
            song.play();
             return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: false
            })


        } else if (state.isStopped) {
            song.play(0, 1, 1)

            state.recordedTracks.map((val, index) => {

                if (val.scheduledToPlay) {
                    song.addCue(val.time, () => { // @ ps5 cue sounds to play
                        val.soundClip.play()
                    });
                }

            });


            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                timeStamp: { startTime: audioContext.currentTime }
            })


        }else if(state.isPlaying){
            // do nothing
        }
    }

    //______________________________________BEGIN pause action response
     
     if(action.type === "PAUSE"){

        if(state.isRecording){
            song.pause();

            mic.stop();
            recorder.stop();
            let soundClipTimeStamp = state.recordStartTime - state.timeStamp.startTime;
            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: true,
                isRecording: false,
                recordedTracks: [...state.recordedTracks, { time: soundClipTimeStamp, soundClip: soundClip, scheduledToPlay: false, isPreloaded: false }],
                timeStamp: { startTime: state.timeStamp.startTime}
            })



        }

        if (state.isPlaying) {
            song.pause();

             return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isRecording: false,
                isPaused: true

            })
          
        }

     }


    //______________________________________END pause action response




    //______________________________________BEGIN record action response




    if (action.type === "RECORD") {

        if (state.isPlaying && !state.isRecording) {


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
                isPaused: false,
                recordStartTime: audioContext.currentTime,
                timeStamp: { startTime: state.timeStamp.startTime, }
            })

        } 


        if (state.isPlaying && state.isRecording) {

            mic.stop();
            recorder.stop();
            let soundClipTimeStamp = state.recordStartTime - state.timeStamp.startTime;
            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: false,
                isRecording: false,
                recordedTracks: [...state.recordedTracks, { time: soundClipTimeStamp, soundClip: soundClip, scheduledToPlay: false, isPreloaded: false }],
                timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined }
            })

        }

        if(state.isStopped){

            
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
                isRecording: true,
                isPaused: false,
                recordStartTime: audioContext.currentTime,
                timeStamp: { startTime: audioContext.currentTime, }
            })

        }

    }

    //____________________________________________________________END record action response


    //____________________________________________________________BEGIN toggleTrackPlayback response


    if (action.type === "TOGGLE_TRACK_PLAYBACK") {
        console.log(state.recordedTracks);
        let tracksWithNewPlaybackState = state.recordedTracks.map((val, index) => {

            if (index === action.trackNumber) {
                val.scheduledToPlay = val.scheduledToPlay === true ? false : true


                if (val.scheduledToPlay) {

                    song.addCue(val.time, () => { // @ ps5 cue sounds to play
                        val.soundClip.play()
                    });
                }

                if (!val.scheduledToPlay) {
                    song.addCue(val.time, () => { // @ ps5 stop all cued sounds
                        val.soundClip.stop()
                    });
                }

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

    return state
}


/*________________________________THINGS TO DO

Check timing issues and instead of referencing audioContext.currentTime reference 
via the base song file. Fix "record from beginning" issue
__________________________________THINGS TO DO */