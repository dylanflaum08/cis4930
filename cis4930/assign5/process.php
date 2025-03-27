<?php
// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid access.");
}

// Get form data
$name = isset($_POST["name"]) ? $_POST["name"] : "";
$q1 = isset($_POST["q1"]) ? $_POST["q1"] : "";
$q2 = isset($_POST["q2"]) ? $_POST["q2"] : array();
$q3 = isset($_POST["q3"]) ? $_POST["q3"] : "";
$q4 = isset($_POST["q4"]) ? $_POST["q4"] : "";
$q5 = isset($_POST["q5"]) ? $_POST["q5"] : "";


// Correct answers
$correct = [
    "q1" => "Charmander",
    "q2" => ["Mewtwo", "Articuno"],
    "q3" => "Kanto",
    "q4" => "Water",
    "q5" => "Venusaur"
];

$score = 0;
$max = 5;

// Feedback array
$feedback = [];

// Question 1
if ($q1 === $correct["q1"]) {
    $score++;
    $feedback[] = "Q1: Correct! Charmander is a Fire-type starter.";
} else {
    $feedback[] = "Q1: Incorrect. The correct answer was Charmander.";
}

// Question 2
if (is_array($q2)) {
    sort($q2);
    $correct_q2 = $correct["q2"];
    sort($correct_q2);
    if ($q2 == $correct_q2) {
        $score++;
        $feedback[] = "Q2: Correct! Mewtwo and Articuno are Legendary Pokémon.";
    } else {
        $feedback[] = "Q2: Incorrect. The correct answers were Mewtwo and Articuno.";
    }
} else {
    $feedback[] = "Q2: No answer selected.";
}

// Question 3
if ($q3 === $correct["q3"]) {
    $score++;
    $feedback[] = "Q3: Correct! Ash is from the Kanto region.";
} else {
    $feedback[] = "Q3: Incorrect. The correct answer was Kanto.";
}

// Question 4
if ($q4 === $correct["q4"]) {
    $score++;
    $feedback[] = "Q4: Correct! Water is weak to Electric.";
} else {
    $feedback[] = "Q4: Incorrect. The correct answer was Water.";
}

// Question 5
if ($q5 === $correct["q5"]) {
    $score++;
    $feedback[] = "Q5: Correct! Venusaur comes after Ivysaur.";
} else {
    $feedback[] = "Q5: Incorrect. The correct answer was Venusaur.";
}

// Save to CSV
$data = [
    date("Y-m-d H:i:s"),
    $name,
    $q1,
    implode(", ", $q2),
    $q3,
    $q4,
    $q5,
    $score
];

$file = fopen("data.csv", "a");
fputcsv($file, $data);
fclose($file);

// Display feedback
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pokémon Quiz Results</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Thanks for taking the Pokémon Quiz, <?php echo htmlspecialchars($name); ?>!</h1>
<h2>Your Score: <?php echo $score; ?> / <?php echo $max; ?></h2>
<h3>Feedback:</h3>
<ul>
    <?php foreach ($feedback as $item): ?>
        <li><?php echo htmlspecialchars($item); ?></li>
    <?php endforeach; ?>
</ul>
<a href="index.php">Take the quiz again</a>
</body>
</html>
