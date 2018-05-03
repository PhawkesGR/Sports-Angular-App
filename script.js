angular.module('sportsApp', []).controller('mainController', function ($scope, $http, $filter) {

  //get current year
  var today = new Date();
  var yyyy = today.getFullYear();
  
  $scope.show = false;
  $scope.image = false;
  var age;
  
  //call API
  $http({
    method: 'GET',
    url: 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=West',
    data: $scope.data
  }).then(function successCallback(response) {
      console.log(response.data.player);
     
      $scope.myData = {};
      $scope.myData.players = response.data.player;
      console.log($scope.myData.players);
      //when a player's name is clicked, show the details
      $scope.myData.playerClick = function(player) {
          //parse the year the player was born and substract from current year to find age
          age = parseInt(player.dateBorn);
          $scope.age = yyyy-age;
          $scope.description = player.strDescriptionEN;
          $scope.name = player.strPlayer;
          $scope.photo = player.strThumb;
          //json is not complete for all players, so precautions just in case something is empty
          if($scope.description==null){
            $scope.description= "No description available";
          }
          if($scope.photo==null){
            $scope.image == true;
          }
          $scope.show = true;

          
      }

      //make favorite
      var favs =[];
      $scope.myData.makeFav = function(){
        // $scope.myData.favorites.push(player);
        if(!favs.includes($scope.name)){
          console.log($scope.name);
          favs.push($scope.name);
          $scope.myData.favorites = favs;
        }
      }

      //unfavorite
      $scope.myData.unFav = function(){
        favs.pop($scope.name);
      }

  }, function errorCallback(response) {

  });

  
  


  
})