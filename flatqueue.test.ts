import { expect, test } from "bun:test";
import { FlatQueue, FlatQueue2 } from "./flatqueue";

const data: number[] = [];
for (let i = 0; i < 100; i++) {
  data.push(Math.floor(100 * Math.random()));
}

const sorted = data.slice().sort((a, b) => a - b);

test("maintains a priority queue", () => {
  const queue = new FlatQueue();
  for (let i = 0; i < data.length; i++) queue.push(i, data[i]);

  expect(queue.peekValue()).toBe(sorted[0]);
  expect(data[queue.peek()!]).toBe(sorted[0]);

  const result = [];
  while (queue.ids.length) result.push(data[queue.pop()!]);

  expect(result).toEqual(sorted);
});

test("handles edge cases with few elements", () => {
  const queue = new FlatQueue();

  queue.push(0, 2);
  queue.push(1, 1);
  queue.pop();
  queue.pop();
  queue.pop();
  queue.push(2, 2);
  queue.push(3, 1);
  expect(queue.pop()).toBe(3);
  expect(queue.pop()).toBe(2);
  expect(queue.pop()).toBe(undefined!);
  expect(queue.peek()).toBe(undefined!);
  expect(queue.peekValue()).toBe(undefined!);
});
