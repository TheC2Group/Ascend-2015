(function () {
    var app = angular.module('newsfeed', ['ngSanitize']);

    app.controller('NewsFeedController', [
        '$scope', function ($scope) {

            var init = function () {
                $scope.articles = [];
                $scope.readPercent = 0;
                $scope.selectedArticle = 0;

                $scope.loadArticles();
            }

            $scope.getReadPerecent = function () {
                return $scope.readPercent;
            }

            $scope.isSelected = function (index) {
                if ($scope.selectedArticle == index) return 'on';
                else return 'off';
            }

            $scope.selectArticle = function (index) {
                $scope.selectedArticle = index;
                var el = $("article[data-article='" + index + "']");
                $("body").animate({ scrollTop: el.offset().top + 1 }, "slow");
                
            }

            $scope.loadArticles = function () {
                // web api request here
                $scope.articles = articles;
                
            }


            init();
        }]);

    var articles = [
        {
            headline: 'Article 1',
            author: 'Jon Price',
            thumbnail: { path: '/img/thumb/src' },
            image: { path: '/img/src' },
            dateTime: '11/12/2015',
            mainBody: '<em>main body for article 1</em>'
        },
        {
            headline: 'Article 2',
            author: 'Jon Price',
            thumbnail: { path: '/img/thumb/src' },
            image: { path: '/img/src' },
            dateTime: '11/5/2015',
            mainBody: '<em>main body for article 2</em>'
        },
    ];
})();