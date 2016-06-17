var app = angular.module("BlogApp", 
	['ngRoute',
	 'ng-token-auth',
	 'ngStorage',
	 'services',
	 'controllers']);
app.config(function($routeProvider, $authProvider){
	$authProvider.configure({
		omniauthWindowType: 'newWindow'
    });
	$routeProvider.
		when('/',{
			redirectTo: '/posts'

		}).when('/posts',{
			templateUrl: 'templates/list_posts.html',
			controller: 'ListPostCtrl',
			controllerAs: 'ctrl'
		}).when('/create_post',{
			templateUrl: 'templates/create_post.html',
			controller:'NewPostCtrl',
			controllerAs: 'ctrl',
			resolve: {
	          auth: function($auth,$location) {
	            return $auth.validateUser().catch(function(res) {$location.url('/login');});;
	          }
	        }
		}).when('/posts/:id',{
			templateUrl: 'templates/show_post.html',
			controller: 'ShowPostCtrl',
			controllerAs: 'ctrl'
		}).when('/create_account',{
			templateUrl: 'templates/create_account.html',
			controller: 'CreateAccountCtrl',
			controllerAs: 'ctrl'
		}).when('/login',{
			templateUrl: 'templates/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'ctrl'
		})
});