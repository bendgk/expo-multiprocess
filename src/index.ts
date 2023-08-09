import { NativeModulesProxy, EventEmitter } from 'expo-modules-core';
import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

import ExpoReactNativeThreadsModule from './ExpoReactNativeThreadsModule';

type MessageEvent = {
  id: number,
  message: string
}

export class Thread {
  private id: number
  private _cb: null | ((message: string) => void) = null

  constructor(js: string) {
    this.id = ExpoReactNativeThreadsModule.startThread(js)
    if (this.id === -1) return
    
    DeviceEventEmitter.addListener(`onNative${this.id}`, (message) => {
      !!message && this._cb && this._cb(message)
    })
  }

  postMessage(message) {
    ExpoReactNativeThreadsModule.postThreadMessage(this.id, message)
  }

  terminate() {
    ExpoReactNativeThreadsModule.stopThread(this.id)
  }

  onmessage(cb: (message: string) => void) {
    this._cb = cb
  }
}

export default Thread;
export { self } from "./self"