var app = angular.module("BlogApp", ['ngRoute','ng-token-auth','ngStorage']);
app.config(function($routeProvider, $authProvider){
	$authProvider.configure({
      authProviderPaths: {
        google: '/auth/google' 
      }
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

app.factory('User', ['$auth','$localStorage','$q',function($auth,$localStorage,$q) {
   	var factory = {};
   	factory.doLogin = function(credentials){
   		return $auth.submitLogin(credentials)
		        .then(function(resp) {
		           console.log(resp);
		           $localStorage._blog_user=resp;
		        });
   	};
   	factory.doLogout = function(){
   		return  $q(function(resolve, reject) {
    				$auth.signOut().then(function(){
    					delete $localStorage._blog_user;
    					resolve();
    				}).catch(function(res){
    					reject(res);
    				});
  				});
   	};
   	factory.doLoginWithProvider = function(){
   		$auth.authenticate('google',{params: {resource_class: 'User'}}) 
   			.then(function(resp) {
	           console.log(resp);
	           $localStorage._blog_user=resp;
	        });
   	};
   	factory.invalidateSession = function(){
   		delete $localStorage._blog_user;
   	};
   	factory.getUser = function () {
      return $localStorage._blog_user;
    };  
   return factory;
}]); 

app.controller("MainCtrl",['$location', '$auth','User',function($location, $auth,User){
	var self = this;

	self.logout = function(){
		User.doLogout().then(function(resp) {
          $location.url("login");
        }, function(res){
        	console.log("Could not log out",res);
        });
	};
	self.login = function(){
		User.doLoginWithProvider().then(function(res){
	      	$location.url("posts");
	      }).catch(function(res){
	      	
	      });
	};
	self.isLoggedIn = function(){
		return User.getUser() != undefined;
	};
	console.log("User logged in ",self.isLoggedIn());
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
			self.post = {};
			$timeout(function(){$location.url('posts')},3000);
		},function(resp){
			self.message = "The post was not saved.";
			console.error(resp);
		});
	};
}]);
app.controller("LoginCtrl",['$auth','$location','User', function($auth,$location,User){
	var self = this;
	self.login = function(user) {
      User.doLogin(user).then(function(res){
      	$location.url("posts");
      }).catch(function(res){
      	self.error_message = res.errors[0];
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
