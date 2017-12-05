app.controller('stockController', function($scope, $http, $cookies){

  $scope.categories = [];
  $scope.objects = [];

$http.post(API + "/stock/getCategory", {'token' : $cookies.get('token'), 'caserne_id' : CASERNE})
.then(function (res)
{


  angular.forEach(unique(res.data.categorie), function(value, key) {
    if (value.length > 0)
    {
      $http.post(API + "/stock/getObjectByCategory", {'token' : $cookies.get('token'), 'caserne_id' : CASERNE, 'category' : value})
      .then(function(obj){
        console.log(obj);

        for (var i = 0; i < obj.data.size; i++)
          $scope.objects.push({'name' : obj.data.object_name[i], 'qty' : obj.data.quantity[i], 'cat' : value, 'id' : obj.data.object_id, 'max' : obj.data.stock_total[0]});
      });
    }
  });
});

console.log($scope.objects);


});
