import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  recognition: any;
  isListening = false;
  listening$ = new Subject<boolean>();

  constructor(private zone: NgZone) {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.abort();
      this.isListening = false;
      this.listening$.next(false);
    } else {
      this.listening$.next(false);
    }
  }

  listen(callback: (text: string) => void) {
    if (!this.recognition) {
      this.isListening = false;
      this.listening$.next(false);
      return;
    }
    this.stopListening();
    this.isListening = true;
    this.listening$.next(true);
    this.recognition.start();

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.zone.run(() => {
        callback(transcript);
        this.isListening = false;
        this.listening$.next(false);
      });
    };

    this.recognition.onerror = () => {
      this.zone.run(() => {
        callback('');
        this.isListening = false;
        this.listening$.next(false);
      });
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.listening$.next(false);
    };
  }

  speak(text: string) {
    if (typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      synth.cancel();
      synth.speak(utter);
    }
  }
}
