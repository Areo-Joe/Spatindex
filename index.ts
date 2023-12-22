import { BigHeap } from "./heap";

let heap = new BigHeap();

for (let i = 0; i < 7; i++) {
  heap.add(Math.random() * 1000);
}

heap.levelConsole();

console.log("\n");

console.log(heap.take());

console.log("\n");

heap.levelConsole();
