import { Subject } from 'rxjs';
import { filter, map, debounceTime } from 'rxjs/operators';
import { channelNames } from 'muse-js';

export class BlinkDetectionService {
  constructor(eegObservable, handleBlink) {
    this.eegObservable = eegObservable;
    this.handleBlink = handleBlink; // Callback function to handle detected blinks
    // Use the channelNames to find the index of AF7 and AF8
    this.leftEyeChannel = channelNames.indexOf('AF7');
    this.rightEyeChannel = channelNames.indexOf('AF8');
    this.threshold = 400; // Threshold for blink detection
    this.blinkSubject = new Subject();
  }

  detectBlinks() {
    this.eegObservable.pipe(
      filter(reading => reading.electrode === this.leftEyeChannel || reading.electrode === this.rightEyeChannel),
      map(reading => ({
        side: reading.electrode === this.leftEyeChannel ? 'left' : 'right',
        maxAmplitude: Math.max(...reading.samples.map(Math.abs))
      })),
      filter(({ maxAmplitude }) => maxAmplitude > this.threshold),
      debounceTime(200) // Prevent multiple blink signals in quick succession
    ).subscribe(({ side }) => {
      this.handleBlink(side);
    });
  }

  startBlinkDetection() {
    this.detectBlinks();
    console.log('Blink detection started');
  }
}
