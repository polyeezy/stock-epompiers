var app = angular.module("app", ['ngRoute', 'ngCookies']);

var API  = "http://149.202.208.117:8081",
    CASERNE = "57d00c1abec251c2308a399e";


    var unique = function(origArr) {
        var newArr = [],
            origLen = origArr.length,
            found, x, y;

        for (x = 0; x < origLen; x++) {
            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x] === newArr[y]) {
                    found = true;
                    break;
                }
            }
            if (!found && origArr[x].length > 0) {
                newArr.push(origArr[x]);
            }
        }
        return newArr;
    }

    app.filter('searchFor', function(){
        return function(arr, searchString){
            if(!searchString){
                return arr;
            }
            var result = [];
            searchString = searchString.toLowerCase();
            angular.forEach(arr, function(item){
                if(item.name.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
            });
            return result;
        };
    });

app.config(function($routeProvider) {
    $routeProvider
    .when("/",
    {
      templateUrl   : "templates/inAndOut.tpl.htm",
      controller    : "inAndOutObjController"
    })

    .when("/categories",
    {
      templateUrl   : "templates/categories.tpl.htm",
      controller    : "categoriesController"
    })

    .when("/enregister-objet",
    {
      templateUrl   : "templates/registerObj.tpl.htm",
      controller    : "registerObjController",
    })

    .when("/entrees-sorties",
    {
      templateUrl   : "templates/inAndOut.tpl.htm",
      controller    : "inAndOutObjController",
    })

    .when("/historique",
    {
      templateUrl   : "templates/historique.tpl.htm",
      controller    : "historiqueController",
    })


        .when("/stock",
        {
          templateUrl   : "templates/stock.tpl.htm",
          controller    : "stockController",
        })


    .otherwise({templateUrl: 'templates/404.tpl.htm'});
});
