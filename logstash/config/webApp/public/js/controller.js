var gaApp = angular.module('gaApp', ['ngRoute','ngAnimate']);

gaApp.config(['$routeProvider',function($routeProvider) {
        $routeProvider
            // routes
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })
            .when('/detailsPage', {
                templateUrl : 'pages/detailsPage.html',
                controller  : 'detailsPage'
            })
            .when('/about', {
                    templateUrl : 'pages/About.html',
                    controller  : 'aboutPage'
            })
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

gaApp.controller('detailsPage', ['$scope', '$http', function($scope, $http) {
    $scope.model = {}
    $scope.pageClass = 'page-detailsPage';
    $scope.tabber = function(id,$event){
        $event.preventDefault();
        $(".tab-pane").removeClass("active");
        $("#"+id).addClass('active');
    } 
    $scope.submit = function(id,$event){
        $event.preventDefault();
        var data=$scope.model; 
        $http.post('/startLogstash', data)
            .success(function(res){console.log(res)})
            .error(function(){ alert("Error occured, try again.")});
    }
}]);
