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

        if (state.isRecording) {
            
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

        } else {


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


        } else if (state.isPlaying) {
            // do nothing
        }
    }

    //______________________________________BEGIN pause action response

    if (action.type === "PAUSE") {

        if (state.isRecording) {
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
                timeStamp: { startTime: state.timeStamp.startTime }
            })



        }

        if (state.isPlaying) {
           
           /*

           song.clearCues()
           iterate over all soundClips.
           IF  ...soundCLip is currently playing (isPlaying).
           THEN Get current point of playback for it(soundClip.CurrentTime).
           set its playback to cue at pauseTimeAtSong.
         

           IF soundClip has cue after pauseTIme then reCUe them (addCue).

           Play all paused soundClips immediatley from soundClip.currentTime

           */

           song.clearCues()

           let pauseTimeAtSong = soundClip.currentTime();

           state.recordedTracks.map((val)=>{
               if(val.soundClip.isPlaying()){
                  console.log("yes: sound IS playing" );
                  console.log(val.soundClip.currentTime());
               }
           })


            song.pause();

           

           

            //___________________________________________________________

            // if cued sound "isPlaying" then it needs to be paused.
            
            // AND THEN...we only want to clear the cues of 
            // val.scheduledToPlay < song.currentTime()
            // if they are NOT paused.

            //___________________________________________________________

            song.clearCues()


            state.recordedTracks.map((val, index) => {

                    if (val.scheduledToPlay < song.currentTime()) {

                        let result = song.addCue(val.time, () => { // @ ps5 cue sounds to play
                            val.soundClip.play()
                        });
                    }
                });
            



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
            isRecording: true,
            isPaused: false,
            recordStartTime: recordingStartCurrentTime + 0.0001, // won't start a zero! Small hack!
            timeStamp: { startTime: audioContext.currentTime }
        })

    }


    if (state.isPaused) {

      
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
            recordStartTime: recordingStartCurrentTime + 0.0001, // won't start a zero! Small hack!
            timeStamp: { startTime: audioContext.currentTime }
        })

    }

}

//____________________________________________________________END record action response


//____________________________________________________________BEGIN toggleTrackPlayback response


if (action.type === "TOGGLE_TRACK_PLAYBACK") {

    let tracksWithNewPlaybackState = state.recordedTracks.map((val, index) => {



        if (index === action.trackNumber) {
            song.clearCues()
            val.scheduledToPlay = val.scheduledToPlay === true ? false : true


            if (val.scheduledToPlay) {

                let result = song.addCue(val.time, () => { // @ ps5 cue sounds to play
                    val.soundClip.play()
                });
            }


            if (!val.scheduledToPlay) {

                val.soundClip.stop()
            }


            return val


        } else {

            return val
        }
    });



    return Object.assign({}, state, {
        recordedTracks: tracksWithNewPlaybackState
    })

}


//____________________________________________________________END toggleTrackPlayback response

return state
}


/*________________________________THINGS TO DO

          // In PAUSE ...if scheduled sounds are less than pause marker, then unschedule them

Check timing issues and instead of referencing audioContext.currentTime reference 
via the base song file. Fix "record from beginning" issue


On pause stop loop through all scheduled songs and stop them / stop the cueing
__________________________________THINGS TO DO */