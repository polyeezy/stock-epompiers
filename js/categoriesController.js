app.controller('categoriesController', function($scope, $http)
{

  $http.post(API + "/stock/getCategory", {'token' : "3403b2560fc9adea3cb6d2bf7001d580733b23407d19966cfc68a1c44945774f70427c1b9d7443ba64e3646da34952a49cd328cef295c31a99f0f7f4688bf6b0", 'caserne_id' : CASERNE}).then(function (res){


  });
});
