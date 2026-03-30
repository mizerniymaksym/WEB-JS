const SortLib = {
  _preprocessArray: function (arr) {
    let definedArr = [];
    let undefinedCount = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) {
        undefinedCount++;
      } else {
        definedArr.push(arr[i]);
      }
    }

    if (undefinedCount > 0) {
      console.warn(
        `Found ${undefinedCount} undefined-el. They are moved to the end of the array.`
      );
    }

    return { definedArr, undefinedCount };
  },

  bubbleSort: function (arr, ascending = true) {
    let { definedArr, undefinedCount } = this._preprocessArray(arr);
    let comparisons = 0;
    let swaps = 0;
    let n = definedArr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        let condition = ascending
          ? definedArr[j] > definedArr[j + 1]
          : definedArr[j] < definedArr[j + 1];
        if (condition) {
          let temp = definedArr[j];
          definedArr[j] = definedArr[j + 1];
          definedArr[j + 1] = temp;
          swaps++;
        }
      }
    }
    console.log(`Bubble: Порівнянь - ${comparisons}, Обмінів - ${swaps}`);
    return [...definedArr, ...Array(undefinedCount).fill(undefined)];
  },

  selectionSort: function (arr, ascending = true) {
    let { definedArr, undefinedCount } = this._preprocessArray(arr);
    let comparisons = 0,
      swaps = 0;
    let n = definedArr.length;

    for (let i = 0; i < n - 1; i++) {
      let targetIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        let condition = ascending
          ? definedArr[j] < definedArr[targetIdx]
          : definedArr[j] > definedArr[targetIdx];
        if (condition) {
          targetIdx = j;
        }
      }
      if (targetIdx !== i) {
        let temp = definedArr[i];
        definedArr[i] = definedArr[targetIdx];
        definedArr[targetIdx] = temp;
        swaps++;
      }
    }
    console.log(`Selection: Порівнянь - ${comparisons}, Обмінів - ${swaps}`);
    return [...definedArr, ...Array(undefinedCount).fill(undefined)];
  },

  insertionSort: function (arr, ascending = true) {
    let { definedArr, undefinedCount } = this._preprocessArray(arr);
    let comparisons = 0,
      swaps = 0;
    let n = definedArr.length;

    for (let i = 1; i < n; i++) {
      let key = definedArr[i];
      let j = i - 1;
      comparisons++;
      while (
        j >= 0 &&
        (ascending ? definedArr[j] > key : definedArr[j] < key)
      ) {
        definedArr[j + 1] = definedArr[j];
        j = j - 1;
        swaps++;
        if (j >= 0) comparisons++;
      }
      definedArr[j + 1] = key;
    }
    console.log(`Insertion: Порівнянь - ${comparisons}, Переміщень - ${swaps}`);
    return [...definedArr, ...Array(undefinedCount).fill(undefined)];
  },

  shellSort: function (arr, ascending = true) {
    let { definedArr, undefinedCount } = this._preprocessArray(arr);
    let comparisons = 0,
      swaps = 0;
    let n = definedArr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = definedArr[i];
        let j;
        comparisons++;
        for (
          j = i;
          j >= gap &&
          (ascending ? definedArr[j - gap] > temp : definedArr[j - gap] < temp);
          j -= gap
        ) {
          definedArr[j] = definedArr[j - gap];
          swaps++;
          if (j - gap >= gap) comparisons++;
        }
        definedArr[j] = temp;
      }
    }
    console.log(`Shell: Порівнянь - ${comparisons}, Переміщень - ${swaps}`);
    return [...definedArr, ...Array(undefinedCount).fill(undefined)];
  },

  quickSort: function (arr, ascending = true) {
    let { definedArr, undefinedCount } = this._preprocessArray(arr);
    let stats = { comparisons: 0, swaps: 0 };

    const sort = (items, left, right) => {
      let index;
      if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) sort(items, left, index - 1);
        if (index < right) sort(items, index, right);
      }
      return items;
    };

    const partition = (items, left, right) => {
      let pivot = items[Math.floor((right + left) / 2)];
      let i = left,
        j = right;
      while (i <= j) {
        while (ascending ? items[i] < pivot : items[i] > pivot) {
          stats.comparisons++;
          i++;
        }
        stats.comparisons++;

        while (ascending ? items[j] > pivot : items[j] < pivot) {
          stats.comparisons++;
          j--;
        }
        stats.comparisons++;

        if (i <= j) {
          let temp = items[i];
          items[i] = items[j];
          items[j] = temp;
          stats.swaps++;
          i++;
          j--;
        }
      }
      return i;
    };

    let result = sort(definedArr, 0, definedArr.length - 1);
    console.log(
      `Quick: Порівнянь ~ ${stats.comparisons}, Обмінів - ${stats.swaps}`
    );
    return [...result, ...Array(undefinedCount).fill(undefined)];
  },
};
