// reference: https://github.com/mourner/flatqueue
import { isRoot } from "./heap";
export class FlatQueue {
  ids: number[];
  priorities: number[];

  constructor() {
    this.ids = [];
    this.priorities = [];
  }

  push(id: number, priority: number) {
    let index = this.ids.length;
    while (true) {
      if (isRoot(index)) {
        break;
      }
      const parentId = (index - 1) >> 1;
      const parentPri = this.priorities[parentId];
      if (parentPri < priority) {
        break;
      } else {
        this.ids[index] = this.ids[parentId];
        this.priorities[index] = this.priorities[parentId];

        index = parentId;
      }
    }
    this.ids[index] = id;
    this.priorities[index] = priority;
  }

  peekValue(): number | undefined {
    return this.priorities[0];
  }

  peek(): number | undefined {
    return this.ids[0];
  }

  pop() {
    if (this.ids.length === 0) {
      return;
    }
    if (this.ids.length === 1) {
      this.priorities.pop();
      return this.ids.pop();
    }
    const lastPriority = this.priorities.pop()!;
    const lastId = this.ids.pop()!;

    const ret = this.ids[0];
    let currentIndex = 0;

    while (true) {
      const leftIndex = (currentIndex << 2) + 1;
      const leftChild = this.priorities[leftIndex];
      if (leftChild == null) {
        break;
      }
      const rightIndex = (currentIndex << 2) + 2;
      const rightChild = this.priorities[rightIndex];

      if (rightChild == null) {
        if (leftChild < lastPriority) {
          this.priorities[currentIndex] = this.priorities[leftIndex];
          this.ids[currentIndex] = this.ids[leftIndex];
          currentIndex = leftIndex;
        }
        break;
      } else {
        if (lastPriority < leftChild) {
          if (lastPriority < rightChild) {
            break;
          } else {
            this.priorities[currentIndex] = this.priorities[rightIndex];
            this.ids[currentIndex] = this.ids[rightIndex];
            currentIndex = rightIndex;
          }
        } else {
          if (leftChild < rightChild) {
            this.priorities[currentIndex] = this.priorities[leftIndex];
            this.ids[currentIndex] = this.ids[leftIndex];
            currentIndex = leftIndex;
          } else {
            this.priorities[currentIndex] = this.priorities[rightIndex];
            this.ids[currentIndex] = this.ids[rightIndex];
            currentIndex = rightIndex;
          }
        }
      }
    }

    this.priorities[currentIndex] = lastPriority;
    this.ids[currentIndex] = lastId;

    return ret;
  }
}

export class FlatQueue2 {
  ids: number[];
  values: number[];
  length: number;

  constructor() {
    this.ids = [];
    this.values = [];
    this.length = 0;
  }

  clear() {
    this.length = 0;
  }

  push(id: number, value: number) {
    let pos = this.length++;

    while (pos > 0) {
      const parent = (pos - 1) >> 1;
      const parentValue = this.values[parent];
      if (value >= parentValue) break;
      this.ids[pos] = this.ids[parent];
      this.values[pos] = parentValue;
      pos = parent;
    }

    this.ids[pos] = id;
    this.values[pos] = value;
  }

  pop() {
    if (this.length === 0) return undefined;

    const top = this.ids[0];
    this.length--;

    if (this.length > 0) {
      const id = (this.ids[0] = this.ids[this.length]);
      const value = (this.values[0] = this.values[this.length]);
      const halfLength = this.length >> 1;
      let pos = 0;

      while (pos < halfLength) {
        let left = (pos << 1) + 1;
        const right = left + 1;
        let bestIndex = this.ids[left];
        let bestValue = this.values[left];
        const rightValue = this.values[right];

        if (right < this.length && rightValue < bestValue) {
          left = right;
          bestIndex = this.ids[right];
          bestValue = rightValue;
        }
        if (bestValue >= value) break;

        this.ids[pos] = bestIndex;
        this.values[pos] = bestValue;
        pos = left;
      }

      this.ids[pos] = id;
      this.values[pos] = value;
    }

    return top;
  }

  peek() {
    if (this.length === 0) return undefined;
    return this.ids[0];
  }

  peekValue() {
    if (this.length === 0) return undefined;
    return this.values[0];
  }

  shrink() {
    this.ids.length = this.values.length = this.length;
  }
}
