import * as React from 'react';

import { ExpoReactNativeThreadsViewProps } from './ExpoReactNativeThreads.types';

export default function ExpoReactNativeThreadsView(props: ExpoReactNativeThreadsViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
