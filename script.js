/**
 * Sorting Algorithm Visualizer
 * Interactive web application for visualizing sorting algorithms
 * Author: Sorting Visualizer Project
 * Version: 1.0
 * 
 * Features:
 * - Multiple sorting algorithms (Bubble, Selection, Insertion, Merge, Quick)
 * - Adjustable array size and animation speed
 * - Real-time algorithm information display
 * - Responsive design for all devices
 * - Color-coded visualization states
 */

// ================================
// GLOBAL VARIABLES AND CONSTANTS
// ================================

// DOM Elements
const algoMenu = document.querySelector(".algo-menu");
const sizeMenu = document.querySelector(".size-menu");
const speedMenu = document.querySelector(".speed-menu");
const startBtn = document.querySelector(".start-btn");
const newArrayBtn = document.getElementById("random-btn");
const appTitle = document.getElementById("app-title");
const algorithmInfoDiv = document.getElementById("algorithm-info");
const arrayContainer = document.querySelector(".array");

// Algorithm information database
const algorithmInfo = {
  1: {
    name: "Bubble Sort",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    complexity: {
      "Time Complexity (Best)": "O(n)",
      "Time Complexity (Average)": "O(n²)",
      "Time Complexity (Worst)": "O(n²)",
      "Space Complexity": "O(1)"
    }
  },
  2: {
    name: "Selection Sort",
    description: "Selection Sort is an in-place comparison sorting algorithm. It has an O(n²) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort.",
    complexity: {
      "Time Complexity (Best)": "O(n²)",
      "Time Complexity (Average)": "O(n²)",
      "Time Complexity (Worst)": "O(n²)",
      "Space Complexity": "O(1)"
    }
  },
  3: {
    name: "Insertion Sort",
    description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
    complexity: {
      "Time Complexity (Best)": "O(n)",
      "Time Complexity (Average)": "O(n²)",
      "Time Complexity (Worst)": "O(n²)",
      "Space Complexity": "O(1)"
    }
  },
  4: {
    name: "Merge Sort",
    description: "Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. Most implementations produce a stable sort, meaning that the order of equal elements is the same in the input and output.",
    complexity: {
      "Time Complexity (Best)": "O(n log n)",
      "Time Complexity (Average)": "O(n log n)",
      "Time Complexity (Worst)": "O(n log n)",
      "Space Complexity": "O(n)"
    }
  },
  5: {
    name: "Quick Sort",
    description: "Quicksort is an efficient sorting algorithm. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, it is still a commonly used algorithm for sorting.",
    complexity: {
      "Time Complexity (Best)": "O(n log n)",
      "Time Complexity (Average)": "O(n log n)",
      "Time Complexity (Worst)": "O(n²)",
      "Space Complexity": "O(log n)"
    }
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Disables or enables all control elements during sorting
 * @param {boolean} disabled - True to disable controls, false to enable
 */
const disableControls = (disabled) => {
    document.querySelectorAll(".navbar button, .navbar select").forEach(el => {
        el.disabled = disabled;
    });
};

/**
 * Generates a random array of numbers
 * @param {number} Length - The size of the array to generate
 * @returns {Array} - Array of random numbers
 */
const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 5; // Minimum value for better visibility
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

/**
 * Clears the visualization container
 */
const clearScreen = async () => {
  arrayContainer.innerHTML = "";
};

/**
 * Updates the algorithm information display
 * @param {number} algoValue - The selected algorithm ID
 */
const updateAlgorithmInfo = (algoValue) => {
  const info = algorithmInfo[algoValue];
  if (!info) return;
  
  let html = `<h3><i class="fas fa-info-circle"></i> ${info.name}</h3>`;
  html += `<p>${info.description}</p>`;
  html += `<table class="complexity-table">`;
  
  for (const [key, value] of Object.entries(info.complexity)) {
    html += `<tr><th>${key}</th><td>${value}</td></tr>`;
  }
  
  html += `</table>`;
  algorithmInfoDiv.innerHTML = html;
};

// ================================
// VISUALIZATION FUNCTIONS
// ================================

/**
 * Renders the array visualization on screen
 */
const RenderList = async () => {
  let sizeValue = Number(sizeMenu.value);
  if (sizeValue === 0) {
    sizeValue = 50; // Default size
  }
  await clearScreen();

  let list = await randomList(sizeValue);
  
  // Calculate bar height multiplier based on container height
  const containerHeight = arrayContainer.clientHeight - 20;
  const heightMultiplier = containerHeight / 100;

  // Create visual bars for each array element
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${heightMultiplier * element}px`;
    arrayContainer.appendChild(node);
  }
  
  // Update algorithm info if an algorithm is selected
  const algoValue = Number(algoMenu.value);
  if (algoValue !== 0) {
    updateAlgorithmInfo(algoValue);
  } else {
    algorithmInfoDiv.innerHTML = `<h3><i class="fas fa-info-circle"></i> Algorithm Information</h3><p>Select an algorithm from the dropdown to see information about it.</p>`;
  }
};

/**
 * Main screen rendering function
 */
const RenderScreen = async () => {
  disableControls(false);
  await RenderList();
};

// ================================
// SORTING CONTROL FUNCTION
// ================================

/**
 * Initiates the sorting process based on user selection
 */
const startSorting = async () => {
  let algoValue = Number(algoMenu.value);
  let speedValue = Number(speedMenu.value);

  // Validation
  if (algoValue === 0) {
    alert("Please select a sorting algorithm first!");
    return;
  }

  disableControls(true);

  // Instantiate sorting algorithms with current speed
  let algorithm = new sortAlgorithms(speedValue);
  
  // Execute selected algorithm
  try {
    switch(algoValue) {
      case 1: await algorithm.BubbleSort(); break;
      case 2: await algorithm.SelectionSort(); break;
      case 3: await algorithm.InsertionSort(); break;
      case 4: await algorithm.MergeSort(); break;
      case 5: await algorithm.QuickSort(); break;
      default: break;
    }
  } catch (error) {
    console.error("Sorting error:", error);
    alert("An error occurred during sorting. Please try again.");
  } finally {
    disableControls(false);
  }
};

// ================================
// EVENT LISTENERS
// ================================

// Reload application when title is clicked
appTitle.addEventListener("click", () => window.location.reload());

// Start sorting process
startBtn.addEventListener("click", startSorting);

// Generate new random array
newArrayBtn.addEventListener("click", RenderScreen);

// Update visualization when array size changes
sizeMenu.addEventListener("change", RenderScreen);

// Update algorithm information when algorithm selection changes
algoMenu.addEventListener("change", function() {
  const algoValue = Number(this.value);
  if (algoValue !== 0) {
    updateAlgorithmInfo(algoValue);
  }
  RenderScreen();
});

// Initialize application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set default values
    sizeMenu.value = '50';
    speedMenu.value = '1';
    algoMenu.value = '0';
    
    // Initial render
    RenderScreen();
});

// ================================
// HELPER CLASS FOR ANIMATION
// ================================

/**
 * Helper class for managing animation and visualization states
 */
class Helper {
    constructor(time) {
        this.time = parseInt(400/time); // Animation delay calculation
        this.list = document.querySelectorAll(".cell"); // Current array elements
        this.containerHeight = arrayContainer.clientHeight - 20;
        this.heightMultiplier = this.containerHeight / 100;
    }

    /**
     * Marks an element as currently being processed
     */
    mark = async (index) => {
        if (this.list[index]) this.list[index].setAttribute("class", "cell current");
    }

    /**
     * Marks an element as special (minimum/selected)
     */
    markSpl = async (index) => {
        if (this.list[index]) this.list[index].setAttribute("class", "cell min");
    }
    
    /**
     * Marks an element as pivot (for Quick Sort)
     */
    markPivot = async (index) => {
        if (this.list[index]) this.list[index].setAttribute("class", "cell pivot");
    }

    /**
     * Resets an element to default state
     */
    unmark = async (index) => {
        if (this.list[index]) this.list[index].setAttribute("class", "cell");
    }
    
    /**
     * Creates a delay for animation
     */
    pause = async() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.time);
        });
    }

    /**
     * Compares two elements and returns comparison result
     */
    compare = async (index1, index2) => {
        await this.pause();
        if (!this.list[index1] || !this.list[index2]) return false;
        
        let value1 = Number(this.list[index1].getAttribute("value"));
        let value2 = Number(this.list[index2].getAttribute("value"));
        return value1 > value2;
    }

    /**
     * Swaps two elements in the visualization
     */
    swap = async (index1, index2) => {
        await this.pause();
        if (!this.list[index1] || !this.list[index2]) return;

        let value1 = this.list[index1].getAttribute("value");
        let value2 = this.list[index2].getAttribute("value");
        
        // Swap values and update heights
        this.list[index1].setAttribute("value", value2);
        this.list[index1].style.height = `${this.heightMultiplier * value2}px`;
        this.list[index2].setAttribute("value", value1);
        this.list[index2].style.height = `${this.heightMultiplier * value1}px`;
    }
};

// ================================
// SORTING ALGORITHMS CLASS
// ================================

/**
 * Main class containing all sorting algorithm implementations
 */
class sortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time);
        this.containerHeight = arrayContainer.clientHeight - 20;
        this.heightMultiplier = this.containerHeight / 100;
    }

    /**
     * Bubble Sort Implementation
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
     */
    BubbleSort = async () => {
        for(let i = 0 ; i < this.size - 1 ; ++i) {
            for(let j = 0 ; j < this.size - i - 1 ; ++j) {
                await this.help.mark(j);
                await this.help.mark(j+1);
                if(await this.help.compare(j, j+1)) {
                    await this.help.swap(j, j+1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j+1);
            }
            if (this.list[this.size - i - 1]) {
                this.list[this.size - i - 1].setAttribute("class", "cell done");
            }
        }
        if (this.list[0]) this.list[0].setAttribute("class", "cell done");
    }

    /**
     * Insertion Sort Implementation
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
     */
    InsertionSort = async () => {
        for (let i = 1; i < this.size; i++) {
            await this.help.markSpl(i);
            await this.help.pause();

            let j = i - 1;
            while (j >= 0 && await this.help.compare(j, j + 1)) {
                await this.help.mark(j);
                await this.help.swap(j, j + 1);
                await this.help.unmark(j+1);
                j = j - 1;
            }
            if (this.list[j + 1]) await this.help.unmark(j + 1);
        }

        for(let counter = 0 ; counter < this.size ; ++counter) {
            await this.help.pause();
            if (this.list[counter]) this.list[counter].setAttribute("class", "cell done");
        }
    }

    /**
     * Selection Sort Implementation
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
     */
    SelectionSort = async () => {
        for(let i = 0 ; i < this.size ; ++i) {
            let minIndex = i;
            await this.help.markSpl(minIndex);
            for(let j = i+1 ; j < this.size ; ++j) {
                await this.help.mark(j);
                if(await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                    await this.help.markSpl(minIndex);
                }
                else {
                   await this.help.unmark(j);
                }
            }
            
            await this.help.swap(minIndex, i);
            await this.help.unmark(minIndex);
            if (this.list[i]) this.list[i].setAttribute("class", "cell done");
        }
    }

    /**
     * Merge Sort Implementation
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    MergeSort = async () => {
        await this.MergeDivider(0, this.size - 1);
        for(let counter = 0 ; counter < this.size ; ++counter) {
            if (this.list[counter]) this.list[counter].setAttribute("class", "cell done");
        }
    }

    MergeDivider = async (start, end) => {
        if(start < end) {
            let mid = start + Math.floor((end - start)/2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid+1, end);
            await this.Merge(start, mid, end);
        }
    }

    Merge = async (start, mid, end) => {
        let newList = new Array();
        let frontcounter = start;
        let midcounter = mid + 1;
        
        while(frontcounter <= mid && midcounter <= end) {
            await this.help.mark(frontcounter);
            await this.help.mark(midcounter);
            let fvalue = Number(this.list[frontcounter].getAttribute("value"));
            let svalue = Number(this.list[midcounter].getAttribute("value"));
            if(fvalue >= svalue) {
                newList.push(svalue);
                ++midcounter;
            }
            else {
                newList.push(fvalue);
                ++frontcounter;
            }
             await this.help.pause();
             await this.help.unmark(frontcounter);
             await this.help.unmark(midcounter);
        }
        while(frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("value")));
            ++frontcounter;
        }
        while(midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("value")));
            ++midcounter;
        }

        for(let c = start, point = 0 ; c <= end && point < newList.length; 
            ++c, ++point) {
                await this.help.mark(c);
                await this.help.pause();
                if (this.list[c]) {
                    this.list[c].setAttribute("value", newList[point]);
                    this.list[c].style.height = `${this.heightMultiplier * newList[point]}px`;
                }
                await this.help.unmark(c);
        }
    }

    /**
     * Quick Sort Implementation
     * Time Complexity: O(n log n) average, O(n²) worst case
     * Space Complexity: O(log n)
     */
    QuickSort = async () => {
        await this.QuickDivider(0, this.size-1);
        for(let c = 0 ; c < this.size ; ++c) {
            if(this.list[c] && this.list[c].className !== "cell done"){
                this.list[c].setAttribute("class", "cell done");
            }
        }
    }

    QuickDivider = async (start, end) => {
        if(start < end) {
            let pivotIndex = await this.Partition(start, end);
            await this.QuickDivider(start, pivotIndex-1);
            await this.QuickDivider(pivotIndex+1, end);
        } else if (start === end) {
            if (this.list[start]) this.list[start].setAttribute("class", "cell done");
        }
    }

    Partition = async (start, end) => {
        if (start >= end || !this.list[end]) return end;

        let pivotValue = this.list[end].getAttribute("value");
        let pivotIndex = start;

        await this.help.markPivot(end);
        for(let i = start ; i < end ; ++i) {
            await this.help.mark(i);
            let currValue = Number(this.list[i].getAttribute("value"));
            await this.help.pause();
            if(currValue < pivotValue) {
                await this.help.swap(i, pivotIndex);
                await this.help.unmark(pivotIndex);
                pivotIndex++;
            }
            await this.help.unmark(i);
        }
        await this.help.swap(pivotIndex, end);
        await this.help.unmark(end);
        if (this.list[pivotIndex]) this.list[pivotIndex].setAttribute("class", "cell done");
        return pivotIndex;
    }
};