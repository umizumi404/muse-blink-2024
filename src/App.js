import React, { useState, useEffect } from 'react';
import { MuseService } from './museService';
import { BlinkDetectionService } from './BlinkDetection';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [museService, setMuseService] = useState(null);

  useEffect(() => {
    // Instantiate the MuseService
    const newMuseService = new MuseService();
    setMuseService(newMuseService);
  }, []);

  const handleLeftBlink = () => {
    console.log('Left eye blinked');
  };

  const handleRightBlink = () => {
    console.log('Right eye blinked');
  };

  const handleConnectClick = async () => {
    if (museService) {
      await museService.connect();
      setIsConnected(museService.isConnected);

      if (museService.isConnected) {
        const eegObservable = museService.getEEGObservable();
        const blinkDetectionService = new BlinkDetectionService(eegObservable, handleLeftBlink, handleRightBlink);
        blinkDetectionService.startBlinkDetection();
      }
    }
  };

  return (
    <div>
      <h1>Muse EEG Data App</h1>
      <button onClick={handleConnectClick} disabled={isConnected}>
        {isConnected ? 'Connected' : 'Connect to Muse Headset'}
      </button>
    </div>
  );
}

export default App;
