import { FlatQueue, FlatQueue2 } from "./flatqueue";

const N = 1000000;
const K = 1000;

const data = [];
for (let i = 0; i < N; i++) data[i] = { value: Math.random() };

let flatQueueDIY = new FlatQueue();

const priorites = [35, 38, 46, 33, 30, 65, 95, 41, 62, 0];

priorites.forEach((pri, id) => flatQueueDIY.push(id, pri));

while (flatQueueDIY.priorities.length !== 0) {
  console.log(flatQueueDIY.priorities[0]);
  flatQueueDIY.pop();
}

console.time(`flatqueue push ${N}`);
for (let i = 0; i < N; i++) flatQueueDIY.push(i, data[i].value);
console.timeEnd(`flatqueue push ${N}`);

console.time(`flatqueue pop ${N}`);
for (let i = 0; i < N; i++) flatQueueDIY.pop();
console.timeEnd(`flatqueue pop ${N}`);

console.time(`flatqueue push/pop ${N}`);
for (let i = 0; i < N; i += K) {
  for (let j = 0; j < K; j++) flatQueueDIY.push(i, data[i + j].value);
  for (let j = 0; j < K; j++) flatQueueDIY.pop();
}
console.timeEnd(`flatqueue push/pop ${N}`);

let flatQueue = new FlatQueue2();

console.time(`flatqueue push ${N}`);
for (let i = 0; i < N; i++) flatQueue.push(i, data[i].value);
console.timeEnd(`flatqueue push ${N}`);

console.time(`flatqueue pop ${N}`);
for (let i = 0; i < N; i++) flatQueue.pop();
console.timeEnd(`flatqueue pop ${N}`);

console.time(`flatqueue push/pop ${N}`);
for (let i = 0; i < N; i += K) {
  for (let j = 0; j < K; j++) flatQueue.push(i, data[i + j].value);
  for (let j = 0; j < K; j++) flatQueue.pop();
}
console.timeEnd(`flatqueue push/pop ${N}`);
