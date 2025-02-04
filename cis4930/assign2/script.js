function recommendGame() {
    // Get form values
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let genre = document.querySelector('input[name="genre"]:checked');
    let platforms = document.querySelectorAll('input[name="platform"]:checked');
    let playtime = document.getElementById("playtime").value;

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";


    if (name === "") {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter your name.</p>";
        return;
    }


    let ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(age) || age < 5) {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter a valid age (5 or older).</p>";
        return;
    }


    if (!genre) {
        resultDiv.innerHTML = "<p style='color: red;'>Please select a genre.</p>";
        return;
    }


    if (platforms.length === 0) {
        resultDiv.innerHTML = "<p style='color: red;'>Please select at least one gaming platform.</p>";
        return;
    }


    age = parseInt(age);


    let selectedGenre = genre.value;


    let selectedPlatforms = Array.from(platforms).map(platform => platform.value);


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


    let recommendation = "No suitable game found for your selected platforms.";
    for (let game of gameOptions[selectedGenre]) {
        if (age >= game.minAge && game.platforms.some(p => selectedPlatforms.includes(p))) {
            recommendation = game.game;
            break;
        }
    }


    if (playtime === "less than 5") {
        recommendation += " (Casual play recommended).";
    } else if (playtime === "20+") {
        recommendation += " (Hardcore experience suggested!).";
    }


    resultDiv.innerHTML = `<p style='color: green;'><strong>${name}, based on your preferences, we recommend:</strong> ${recommendation}</p>`;
}
