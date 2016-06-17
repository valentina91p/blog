var app = angular.module("BlogApp", ['ngRoute','ng-token-auth','ngStorage']);
app.config(function($routeProvider){
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

app.factory('User', ['$auth',function($auth) {
	var factory = {};
	var authenticatedUser = undefined;
	factory.setUser = function(user){
	   	authenticatedUser = user;
	};
   	factory.getUser = function (user) {
    	return authenticatedUser;  
    };
	factory.isSignIn = function(){
		return authenticatedUser != undefined;
	};
   
   return factory;
}]); 

app.controller("MainCtrl",['$location', '$auth','User','$rootScope',function($location, $auth,User,$rootScope){
	var self = this;
	self.logout = function(){
		$auth.signOut().then(function(resp) {
          $location.url("/login");
        })
        .catch(function(resp) {
          console.error(resp);
        });
	};
	
	self.loggeado = function(){
		return User.isSignIn();
	};

	$rootScope.$on('auth:login-success',function(ev, user){
		User.setUser(user);
		self.user = user;
	});
	$rootScope.$on('auth:logout-success',function(ev, user){
		User.setUser(undefined);
	});
}]);
app.controller("ListPostCtrl",['$http', function($http){
	var self = this;
	init();
	function init(){
		$http.get('/api/posts').then(function(resp){
			self.posts = resp.data;
		});
	}
}]);

app.controller("ShowPostCtrl",['$http','$routeParams', function($http,$routeParams){
	var self = this;
	init();
	function init(){
		self.comment = {};
		$http.get('/api/posts/'+$routeParams.id).then(function(resp){
			self.post = resp.data;
		});
		$http.get('/api/posts/'+$routeParams.id+'/comments').then(function(resp){
			self.comments = resp.data;
		});
	}
	self.sendComment = function(comment){
		$http.post("/api/posts/"+$routeParams.id+"/comments", {comment: comment})
			.then(function(resp){
				self.comments.push(resp.data);
				self.comment = {};
			},function(resp){
				alert("Your comment could not be sent. =(");
			});
	};
}]);

app.controller("NewPostCtrl", ['$http','$location','$timeout', function($http,$location,$timeout){
	var self = this;
	self.post = {};
	self.createPost = function(post){
		$http.post("/api/posts", {post:post}).then(function(resp){
			self.message = "The post was saved successfully";
			$timeout(function(){$location.url('posts')},5000);
		},function(resp){
			self.message = "The post was not saved.";
			console.error(resp);
		});
	};
}]);
app.controller("LoginCtrl",['$auth','$location','User', function($auth,$location,User){
	var self = this;
	self.login = function(user) {
      $auth.submitLogin(user)
        .then(function(resp) {
           console.log(resp);
           User.getUser(resp);
          $location.url("posts");
        })
        .catch(function(resp) {
           self.error_message = true;
           console.error(resp);
        });
    };
}]);
app.controller("CreateAccountCtrl", ['$location','$auth', function($location,$auth){
	var self = this;
	self.registrationForm={};
	self.createAccount = function(registrationForm){
		registrationForm.password_confirmation = registrationForm.password;
		 $auth.submitRegistration(registrationForm)
	        .then(function(resp) {
	          $location.url("login")
	        })
	        .catch(function(resp) {
	          console.error(resp);
	        });
	};
}]);
