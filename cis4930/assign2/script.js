function recommendGame() {
    // Get form values
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let genre = document.querySelector('input[name="genre"]:checked');
    let platforms = document.querySelectorAll('input[name="platform"]:checked');
    let playtime = document.getElementById("playtime").value;

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results

    // Validate name input
    if (name === "") {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter your name.</p>";
        return;
    }

    // Validate age using regular expression (only allows numbers)
    let ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(age) || age < 5) {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter a valid age (5 or older).</p>";
        return;
    }

    // Validate genre selection
    if (!genre) {
        resultDiv.innerHTML = "<p style='color: red;'>Please select a genre.</p>";
        return;
    }

    // Validate platform selection
    if (platforms.length === 0) {
        resultDiv.innerHTML = "<p style='color: red;'>Please select at least one gaming platform.</p>";
        return;
    }

    // Convert age to number
    age = parseInt(age);

    // Get selected genre value
    let selectedGenre = genre.value;

    // Get selected platforms as an array
    let selectedPlatforms = Array.from(platforms).map(platform => platform.value);

    // Define game recommendations by genre, age, and platform availability
    let gameOptions = {
        "Action": [
            { game: "Super Mario Odyssey", minAge: 5, platforms: ["Nintendo"] },
            { game: "Elden Ring", minAge: 16, platforms: ["PC", "PlayStation", "Xbox"] }
        ],
        "RPG": [
            { game: "Pokémon Legends: Arceus", minAge: 5, platforms: ["Nintendo"] },
            { game: "The Witcher 3: Wild Hunt", minAge: 17, platforms: ["PC", "PlayStation", "Xbox", "Nintendo"] }
        ],
        "Shooter": [
            { game: "Splatoon 3", minAge: 10, platforms: ["Nintendo"] },
            { game: "Call of Duty: Modern Warfare III", minAge: 16, platforms: ["PC", "PlayStation", "Xbox"] }
        ],
        "Horror": [
            { game: "Luigi's Mansion 3", minAge: 7, platforms: ["Nintendo"] },
            { game: "Resident Evil Village", minAge: 18, platforms: ["PC", "PlayStation", "Xbox"] }
        ],
        "Adventure": [
            { game: "Minecraft", minAge: 5, platforms: ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"] },
            { game: "The Legend of Zelda: Tears of the Kingdom", minAge: 10, platforms: ["Nintendo"] }
        ]
    };

    // Find a game that matches the user's age and platform selection
    let recommendation = "No suitable game found for your selected platforms.";
    for (let game of gameOptions[selectedGenre]) {
        if (age >= game.minAge && game.platforms.some(p => selectedPlatforms.includes(p))) {
            recommendation = game.game;
            break; // Stop once we find a suitable match
        }
    }

    // Adjust recommendation based on playtime
    if (playtime === "less than 5") {
        recommendation += " (Casual play recommended).";
    } else if (playtime === "20+") {
        recommendation += " (Hardcore experience suggested!).";
    }

    // Display the final recommendation
    resultDiv.innerHTML = `<p style='color: green;'><strong>${name}, based on your preferences, we recommend:</strong> ${recommendation}</p>`;
}
