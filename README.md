# Muse Blink React Implementation

## Overview

This React application interfaces with the Muse EEG Headset to detect blinks in real-time, inspired by Uri Shaked's exploration with the Muse device. Using the [`muse-js` library](https://github.com/urish/muse-js), it demonstrates how to connect to the Muse EEG Headset, stream EEG data, and recognize user blinks. This project is a practical exploration of EEG data manipulation and real-time interaction in web development.

### Features

- Bluetooth connection to the Muse EEG Headset.
- Real-time EEG data streaming.
- Detection of left, right, and simultaneous eye blinks.
- Customizable blink detection sensitivity through threshold and debounce adjustments.

### Quick Start

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the application using `npm start`.
4. Experiment with threshold and debounce values in `BlinkDetectionService` for better blink detection accuracy.

### Key Code Snippets

**Connecting to the Muse EEG Headset:**
```javascript
// museService.js snippet
await museService.connect();
if (museService.isConnected) { ... }
```

### Blink Detection Setup

```javascript
// BlinkDetection.js snippet
this.leftEyeChannel = channelNames.indexOf('AF7');
this.rightEyeChannel = channelNames.indexOf('AF8');
```

### Experimenting with Detection Sensitivity
```javascript
// Adjusting threshold and debounceTime for improved accuracy
this.threshold = 500; // Sensitivity adjustment
debounceTime(400); // Debounce adjustment
```

## Experimentation and Adjustments

Users are encouraged to adjust the threshold and debounce time within `BlinkDetectionService.js` to fine-tune blink detection accuracy. These parameters may need to be tailored based on individual differences and the specific use case.

## Issues and Development

The current implementation is set up to differentiate between right and left eye blinks; however, the accuracy in doing so is not perfect. As of now, you can work with it as a single input—if a blink is registered, whether it's from the left or right eye, or however you see fit. If you find a solution to accurately isolate left and right eye blinks, I would love to see your implementation.

## Credits

This project is a React adaptation of Uri Shaked's [muse-blink project](https://github.com/urish/muse-blink), inspired by his article on [Reactive Brain Waves](https://urish.medium.com/reactive-brain-waves-af07864bb7d4). Special thanks to Uri Shaked for the inspiration and to the developers of [muse-js](https://github.com/urish/muse-js) for their invaluable tool for Muse EEG data interaction.

## Visualization Branch

The repository includes a branch where jumps are visualized with a "Flappy Bird" character animation, triggered by user blinks. This playful addition demonstrates the potential for interactive applications using EEG data.

## Note

This project is intended for educational purposes and exploration of EEG data in web applications. It provides a foundation for further development and research into brain-computer interfaces.

