import { NumberBigHeap, NumberSmallHeap } from "./heap";

let heap = new NumberBigHeap();
let small = new NumberSmallHeap();

for (let i = 0; i < 7; i++) {
  let num = Math.random() * 1000;
  heap.add(num);
  small.add(num);
}

heap.levelConsole();

console.log("\n");

small.levelConsole();

console.log("\n");

console.log(heap.take());

console.log("\n");

console.log(small.take());

console.log("\n");

heap.levelConsole();

console.log("\n");

small.levelConsole();
