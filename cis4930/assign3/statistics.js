// statistics.js - JavaScript function library for statistical calculations

// Function to parse user input and process numbers
function processNumbers() {
    let input = document.getElementById("numbers").value;
    let numbers = input.split(/\s|,/).map(Number).filter(n => !isNaN(n));

    localStorage.setItem("latestDataset", numbers.join(",")); // Store dataset for test results

    document.getElementById("outputN").textContent = findN(numbers);
    document.getElementById("outputSum").textContent = findSum(numbers).toFixed(2);
    document.getElementById("outputMean").textContent = findMean(numbers).toFixed(2);
    document.getElementById("outputMedian").textContent = findMedian(numbers).toFixed(2);
    document.getElementById("outputMode").textContent = findMode(numbers);
    document.getElementById("outputMax").textContent = findMax(numbers);
    document.getElementById("outputMin").textContent = findMin(numbers);
    document.getElementById("outputRange").textContent = findRange(numbers);
    document.getElementById("outputIQR").textContent = findInterquartileRange(numbers).toFixed(2);
    document.getElementById("outputVariance").textContent = findVariance(numbers).toFixed(2);
    document.getElementById("outputSD").textContent = findStandardDeviation(numbers).toFixed(2);
    document.getElementById("outputSkewness").textContent = findSkewness(numbers).toFixed(2);
    document.getElementById("outputKurtosis").textContent = findKurtosis(numbers).toFixed(2);

    generateVisualizations();
}

// Basic statistical functions
function findN(array) {
    return array.length;
}

function findSum(array) {
    return array.reduce((acc, num) => acc + num, 0);
}

function findMean(array) {
    return findSum(array) / findN(array);
}

function findMedian(array) {
    let sorted = [...array].sort((a, b) => a - b);
    let mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function findMode(array) {
    let frequency = {};
    array.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    let maxFreq = Math.max(...Object.values(frequency));
    return Object.keys(frequency).filter(num => frequency[num] === maxFreq).join(", ");
}

function findMax(array) {
    return Math.max(...array);
}

function findMin(array) {
    return Math.min(...array);
}

function findRange(array) {
    return findMax(array) - findMin(array);
}

function findInterquartileRange(array) {
    let sorted = [...array].sort((a, b) => a - b);
    let q1 = sorted[Math.floor(sorted.length / 4)];
    let q3 = sorted[Math.floor(3 * sorted.length / 4)];
    return q3 - q1;
}

function findVariance(array) {
    let mean = findMean(array);
    return array.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / (array.length - 1);
}

function findStandardDeviation(array) {
    return Math.sqrt(findVariance(array));
}

function findSkewness(array) {
    let mean = findMean(array);
    let sd = findStandardDeviation(array);
    let n = findN(array);
    return (n / ((n - 1) * (n - 2))) * array.reduce((acc, num) => acc + Math.pow((num - mean) / sd, 3), 0);
}

function findKurtosis(array) {
    let mean = findMean(array);
    let sd = findStandardDeviation(array);
    let n = findN(array);
    return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * array.reduce((acc, num) => acc + Math.pow((num - mean) / sd, 4), 0) - (3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3)));
}
