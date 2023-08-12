import { EventEmitter } from 'expo-modules-core';
import ExpoReactNativeThreadsModule from './ExpoReactNativeThreadsModule';
import { NativeModules } from 'react-native';


const { ThreadSelfManager } = NativeModules;
const emitter = new EventEmitter(ExpoReactNativeThreadsModule);

type MessageEvent = {
    id: number,
    message: Uint8Array
}

interface Worker {
    onmessage: null | ((message: MessageEvent) => void)
    postMessage: (message: any[]) => void
}

export const self: Worker = {
    onmessage: null,
    postMessage: (message: any[]) => {
        if (!message) { return }
        ThreadSelfManager.postMessage(message);
    }
}

emitter.addListener<MessageEvent>('onJs', (message) => {
    !!message && self.onmessage && self.onmessage(message)
})

export default self