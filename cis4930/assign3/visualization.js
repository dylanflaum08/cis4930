// visualization.js - Data Visualization for Statistical Calculator

// Ensure Chart.js is fully loaded before executing any functions
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(script);

script.onload = function() {
    console.log("Chart.js loaded successfully");
    restorePreviousCharts(); // Restore previous charts on page load
};

let pieChart, histogramChart, lineChart;

function ensureCanvasExists(canvasId) {
    let canvas = document.getElementById(canvasId);
    if (!canvas) {
        let container = document.getElementById("chartContainer");
        canvas = document.createElement("canvas");
        canvas.id = canvasId;
        canvas.width = 400;
        canvas.height = 200;
        container.appendChild(canvas);
    }
    return canvas;
}

function clearCanvas(canvasId) {
    let canvas = ensureCanvasExists(canvasId);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createPieChart(dataset) {
    let canvas = ensureCanvasExists("pieChart");
    let ctx = canvas.getContext("2d");

    let labels = [...new Set(dataset)].sort((a, b) => a - b);
    let frequencies = labels.map(value => dataset.filter(num => num === value).length);

    if (pieChart) {
        pieChart.destroy();
    }
    clearCanvas("pieChart");

    pieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                label: "Distribution",
                data: frequencies,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 205, 86, 0.6)", "rgba(153, 102, 255, 0.6)"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createHistogram(dataset) {
    let canvas = ensureCanvasExists("histogramChart");
    let ctx = canvas.getContext("2d");
    let labels = [...new Set(dataset)].sort((a, b) => a - b);
    let frequencies = labels.map(value => dataset.filter(num => num === value).length);

    if (histogramChart) histogramChart.destroy();
    clearCanvas("histogramChart");

    histogramChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Frequency",
                data: frequencies,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function createLineChart(dataset) {
    let canvas = ensureCanvasExists("lineChart");
    let ctx = canvas.getContext("2d");
    let sorted = [...dataset].sort((a, b) => a - b);

    if (lineChart) lineChart.destroy();
    clearCanvas("lineChart");

    lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: sorted,
            datasets: [{
                label: "Sorted Values",
                data: sorted,
                borderColor: "rgba(255, 99, 132, 0.8)",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function generateVisualizations() {
    let input = document.getElementById("numbers");
    if (!input) {
        console.error("Input element not found.");
        return;
    }

    let dataset = input.value.split(/\s|,/).map(Number).filter(n => !isNaN(n));

    if (dataset.length === 0) {
        console.error("No valid data provided for visualization.");
        return;
    }

    localStorage.setItem("latestDataset", dataset.join(",")); // Store dataset persistently

    createPieChart(dataset);
    createHistogram(dataset);
    createLineChart(dataset);
}

function restorePreviousCharts() {
    let dataset = localStorage.getItem("latestDataset");
    if (dataset) {
        dataset = dataset.split(",").map(Number);
        createPieChart(dataset);
        createHistogram(dataset);
        createLineChart(dataset);
    }
}

function goToPortfolio() {
    localStorage.removeItem("latestDataset"); // Reset charts when returning to portfolio
    window.location.href = "../index.html";
}

function goToTestResults() {
    window.location.href = "test_results.html";
}