import { Button, StyleSheet, Text, View } from 'react-native';
import {Thread} from 'expo-multiprocess';
import { useMemo, useState } from 'react';

export default function App() {
  const [messages, setMessage] = useState<string[]>([]);

  const thread = useMemo(() => {
    const t = new Thread('./worker.thread.js')
    t.onmessage((message) => {
      console.log(`App: got message ${message}`)
      setMessage((messages) => [...messages, message])
    })
    return t
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native Threads!
      </Text>

      <Button title="Send Message To Worker Thread" onPress={() => {
        thread.postMessage('Hello')
      }} />

      <View>
        <Text>Messages:</Text>
        {messages.map((message, i) => <Text key={i}>{message}</Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
