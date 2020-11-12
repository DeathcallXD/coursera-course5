(function () {
'use strict';

angular.module("App", []).controller("Controller", Controller);
Controller.$inject = ["$scope", "$filter"];

function Controller($scope, $filter){
$scope.name = "";
$scope.message = "";
$scope.checkComma = function (){
  var no_comma = 0;
  for(var i = 0; i < $scope.name.length; i++){
    if($scope.name.charCodeAt(i) == 44) {
      no_comma++;
    }
  }
  if(no_comma > 2) {
    $scope.message = "Too much!";
  }
  else if(no_comma <= 2) {
    $scope.message = "Enjoy!";
  }
}
}
})();
