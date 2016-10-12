var gaApp = angular.module('gaApp', ['ngRoute','ngAnimate']);

gaApp.config(['$routeProvider',function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })
            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })
            // route for the data page
            .when('/data', {
                templateUrl : 'pages/table.html',
                controller  : 'tabController'
            })
            .when('/tabData', {
                templateUrl : 'pages/tabData.html',
                controller  : 'tableDController'
            });
    }]);
gaApp.directive("repeatEnd", function(){
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    if (scope.$last) {
                        scope.$eval(attrs.repeatEnd);
                    }
                }
            };
        });
gaApp.directive('allowPattern', [allowPatternDirective]);
function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function(tElement, tAttrs) {
            return function(scope, element, attrs) {
        // I handle key events
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

          // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
            event.preventDefault();
                        return false;
                    }

                });
            };
        }
    };
} 
gaApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.pageClass = 'page-home';
}]);

gaApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';
});

gaApp.controller('tabController',function($scope,$http){
    $http.get("api/getTables").success(function(response){ 
        $scope.tables = response;  
    }); 
    var progress = 0;
    $scope.colS =function(){
        if(progress < 5){
          progress++;
          $http.get("api/getTablesC?col="+$scope.search).success(function(response){ 
            $scope.tables = response;
            progress--;
          }).error(function(){progress = 0});  
        } 
    }
});
gaApp.controller('tableDController',function($scope,$http,$routeParams,$timeout ){
    var tabName = $routeParams.tab;
    var from = $routeParams.from;
    if(typeof(from) === "undefined" || from == null || from === ''){
        from=0
    }
    $scope.loading=true;
    var to = parseInt(from)+100;
    $scope.tabName = tabName;    
    if(typeof(tabName)!== "undefined"){
        $http.get("api/getData?tab="+tabName+"&from="+from+"&to=100").success(function(response){
        $scope.headers = response.data[1];
        $scope.tabData = response.data;
        $scope.totRecords = response.totalRecords;
        $scope.from = response.from;
        $scope.to = parseInt(response.from) + parseInt(response.fecthedRecords);
    }).error(function(){
            $scope.loading=false;
        });
    var table = null;
    $scope.onEnd = function(){
                $timeout(function(){
                 table  =  $( "#tabData" ).DataTable({
                        "scrollY": 300,
                        "scrollX": true,
                        "paging":false
                       // "repsonsive":true
                    });
                    $scope.loading=false;
                }, 1);
            };
    }else{
        $scope.loading=false;
    };
    $http.get("api/getTables").success(function(response){ 
        $scope.tables = response;  //ajax request to fetch data into $scope.data
    });
    var button = angular.element(document.getElementsByClassName('offTabOpen'));
    var menu = angular.element(document.getElementsByClassName('offTab'));
    var overlay = angular.element(document.getElementsByClassName('overlay'));
    $scope.toggleMenu =function(){
        button.toggleClass('op');
        menu.toggleClass('open');
        overlay.toggleClass('oHide');
    };  
    var progress = 0;
    $scope.colS =function(){
        if(progress < 5){
          progress++;
          $http.get("api/getTablesC?col="+$scope.search).success(function(response){ 
            $scope.tables = response;
            progress--;
          }).error(function(){progress = 0});  
        } 
    }
});
