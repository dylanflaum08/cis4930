<?php
$file = 'data.csv';
if (!file_exists($file)) {
    die("No data available yet.");
}

$rows = array_map('str_getcsv', file($file));
$headers = array_shift($rows); // Remove header row

// Totals
$totalUsers = count($rows);
$totalScore = 0;
$minScore = 5;
$maxScore = 0;

// Item stats
$itemCorrectCounts = [0, 0, 0, 0, 0];
$correctAnswers = [
    "Charmander",
    ["Mewtwo", "Articuno"],
    "Kanto",
    "Water",
    "Venusaur"
];

// Loop through rows to analyze
foreach ($rows as $row) {
    $score = intval(end($row)); // Last column
    $totalScore += $score;
    $minScore = min($minScore, $score);
    $maxScore = max($maxScore, $score);

    // Q1
    if (trim($row[2]) == $correctAnswers[0]) {
        $itemCorrectCounts[0]++;
    }

    // Q2 (checkboxes)
    $submittedQ2 = array_map('trim', explode(",", $row[3]));
    sort($submittedQ2);
    $correctQ2 = $correctAnswers[1];
    sort($correctQ2);
    if ($submittedQ2 === $correctQ2) {
        $itemCorrectCounts[1]++;
    }

    // Q3
    if (trim($row[4]) == $correctAnswers[2]) {
        $itemCorrectCounts[2]++;
    }

    // Q4
    if (trim($row[5]) == $correctAnswers[3]) {
        $itemCorrectCounts[3]++;
    }

    // Q5
    if (trim($row[6]) == $correctAnswers[4]) {
        $itemCorrectCounts[4]++;
    }
}

// Stats
$average = $totalUsers ? round($totalScore / $totalUsers, 2) : 0;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pokémon Quiz Admin</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Quiz Results Summary</h1>

<h2>Overall Stats</h2>
<ul>
    <li>Total Participants: <?php echo $totalUsers; ?></li>
    <li>Average Score: <?php echo $average; ?> / 5</li>
    <li>Highest Score: <?php echo $maxScore; ?> / 5</li>
    <li>Lowest Score: <?php echo $minScore; ?> / 5</li>
</ul>

<h2>Item-Level Performance</h2>
<table border="1" cellpadding="8">
    <tr>
        <th>Question</th>
        <th>% Correct</th>
    </tr>
    <?php
    for ($i = 0; $i < 5; $i++) {
        $percent = $totalUsers ? round(($itemCorrectCounts[$i] / $totalUsers) * 100) : 0;
        echo "<tr><td>Q" . ($i+1) . "</td><td>$percent%</td></tr>";
    }
    ?>
</table>

<h2>User Submissions</h2>
<table border="1" cellpadding="6">
    <tr>
        <?php foreach ($headers as $header): ?>
            <th><?php echo htmlspecialchars($header); ?></th>
        <?php endforeach; ?>
    </tr>
    <?php foreach ($rows as $row): ?>
        <tr>
            <?php foreach ($row as $cell): ?>
                <td><?php echo htmlspecialchars($cell); ?></td>
            <?php endforeach; ?>
        </tr>
    <?php endforeach; ?>
</table>
</body>
</html>
