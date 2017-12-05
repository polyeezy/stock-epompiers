app.controller('registerObjController', function($scope, $http, $cookies)
{

  $scope.obj = [];
  $scope.obj.qty = 1;
  $scope.categories = [];
  $scope.preloader = true;

  $http.post(API + "/stock/getCategory", {'token' : $cookies.get('token'), 'caserne_id' : CASERNE})
  .then(function (res){
    console.log(res.data.categorie);
      $scope.categories = res.data.categorie;
      $scope.preloader = false;
      $scope.content = true;
      $scope.preloader = false;
  },
  function (err)
  {
    $scope.sendToast("Impossible de charger les categories.", "red");
  }
);


  $scope.sendToast = function(value, Class = "green")
  {
    Materialize.toast(value, 4000, Class) // 4000 is the duration of the toast
  }


  /*
    token : token
    object_id : id de l'objet
    object_name : id de l'objet
    quantity : quantite
    category : categorie
    image_url : url de l'image
    caserne_id : id de la caserne
  */

$scope.addObj = function(obj)
{
  $scope.content = false;
  $scope.preloader = true;
  var cat = "";

  if ($cookies.get('token') && obj.code && obj.name && obj.qty && CASERNE)
  {
    if (!obj.cat && obj.catInput)
      cat = obj.catInput;
    else if (obj.cat && obj.catInput)
      cat = obj.catInput;
    else
      cat = obj.cat;

      $http.post(API + "/stock/addObject", {
        'token' : $cookies.get('token'),
        'object_id' : obj.code,
        'object_name' : obj.name,
        'quantity' : obj.qty,
        'categorie' : cat,
        'image_url' : 'none',
        'caserne_id' : CASERNE
      })
      .then(function(res){
        $scope.content = true;
        console.log(res.data);
              if (res.data.res){
                  $scope.sendToast(res.data.response, 'red', 'green');
              }else{
                  $scope.sendToast(res.data.response, 'red', 'red');

              }      },
      function (res){
        $scope.sendToast("Tous les champs sont obligatoires", "red");
        $scope.content = true;

      })
    }
    else {
      $scope.sendToast("Tous les champs sont obligatoires", "red");
      $scope.content = true;

    }
}


  $scope.addQty = function()
  {
    $scope.obj.qty += 1;
  }

  $scope.removeQty = function()
  {
    $scope.obj.qty = $scope.obj.qty - 1 > 0 ? $scope.obj.qty - 1 : 1;
  }
});
