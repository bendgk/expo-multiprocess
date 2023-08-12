import { self } from "expo-multiprocess"

let count = 0;

self.onmessage = message => {
  count++;
  console.log(message)
  console.log(`Worker thread: ${count}`);
  self.postMessage([count]);
}