var appCtrls = angular.module("controllers", []);

appCtrls.controller("MainCtrl",['$location','User',function($location, User){
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
}]);

appCtrls.controller("ListPostCtrl",['Post', function(Post){
	var self = this;
	init();
	function init(){
		Post.query().then(function(resp){
			self.posts = resp.data;
		});
	}
}]);

appCtrls.controller("ShowPostCtrl",['Post','Comment','$routeParams', function(Post,Comment,$routeParams){
	var self = this;
	init();
	function init(){
		self.comment = {};
		Post.get($routeParams.id).then(function(resp){
			self.post = resp.data;
		});
		Comment.query($routeParams.id).then(function(resp){
			self.comments = resp.data;
		});
	}
	self.sendComment = function(comment){
		Comment.save(comment,$routeParams.id)
			.then(function(resp){
				self.comments.push(resp.data);
				self.comment = {};
			},function(resp){
				alert("Your comment could not be sent. =(");
			});
	};
}]);

appCtrls.controller("NewPostCtrl", ['Post','$location','$timeout', function(Post,$location,$timeout){
	var self = this;
	self.post = {};
	self.createPost = function(post){
		Post.save(post).then(function(resp){
			self.message = "The post was saved successfully";
			self.post = {};
		},function(resp){
			self.message = "The post was not saved.";
			console.error(resp);
		});
	};
}]);
appCtrls.controller("LoginCtrl",['$location','User', function($location,User){
	var self = this;
	self.login = function(user) {
      User.doLogin(user).then(function(res){
      	$location.url("posts");
      }).catch(function(res){
      	self.error_message = res.errors[0];
      });
    };
}]);
appCtrls.controller("CreateAccountCtrl", ['$location','User', function($location,User){
	var self = this;
	self.registrationForm={};
	self.createAccount = function(registrationForm){
		 User.registerUser(registrationForm)
	        .then(function(resp) {
	          $location.url("login")
	        })
	        .catch(function(resp) {
	          console.error(resp);
	        });
	};
}]);
