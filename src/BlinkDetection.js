import { Subject } from 'rxjs';
import { filter, map, debounceTime, switchMap, tap } from 'rxjs/operators';
import { channelNames } from 'muse-js';

export class BlinkDetectionService {
  constructor(eegObservable, handleLeftBlink, handleRightBlink) {
    this.eegObservable = eegObservable;
    this.handleLeftBlink = handleLeftBlink; // Callback function for left eye blink
    this.handleRightBlink = handleRightBlink; // Callback function for right eye blink
    this.leftEyeChannel = channelNames.indexOf('AF7');
    this.rightEyeChannel = channelNames.indexOf('AF8');
    this.threshold = 500; // Threshold for blink detection
  }

  detectBlinks() {
    // Left eye blinks
    const leftBlinks = this.eegObservable.pipe(
      filter(reading => reading.electrode === this.leftEyeChannel),
      map(reading => Math.max(...reading.samples.map(Math.abs))),
      filter(max => max > this.threshold),
      debounceTime(400),
      tap(() => this.handleLeftBlink())
    );

    // Right eye blinks
    const rightBlinks = this.eegObservable.pipe(
      filter(reading => reading.electrode === this.rightEyeChannel),
      map(reading => Math.max(...reading.samples.map(Math.abs))),
      filter(max => max > this.threshold),
      debounceTime(400),
      tap(() => this.handleRightBlink())
    );

    // Subscribe to blink observables
    leftBlinks.subscribe();
    rightBlinks.subscribe();
  }

  startBlinkDetection() {
    this.detectBlinks();
    console.log('Blink detection started');
  }
}
