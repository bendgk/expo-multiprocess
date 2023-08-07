import { StyleSheet, Text, View } from 'react-native';

import * as ExpoReactNativeThreads from 'expo-react-native-threads';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoReactNativeThreads.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
