$(document).ready(function () {
    $("#recommendBtn").click(function () {
        // Clear previous results
        $("#result").hide().html("");

        // Get form values
        let name = $("#name").val().trim();
        let age = $("#age").val().trim();
        let genre = $("input[name='genre']:checked").val();
        let platforms = $("input[name='platform']:checked").map(function () {
            return $(this).val();
        }).get();
        let playtime = $("#playtime").val();

        // Validation
        if (name === "") {
            showError("Please enter your name.");
            return;
        }

        let ageRegex = /^[0-9]+$/;
        if (!ageRegex.test(age) || age < 5) {
            showError("Please enter a valid age (5 or older).");
            return;
        }

        if (!genre) {
            showError("Please select a favorite game genre.");
            return;
        }

        if (platforms.length === 0) {
            showError("Please select at least one gaming platform.");
            return;
        }

        // Convert age to number
        age = parseInt(age);

        // Define game recommendations
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

        // Find a suitable game
        let recommendation = "No suitable game found for your selected platforms.";
        for (let game of gameOptions[genre]) {
            if (age >= game.minAge && game.platforms.some(p => platforms.includes(p))) {
                recommendation = game.game;
                break;
            }
        }

        // Adjust recommendation based on playtime
        if (playtime === "less than 5") {
            recommendation += " (Casual play recommended).";
        } else if (playtime === "20+") {
            recommendation += " (Hardcore experience suggested!).";
        }

        // Show result with fade-in effect
        $("#result").html(`<p class="text-success"><strong>${name}, based on your preferences, we recommend:</strong> ${recommendation}</p>`).fadeIn();
    });

    // Function to show error messages smoothly
    function showError(message) {
        $("#result").html(`<p class="text-danger">${message}</p>`).fadeIn();
    }
});
