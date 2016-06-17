var appServ = angular.module('services',[]);
appServ.factory('User', ['$auth','$localStorage','$q',function($auth,$localStorage,$q) {
   	var factory = {};
   	factory.doLogin = function(credentials){
   		return $auth.submitLogin(credentials)
		        .then(function(resp) {
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
   		return $auth.authenticate('google',{params: {resource_class: 'User'}}) 
	   			.then(function(resp) {
		           console.log(resp);
		           $localStorage._blog_user=resp;
		        });
   	};
    factory.registerUser = function(user){
      user.password_confirmation = user.password;
      return $auth.submitRegistration(user);
    };
   	factory.invalidateSession = function(){
   		delete $localStorage._blog_user;
   	};
   	factory.getUser = function () {
      return $localStorage._blog_user;
    };  
   return factory;
}]); 

appServ.factory('Post', ['$http', function($http){
  var factory = {};
  factory.query = function(){
    return $http.get('/api/posts');
  };
  factory.get = function(id){
    return $http.get('/api/posts/'+id);
  };
  factory.save = function(post){
    return $http.post('/api/posts',{post:post});
  };
  return factory;
}]);

appServ.factory('Comment', ['$http', function($http){
  var factory = {};
  factory.query = function(post_id){
    return $http.get('/api/posts/'+post_id+'/comments');
  };
  factory.save = function(comment, post_id){
    return $http.post('/api/posts/'+post_id+'/comments',{comment: comment});
  };
  return factory;
}])

