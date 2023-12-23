// reference: https://github.com/mourner/flatqueue
import {
  isRoot,
  parentIndex,
  leftChildIndex,
  rightChildIndex,
  swap,
} from "./heap";
let count = 0;
export class FlatQueue {
  ids: number[];
  priorities: number[];

  constructor() {
    this.ids = [];
    this.priorities = [];
  }

  push(id: number, priority: number) {
    this.ids.push(id);
    this.priorities.push(priority);
    const newItemIndex = this.ids.length - 1;
    this.processUp(newItemIndex);
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

    this.priorities[0] = lastPriority;
    this.ids[0] = lastId;
    this.processDown(0);

    return ret;
  }

  // make sure corresponding start item exists before calling!!
  private processUp(startIndex: number) {
    let currentIndex = startIndex;
    while (true) {
      if (isRoot(currentIndex)) {
        return;
      }
      const parentIdx = parentIndex(currentIndex);
      const parent = this.priorities[parentIdx];
      const current = this.priorities[currentIndex];
      if (this.aShouldBeTopperThanB(parent, current)) {
        return;
      } else {
        this.priorities[parentIdx] = current;
        this.priorities[currentIndex] = parent;
        swap(this.ids, currentIndex, parentIdx);
        currentIndex = parentIdx;
      }
    }
  }

  // make sure corresponding start item exists before calling!!
  private processDown(startIndex: number) {
    let toBeProcessed = [startIndex];
    while (toBeProcessed.length !== 0) {
      let currentIndex = toBeProcessed.pop()!;

      const leftIndex = leftChildIndex(currentIndex);
      const leftChild = this.priorities[leftIndex];
      if (leftChild == null) {
        continue;
      }
      let currentItem = this.priorities[currentIndex];
      if (this.aShouldBeTopperThanB(leftChild, currentItem)) {
        this.priorities[leftIndex] = currentItem;
        this.priorities[currentIndex] = leftChild;
        swap(this.ids, leftIndex, currentIndex);
        toBeProcessed.push(leftIndex);
      }
      const rightIndex = rightChildIndex(currentIndex);
      const rightChild = this.priorities[rightIndex];
      if (rightChild == null) {
        continue;
      }
      currentItem = this.priorities[currentIndex];
      if (this.aShouldBeTopperThanB(rightChild, currentItem)) {
        this.priorities[rightIndex] = currentItem;
        this.priorities[currentIndex] = rightChild;
        swap(this.ids, rightIndex, currentIndex);
        toBeProcessed.push(rightIndex);
      }
    }
    ++count && count % 1000 === 0 && console.log("finish", count++);
  }

  aShouldBeTopperThanB(a: number, b: number) {
    return a < b;
  }
}

export class FlatQueue2 {
  constructor() {
    this.ids = [];
    this.values = [];
    this.length = 0;
  }

  clear() {
    this.length = 0;
  }

  push(id, value) {
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