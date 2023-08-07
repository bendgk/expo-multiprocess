import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoReactNativeThreads.web.ts
// and on native platforms to ExpoReactNativeThreads.ts
import ExpoReactNativeThreadsModule from './ExpoReactNativeThreadsModule';
import ExpoReactNativeThreadsView from './ExpoReactNativeThreadsView';
import { ChangeEventPayload, ExpoReactNativeThreadsViewProps } from './ExpoReactNativeThreads.types';

// Get the native constant value.
export const PI = ExpoReactNativeThreadsModule.PI;

export function hello(): string {
  return ExpoReactNativeThreadsModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoReactNativeThreadsModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoReactNativeThreadsModule ?? NativeModulesProxy.ExpoReactNativeThreads);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoReactNativeThreadsView, ExpoReactNativeThreadsViewProps, ChangeEventPayload };
