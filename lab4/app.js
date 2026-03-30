const generateArray = (size, sparse = false) => {
  let arr = new Array(size);
  for (let i = 0; i < size; i++) {
    if (sparse && Math.random() < 0.1) continue;
    arr[i] = Math.floor(Math.random() * 1000);
  }
  return arr;
};

let normalArray = generateArray(110);
let sparseArray = generateArray(110, true);

console.log("Array without empty/undefined:", [...normalArray]);
SortLib.bubbleSort([...normalArray], true);
SortLib.selectionSort([...normalArray], false);
SortLib.insertionSort([...normalArray], true);
SortLib.shellSort([...normalArray], false);
SortLib.quickSort([...normalArray], true);

console.log("\nArray with empty/undefined:", [...sparseArray]);
SortLib.bubbleSort([...sparseArray], true);
SortLib.selectionSort([...sparseArray], true);
SortLib.insertionSort([...sparseArray], true);
SortLib.shellSort([...sparseArray], true);
SortLib.quickSort([...sparseArray], true);
