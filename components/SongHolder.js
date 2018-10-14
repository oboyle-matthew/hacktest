import React from 'react';
import C3 from '../sounds/c3.mp3'
import D3 from '../sounds/d3.mp3'
import E3 from '../sounds/e3.mp3'
import F3 from '../sounds/f3.mp3'
import G3 from '../sounds/g3.mp3'
import C_LOW from '../sounds/lowcmajor.mp3';
import F_MAJ from '../sounds/fmajor.mp3';
import G_MAJ from '../sounds/gmajor.mp3';
import A_MIN from '../sounds/aminor.mp3';
import C_HIGH from '../sounds/highcmajor.mp3';
import { getsoundNum} from "../CameraScreen";

var currSounds =[G3, F3, E3, D3, C3];

var sounds1 =[G3, F3, E3, D3, C3];
var sounds2 = [C_HIGH, A_MIN, G_MAJ, F_MAJ, C_LOW];
var sounds = [sounds1, sounds2];

var notes = [];

var currNum = -1;

var recording = false;

async function playSound(note) {
    try {
        const soundObject = new Expo.Audio.Sound();
        await soundObject.loadAsync(sounds[getsoundNum()][note]);
        { shouldPlay: true }

        this.audioPlayer6  = soundObject;

        this.audioPlayer6.playAsync();

        this.audioPlayer6.setPositionAsync(0);
    } catch(err) {
        console.log(err);
    }
    currNum += 1;
}

function test(num) {
    console.log(num)
}

function playNotes(num) {
    if (notes.length === 0) {

    }
    if (num < notes.length) {
        playSound(notes[num]);
        setTimeout(playNotes, 2000, num+1);
    }
}


const SongHolder = {
    writeNote: function(note){
        if (recording) {
            notes.push(note);
            console.log(notes);
        }
    },
    getRecord() {
        return recording;
    },
    toggleRecord() {
        recording = !recording;
    },
    test: function(num){
        console.log(num);
        return notes;
    },
    playNotes: function() {
        playNotes(0);
    }
}

export default SongHolder;