<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pokémon Quiz</title>
    <link rel="stylesheet" href="style.css">

    <!-- jQuery (Bonus Challenge) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f8f8ff;
        }
        form {
            background-color: #fff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: auto;
        }
        h1, p {
            text-align: center;
        }
        fieldset {
            border: none;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin: 8px 0 4px;
        }
        .error {
            color: red;
            font-size: 0.9em;
            margin-top: 4px;
        }
        input[type="submit"], input[type="reset"] {
            margin-right: 10px;
            padding: 8px 16px;
            font-size: 1em;
        }
    </style>
</head>
<body>
<h1>Pokémon Quiz</h1>
<p>Test your knowledge of the Pokémon world! Please complete all fields before submitting.</p>

<form action="process.php" method="POST">

    <!-- Name -->
    <label for="name"><strong>Your Name:</strong></label>
    <input type="text" id="name" name="name">
    <div class="error" id="error-name"></div>

    <!-- Q1 -->
    <fieldset>
        <legend><strong>1. Which of these is a Fire-type starter Pokémon?</strong></legend>
        <label><input type="radio" name="q1" value="Charmander"> Charmander</label>
        <label><input type="radio" name="q1" value="Squirtle"> Squirtle</label>
        <label><input type="radio" name="q1" value="Bulbasaur"> Bulbasaur</label>
        <div class="error" id="error-q1"></div>
    </fieldset>

    <!-- Q2 -->
    <fieldset>
        <legend><strong>2. Select all Legendary Pokémon:</strong></legend>
        <label><input type="checkbox" name="q2[]" value="Mewtwo"> Mewtwo</label>
        <label><input type="checkbox" name="q2[]" value="Pikachu"> Pikachu</label>
        <label><input type="checkbox" name="q2[]" value="Articuno"> Articuno</label>
        <label><input type="checkbox" name="q2[]" value="Charizard"> Charizard</label>
        <div class="error" id="error-q2"></div>
    </fieldset>

    <!-- Q3 -->
    <label for="q3"><strong>3. What region is Ash originally from?</strong></label>
    <select id="q3" name="q3">
        <option value="">--Select--</option>
        <option value="Kanto">Kanto</option>
        <option value="Johto">Johto</option>
        <option value="Hoenn">Hoenn</option>
    </select>
    <div class="error" id="error-q3"></div>

    <!-- Q4 -->
    <fieldset>
        <legend><strong>4. Which type is weak to Electric?</strong></legend>
        <label><input type="radio" name="q4" value="Water"> Water</label>
        <label><input type="radio" name="q4" value="Grass"> Grass</label>
        <label><input type="radio" name="q4" value="Fire"> Fire</label>
        <div class="error" id="error-q4"></div>
    </fieldset>

    <!-- Q5 -->
    <label for="q5"><strong>5. What comes after Ivysaur in its evolution line?</strong></label>
    <select id="q5" name="q5">
        <option value="">--Select--</option>
        <option value="Venusaur">Venusaur</option>
        <option value="Bulbasaur">Bulbasaur</option>
        <option value="Charmander">Charmander</option>
    </select>
    <div class="error" id="error-q5"></div>

    <br>
    <input type="reset" value="Reset">
    <input type="submit" value="Submit Quiz">

</form>

<!-- Bonus: jQuery validation -->
<script>
    $(document).ready(function () {
        $("form").submit(function (e) {
            let valid = true;
            $(".error").text(""); // Clear all previous errors

            if ($("#name").val().trim() === "") {
                $("#error-name").text("Please enter your name.");
                valid = false;
            }

            if (!$("input[name='q1']:checked").length) {
                $("#error-q1").text("Please select an answer.");
                valid = false;
            }

            if (!$("input[name='q2[]']:checked").length) {
                $("#error-q2").text("Please select at least one.");
                valid = false;
            }

            if ($("#q3").val() === "") {
                $("#error-q3").text("Please select a region.");
                valid = false;
            }

            if (!$("input[name='q4']:checked").length) {
                $("#error-q4").text("Please select an answer.");
                valid = false;
            }

            if ($("#q5").val() === "") {
                $("#error-q5").text("Please select an evolution.");
                valid = false;
            }

            if (!valid) e.preventDefault();
        });
    });
</script>
</body>
</html>
