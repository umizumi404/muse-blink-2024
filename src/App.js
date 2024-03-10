import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure CSS is properly imported
import characterImg from './character.png'; // Adjust path as necessary
import { MuseService } from './museService';
import { BlinkDetectionService } from './BlinkDetection';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [museService, setMuseService] = useState(null);

  useEffect(() => {
    const newMuseService = new MuseService();
    setMuseService(newMuseService);
  }, []);

  useEffect(() => {
    if (isConnected) {
      const eegObservable = museService.getEEGObservable();
      const blinkDetectionService = new BlinkDetectionService(
        eegObservable,
        () => jump(),
        () => jump()
      );
      blinkDetectionService.startBlinkDetection();
    }
  }, [isConnected, museService]);

  const jump = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500); // Duration matches CSS transition
  };

  const handleConnectClick = async () => {
    if (museService) {
      await museService.connect();
      setIsConnected(museService.isConnected);
    }
  };

  return (
    <div className="App-header">
      <h1>Muse EEG Data App</h1>
      <button onClick={handleConnectClick} disabled={isConnected}>
        {isConnected ? 'Connected' : 'Connect to Muse Headset'}
      </button>
      <div className="floor"></div>
      <img
        src={characterImg}
        alt="Character"
        className={`character ${isJumping ? 'is-jumping' : ''}`}
      />
    </div>
  );
}

export default App;
