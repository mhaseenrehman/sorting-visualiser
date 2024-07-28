let sortButton = document.getElementById("sorting_button");
let randomizeButton = document.getElementById("randomize_button");
let checkButton = document.getElementById("check_sorted");
let sortingAlgorithm = document.getElementById("sorting-algorithms");
let middleContainer = document.getElementById("middle");
let minNum = 1;
let maxNum = 100;
let numOfBars = 400;
let numbers = new Array();

randomizeButton.onclick = createRandomNumbers
sortButton.onclick = initialiseSort

function generateRandomNumber() {
    return Math.floor((Math.random() * maxNum) + minNum);
}

function createRandomNumbers() {
    numbers.length = 0;
    for (let i = 0; i < numOfBars; i++) {
        numbers.push(generateRandomNumber());
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function renderBars() {
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = numbers[i]+"px";
        middleContainer.appendChild(bar);
    }
}

// Quick Sort Algorithm
async function partition (array, lo, hi, delay = 40) {
    var bars = document.getElementsByClassName("bar");
    var pivot = array[Math.floor((hi-lo)/2) + lo];

    var i = lo - 1;
    var j = hi + 1;

    while (true) {
        for (let i = 0; i < numOfBars; i++) {
            bars[i].style.backgroundColor = "white";
        }
        do {
            i = i + 1;
        } while (array[i] < pivot);

        do {
            j = j - 1;
        } while (array[j] > pivot);

        if (i >= j) {
            return j;
        }

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        bars[i].style.height = array[i]+"px";
        bars[i].style.backgroundColor = "red";
        bars[j].style.height = array[j]+"px";
        bars[j].style.backgroundColor = "red";

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
    }

}

async function quickSort(array, lo, hi) {
    if (lo >= 0 && hi >=0 && lo < hi) {
        p = await partition(array, lo, hi);

        Promise.all([
            quickSort(array, lo, p),
            quickSort(array, p+1, hi)
        ]);
    }
}


// Merge Sort Algorithm
async function merge(array, left, middle, right) {
    var bars = document.getElementsByClassName("bar");

    let leftArray = [];
    let rightArray = [];

    let n1 = middle - left + 1;
    let n2 = right - middle;

    for (let i = 0; i < n1; i++) {
        leftArray.push(array[left+i]);
    }

    for (let j = 0; j < n2; j++) {
        rightArray.push(array[middle+1+j]);
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        for (let i = 0; i < numOfBars; i++) {
            bars[i].style.backgroundColor = "white";
        }

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = array[k]+"px";
            bars[k].style.backgroundColor = "red";
            i++
        }
        else {
            array[k] = rightArray[j];
            bars[k].style.height = array[k]+"px";
            bars[k].style.backgroundColor = "red";
            j++
        }
        k++;

        await sleep(10);
    }

    while (i < n1) {
        for (let i = 0; i < numOfBars; i++) {
            bars[i].style.backgroundColor = "white";
        }

        array[k] = leftArray[i];
        bars[k].style.height = array[k]+"px";
        bars[k].style.backgroundColor = "red";
        i++;
        k++;

        await sleep(10);
    }

    while (j < n2) {
        for (let i = 0; i < numOfBars; i++) {
            bars[i].style.backgroundColor = "white";
        }

        array[k] = rightArray[j];
        bars[k].style.height = array[k]+"px";
        bars[k].style.backgroundColor = "red";
        j++;
        k++;

        await sleep(10);
    }
}

async function mergeSort(array, left, right) {
    if (right - left < 1) {
        var bars = document.getElementsByClassName("bar");
        for (let i = 0; i < numOfBars; i++) {
            bars[i].style.backgroundColor = "white";
        }
        return;
    }

    let middle = Math.floor((left+right)/2);
    await Promise.all([
        mergeSort(array, left, middle),
        mergeSort(array, middle+1, right)
    ]);

    await merge(array, left, middle, right);
}


// Bubble Sort Algorithm
async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j+1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j+1) {
                        bars[k].style.backgroundColor = "white";
                    }
                }
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                bars[j].style.height = array[j]+"px";
                bars[j].style.backgroundColor = "lightgreen";
                bars[j+1].style.height = array[j+1]+"px";
                bars[j+1].style.backgroundColor = "lightgreen";
                await sleep(30);
            }
        }
        await sleep(30);
    }
}

// Insertion Sort Algorithm
async function insertionSort(array) {
    let bars = document.getElementsByClassName("bar");

    let i = 1;

    while (i < array.length) {
        let x = array[i];
        let j = i;

        while (j > 0 && array[j-1] > x) {
            array[j] = array[j-1];
            j--;

            bars[j].style.height = array[j]+"px";
            bars[j].style.backgroundColor = "lightgreen";

            await sleep(30);

            for (let k = 0; k < bars.length; k++) {
                if (k !== j && k !== j+1) {
                    bars[k].style.backgroundColor = "white";
                }
            }
        }

        array[j] = x;
        i++;
    }
}

async function initialiseSort() {
    if (sortingAlgorithm.value == "quick-sort") {
        await quickSort(numbers, 0, numOfBars-1);
    } else if (sortingAlgorithm.value == "merge-sort") {
        await mergeSort(numbers, 0, numOfBars-1);
    } else if (sortingAlgorithm.value == "bubble-sort") {
        await bubbleSort(numbers)
    } else if (sortingAlgorithm.value == "insertion-sort") {
        await insertionSort(numbers);
    }
}

randomizeButton.addEventListener("click", function () {
    createRandomNumbers();
    middleContainer.innerHTML = "";
    renderBars();
});

sortButton.addEventListener("click", async function() {
    await initialiseSort();
});

checkButton.addEventListener("click", function() {
    const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);
    console.log(isSorted(numbers));
});

document.addEventListener("DOMContentLoaded", function() {
    createRandomNumbers();
    renderBars(numbers);
});