(function () {
    var app = angular.module('newsfeed', ['ngSanitize', 'infinite-scroll']);

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
                $scope.pagedArticles = [];
                $scope.toc = []
                $scope.readPercent = 0;
                $scope.selectedArticle = 0;
                $scope.clickScrolling = false;

                $scope.skip = 0;
                $scope.take = 1;
                $scope.busy = false;

                $scope.loadToc();
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

                if (index >= $scope.skip) {
                    $scope.take = index - $scope.skip + 1;
                    $scope.loadMore().then(function () {
                        $timeout(function () {
                            var el = $("article[data-article='" + index + "']");
                            $scope.clickScrolling = true;
                            $("body").animate({ scrollTop: el.offset().top + 1 }, "slow").promise().done(function () { $scope.clickScrolling = false });;
                        });
                    });
                } else {
                    var el = $("article[data-article='" + index + "']");
                    $scope.clickScrolling = true;
                    $("body").animate({ scrollTop: el.offset().top + 1 }, "slow").promise().done(function () { $scope.clickScrolling = false });
                }
            }

            $scope.loadToc = function () {
                $http.get('/articleapi/article/toc').success(function (data) {
                    $scope.toc = data;
                }).error(function (data) {
                    $log.error("TOC/Index not found");
                });
            };

            $scope.loadMore = function () {
                return $q(function (resolve, reject) {
                    if ($scope.busy) return;
                    $scope.busy = true;

                    $http.get('/articleapi/articles?take=' + $scope.take + '&skip=' + $scope.skip).success(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.pagedArticles.push(data[i]);
                            $scope.skip++;

                        }
                        $scope.take = 1;
                        $scope.busy = false;
                        resolve();
                    }).error(function (data) {
                        $log.error("Unable to load article");
                        reject();
                    });
                });
            };


            init();
        }]);
})();