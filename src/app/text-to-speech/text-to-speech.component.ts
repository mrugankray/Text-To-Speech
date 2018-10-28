import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent implements OnInit {

  synthesis = window.speechSynthesis;
  textToSpeech = 'hello';
  voiceSelect;
  voices;
  onSelectLang;
  rate: number = 0.8;
  pitch: number = 0.5;
  x = 'hello';
  background;
  background_repeat;
  background_size;
  flag: boolean = false;
  constructor() { }

  ngOnInit() {
    this.onSelectLang = 'english-us';
    const getVoices = () => {
      const voices2 = this.synthesis.getVoices();
      // this.voices.push(voices2);
      if (voices2.length !== 0) {
        // console.log(voices2.length);
        this.voices = voices2;
        // this.voices.push(voices2);
        if (this.voices.length !== 0) {
          console.log(this.voices);
          // console.log(typeof(this.voices));
        }
      }
    };
    getVoices();
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = getVoices;
    }
  }

  speak() {
    console.log('speak() works');
  }

  // speaking
  speaking() {
    if (this.synthesis.speaking) {
      console.error("it's speaking");
      return;
    }
    if ( this.textToSpeech !== '') {
      console.log('speaking() works');
      // create speakText
      const speakText = new SpeechSynthesisUtterance(this.textToSpeech);
      this.flag = true;
      document.getElementById('main_container_id').style.background = 'url("../../assets/images/wave.gif")';
      // onEnding speakText
      speakText.onend = e => {
        console.log('Done speaking');
        this.flag = false;
        console.log(this.flag);
        document.getElementById('main_container_id').style.background = '#141414';
      };
      // onError
      speakText.onerror = err => {
        console.log(`${err}`);
      };
      // Selecting the voice
      const selectedVoice = this.onSelectLang;
      // loop through voices
      this.voices.forEach(langName => {
        if (langName.name === selectedVoice) {
          speakText.voice = langName;
          console.log(langName.name);
        }
      });
      // set pitch and rate
      speakText.rate = this.rate;
      speakText.pitch = this.pitch;
      this.synthesis.speak(speakText);
    }
  }
  // Styles
  applyStyles() {
    const styles = {
      'background' : 'url("../../assets/images/wave.gif")',
      'background-repeat' : 'repeat-x',
      'background-size' : '100% 100%'
    };
    return styles;
  }
}
