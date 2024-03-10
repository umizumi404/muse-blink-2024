import React, { useState, useEffect } from 'react';
import { MuseService } from './museService';
import { BlinkDetectionService } from './BlinkDetection';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [blinkMessage, setBlinkMessage] = useState('');

  useEffect(() => {
    // Define a cleanup function to disconnect from the Muse headset when the component unmounts
    let museService = new MuseService();
    return () => {
      if (museService.isConnected) {
        museService.disconnect();
      }
    };
  }, []);

  const handleConnectClick = async () => {
    const museService = new MuseService();
    await museService.connect();

    if (museService.isConnected) {
      setIsConnected(true); // Update state to reflect the connection status
      const eegObservable = museService.getEEGObservable();
      const blinkDetectionService = new BlinkDetectionService(eegObservable, handleBlinks);
      blinkDetectionService.startBlinkDetection();
      console.log('Blink detection initiated.');
    } else {
      console.error('Failed to connect to Muse EEG headset.');
    }
  };

  // This function is called by the BlinkDetectionService when a blink is detected
  const handleBlinks = (side) => {
    const message = side === 'left' ? 'Left eye blinked' : 'Right eye blinked';
    setBlinkMessage(message);

    // Clear the message after some time to make it ready for the next blink
    setTimeout(() => setBlinkMessage(''), 2000);
  };

  return (
    <div>
      <h1>Muse EEG Data App</h1>
      {!isConnected ? (
        <button onClick={handleConnectClick}>Connect to Muse Headset</button>
      ) : (
        <p>Connected to Muse EEG headset. Blink detection active.</p>
      )}
      {blinkMessage && <p>{blinkMessage}</p>}
    </div>
  );
}

export default App;
