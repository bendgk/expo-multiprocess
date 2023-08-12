import { DeviceEventEmitter} from 'react-native';
import ExpoReactNativeThreadsModule from './ExpoReactNativeThreadsModule';

export class Thread {
  private id: number
  private _cb: null | ((message: Uint8Array) => void) = null

  constructor(js: string) {
    this.id = ExpoReactNativeThreadsModule.startThread(js)
    if (this.id === -1) return
    
    DeviceEventEmitter.addListener(`onNative${this.id}`, (message) => {
      !!message && this._cb && this._cb(message)
    })
  }

  postMessage(message: Uint8Array) {
    ExpoReactNativeThreadsModule.postThreadMessage(this.id, message)
  }

  terminate() {
    ExpoReactNativeThreadsModule.stopThread(this.id)
  }

  onmessage(cb: (message: Uint8Array) => void) {
    this._cb = cb
  }
}

export default Thread;
export { self } from "./self"