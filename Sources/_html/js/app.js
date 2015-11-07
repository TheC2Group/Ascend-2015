(function() {
	var app = angular.module('newsfeed', []);
	
	app.controller('NewsFeedController', function() {
		this.articles = articles;
		
		this.selectArticle = function(id) {
			this.status = 'on';
		}
	});
	
	
	
	var articles = [
		{
			id: 10,
			headline: "America’s Immigration Policy Needs Less Emotion and More Reason",
			author: "Douglas S. Massey / Zocalo Public Square",
			datetime: 1445288685000,
			heroimage: "https://unsplash.it/960/540/?image=500",
			thumbnail: "https://unsplash.it/50/50/?image=500",
			body: "Lorem Ipsum"
		},
		{
			id: 20,
			status: 'off',
			headline: "See What's Inside Apple's iPhone 6s",
			author: "Mike Simmons / Engadget",
			datetime: 1445288685000,
			heroimage: "https://unsplash.it/960/540/?image=501",
			thumbnail: "https://unsplash.it/50/50/?image=501",
			body: "Lorem Ipsum Elsor"
		}
	];
})();