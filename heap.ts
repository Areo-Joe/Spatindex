export class BigHeap {
  heap: number[];
  constructor() {
    this.heap = [];
  }

  add(item: number) {
    this.heap.push(item);
    const newItemIndex = this.heap.length - 1;
    this.processUp(newItemIndex);
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  take() {
    if (this.heap.length === 0) {
      return;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const lastItem = this.heap.pop()!;
    const ret = this.heap[0];
    this.heap[0] = lastItem;
    this.processDown(0);

    return ret;
  }

  // make sure corresponding start item exists before calling!!
  processUp(startIndex: number) {
    let currentIndex = startIndex;
    while (true) {
      if (isRoot(currentIndex)) {
        return;
      }
      const parentIdx = parentIndex(currentIndex);
      const parent = this.heap[parentIdx];
      const current = this.heap[currentIndex];
      if (current <= parent) {
        return;
      } else {
        this.heap[parentIdx] = current;
        this.heap[currentIndex] = parent;
        currentIndex = parentIdx;
      }
    }
  }

  // make sure corresponding start item exists before calling!!
  processDown(startIndex: number) {
    const currentIndex = startIndex;
    const leftIndex = leftChildIndex(currentIndex);
    const leftChild = this.heap[leftIndex];
    if (leftChild == null) {
      return;
    }
    let currentItem = this.heap[currentIndex];
    if (currentItem < leftChild) {
      this.heap[leftIndex] = currentItem;
      this.heap[currentIndex] = leftChild;
    }
    this.processDown(leftIndex);
    const rightIndex = rightChildIndex(currentIndex);
    const rightChild = this.heap[rightIndex];
    if (rightChild == null) {
      return;
    }
    currentItem = this.heap[currentIndex];
    if (currentItem < rightChild) {
      this.heap[rightIndex] = currentItem;
      this.heap[currentIndex] = rightChild;
    }
    this.processDown(rightIndex);
  }

  levelConsole() {
    levelConsole(this.heap);
  }
}

function leftChildIndex(index: number) {
  return index * 2 + 1;
}

function rightChildIndex(index: number) {
  return index * 2 + 2;
}

function parentIndex(index: number) {
  if (isRoot(index)) {
    return -1;
  }
  return isEven(index) ? (index - 2) / 2 : (index - 1) / 2;

  function isEven(index: number) {
    return index % 2 === 0;
  }
}

function leftChild<T>(heap: T[], index: number): T | undefined {
  return heap[leftChildIndex(index)];
}

function rightChild<T>(heap: T[], index: number): T | undefined {
  return heap[leftChildIndex(index)];
}

function parent<T>(heap: T[], index: number): T | undefined {
  return heap[parentIndex(index)];
}

function isRoot(index: number) {
  return index === 0;
}

function levelConsole(heap: number[]) {
  let layer = 0;
  let consoleBuffer: number[] = [];
  let i = 0;
  while (true) {
    const layerItemMaxCount = Math.pow(2, layer);
    let full = true;
    for (let j = 0; j < layerItemMaxCount; j++) {
      const currentItem = heap[i];
      if (currentItem != null) {
        consoleBuffer.push(currentItem);
      } else {
        full = false;
        break;
      }
      i++;
    }
    consoleBuffer.length !== 0 && console.log(consoleBuffer.join(" "));
    consoleBuffer = [];
    layer++;
    if (!full) {
      break;
    }
  }
}
