import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoReactNativeThreadsViewProps } from './ExpoReactNativeThreads.types';

const NativeView: React.ComponentType<ExpoReactNativeThreadsViewProps> =
  requireNativeViewManager('ExpoReactNativeThreads');

export default function ExpoReactNativeThreadsView(props: ExpoReactNativeThreadsViewProps) {
  return <NativeView {...props} />;
}
