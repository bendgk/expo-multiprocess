import { self } from "expo-multiprocess"

let count = 0;

self.onmessage = message => {
  count++;
  const id = self.postMessage(`Message #${count} from worker thread!`);
}