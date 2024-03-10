import { MuseClient } from 'muse-js';
import { Subject } from 'rxjs';

export class MuseService {
  constructor() {
    this.client = new MuseClient();
    this.isConnected = false;
    this.eegReadings = new Subject(); // Subject to emit EEG readings
  }

  async connect() {
    try {
      await this.client.connect();
      await this.client.start();
      this.setupSubscriptions();
      this.isConnected = true;
      console.log('Connected to Muse EEG headset');
    } catch (error) {
      console.error('Failed to connect:', error);
      this.isConnected = false;
    }
  }

  setupSubscriptions() {
    // Subscribe to EEG readings and forward them through the Subject
    this.client.eegReadings.subscribe(reading => {
      this.eegReadings.next(reading);
    });
  }

  getEEGObservable() {
    // Provide a way for other services or components to subscribe to EEG readings
    return this.eegReadings.asObservable();
  }

  // Additional methods can be added here for disconnecting, etc.
}
