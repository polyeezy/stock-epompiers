app.controller('inAndOutObjController', function($scope, $http, $cookies, $window){

$scope.activeTab = "in";
$scope.preload = false;

$scope.sendToast = function(value, Class = "green")
{
  Materialize.toast(value, 4000, Class) // 4000 is the duration of the toast
}

$scope.setFocus = function ()
{
  var element = $window.document.getElementById("inOutInput");
  if(element)
     element.focus();
}

$scope.changeValue = function (value)
{
  $scope.state = value;
}

$scope.setActive = function(elem)
{
  $scope.activeTab = elem;
  $scope.infoDiv = false;
}

$scope.setFocus();


$scope.send = function()
{
  $scope.activeTab = $scope.activeTab;
  $scope.preload = true;

  switch ($scope.activeTab) {

    case "in":
      $http.post(API + "/stock/crementStock", {'token' : $cookies.get('token'), 'caserne_id' : CASERNE, 'object_id' : $scope.code, 'quantity' : 1})
      .then(function(res){
        console.log(res);
        $scope.ok = res.status;
        $scope.name = res.data.object_name;
        $scope.CountNew = res.data.quantity;
        if (res.data){

          if (res.data.res){
              $scope.sendToast(res.data.response, 'red', 'green');
          }else{
              $scope.sendToast(res.data.response, 'red', 'red');

          }


        }
      },
      function (res){
        $scope.sendToast('L\'objet n\'existe pas.', "red");
      });

    $scope.preload = false;
    break;

    case "out":

    $http.post(API + "/stock/crementStock", {'token' : $cookies.get('token'), 'caserne_id' : CASERNE, 'object_id' : $scope.code, 'quantity' : -1})
    .then(function(res){
      $scope.name = res.data.object_name;
      $scope.CountNew = res.data.quantity;
      $scope.preload = false;
        if (res.data.res){
            $scope.sendToast(res.data.response, 'red', 'green');
        }else{
            $scope.sendToast(res.data.response, 'red', 'red');

        }    }, function(res)
    {
      $scope.sendToast('L\'objet n\'existe pas.', "red");
    });

    $scope.preload = false;

    break;
    case "info":
    $scope.infoDiv = false;

    $http.post(API + "/stock/getObjectInfo", {'token' : $cookies.get('token'), 'caserne_id' : CASERNE, 'object_id' : $scope.code})
    .then(function(res){

      $scope.name = res.data.response.object_name;
      $scope.CountNew = res.data.response.quantity;
      $scope.info = res.data.response;
      $scope.infoDiv = true;
      $scope.res = true;

    }, function(res)
    {
      $scope.sendToast('L\'object n‘existe pas ', "red");
    });
    $scope.preload = false;
    break;
  }
  }
});
