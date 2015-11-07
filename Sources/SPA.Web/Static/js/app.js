(function () {
    var app = angular.module('newsfeed', ['ngSanitize']);

    app.directive('scroll', function () {
        return {
            restrict: 'A',
            link: function ($scope, elem, attr, ctrl) {
                $(window).bind('scroll', function () {
                    var el = $("article[data-article='" + $scope.selectedArticle + "']");
                    if ($(el).position() === undefined) return;

                    var scrollTop = $(window).scrollTop();
                    var articleTop = $(el).position().top;
                    var articleHeight = $(el).outerHeight();

                    $scope.readPercent = ((scrollTop - articleTop) / articleHeight) * 100;

                    if (!$scope.clickScrolling) {
                        if ($scope.readPercent > 100) {
                            $scope.selectedArticle = $scope.selectedArticle + 1;
                        } else if ($scope.readPercent < 0) {
                            $scope.selectedArticle = $scope.selectedArticle - 1;
                        }
                    }

                    $scope.$apply();
                });
            }
        }
    });

    app.controller('NewsFeedController', [
        '$scope', '$http', '$log', '$q', '$timeout', function ($scope, $http, $log, $q, $timeout) {

            var init = function () {
                $scope.articles = [];
                $scope.readPercent = 0;
                $scope.selectedArticle = 0;
                $scope.clickScrolling = false;

                $scope.loadArticles();
            }

            $scope.getReadPercent = function () {
                return $scope.readPercent;
            }

            $scope.isSelected = function (index) {
                if ($scope.selectedArticle == index) return 'on';
                else return 'off';
            }

            $scope.selectArticle = function (index) {
                $scope.selectedArticle = index;

                $scope.clickScrolling = true;
                var el = $("article[data-article='" + index + "']");
                $("body").animate({ scrollTop: el.offset().top + 1 }, "slow").promise().done(function () { $scope.clickScrolling = false });
                
            }

            $scope.loadArticles = function () {
                $http.get('/articleapi/articles').success(function (data) {
                    $scope.articles = data;
                }).error(function (data) {
                });
            }


            init();
        }]);
})();