var app = angular.module('gameApp', []);

app.controller('GameController', function ($scope) {
    $scope.user = {
        name: "",
        age: null,
        genre: "",
        platforms: {},
        playtime: ""
    };

    $scope.result = "";

    $scope.recommendGame = function () {
        if (!$scope.user.name || !$scope.user.age || !$scope.user.genre) {
            $scope.result = "Please complete all required fields.";
            return;
        }

        let availableGames = {
            "Action": { name: "Elden Ring", age: 16 },
            "RPG": { name: "The Witcher 3: Wild Hunt", age: 17 },
            "Shooter": { name: "Call of Duty: Modern Warfare III", age: 16 },
            "Horror": { name: "Resident Evil Village", age: 18 },
            "Adventure": { name: "The Legend of Zelda: Tears of the Kingdom", age: 10 }
        };

        if ($scope.user.age < availableGames[$scope.user.genre].age) {
            $scope.result = "No suitable game found for your age.";
        } else {
            $scope.result = availableGames[$scope.user.genre].name;
        }
    };

    $scope.resetForm = function () {
        $scope.user = {
            name: "",
            age: null,
            genre: "",
            platforms: {},
            playtime: ""
        };
        $scope.result = "";
    };
});
