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

// var globalID;

// function animateInitialBars(i, height, bar) {
//     if (height > numbers[i]) {
//         cancelAnimationFrame(globalID);
//     } else {
//         height+=1;
//         bar.style.height = height + "px";
//         globalID = requestAnimationFrame(function() {
//             animateInitialBars(i, height, bar)
//         });
//     }
// }

function renderBars() {
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = numbers[i]+"px";
        middleContainer.appendChild(bar);
        // animateInitialBars(i, 0, bar);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createRandomNumbers();
    renderBars(numbers);
});

async function initialiseSort() {
    if (sortingAlgorithm.value == "quick-sort") {
        await quickSort(numbers, 0, numOfBars-1);
    } else if (sortingAlgorithm.value == "merge-sort") {
    } else if (sortingAlgorithm.value == "bubble-sort") {
        bubbleSort(numbers)
    } else if (sortingAlgorithm.value == "insertion-sort") {
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
function mergeSort() {

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
function insertionSort() {
    
}

randomizeButton.addEventListener("click", function () {
    createRandomNumbers();
    middleContainer.innerHTML = "";
    renderBars();
});

sortButton.addEventListener("click", async function() {
    initialiseSort();
});

checkButton.addEventListener("click", function() {
    const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);
    console.log(isSorted(numbers));
});