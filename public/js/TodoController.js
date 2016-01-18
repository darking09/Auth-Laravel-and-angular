 
/**
 * Created by andrea.terzani on 13/07/2015.
 */
/**
 * Created by andrea.terzani on 13/07/2015.
 */
 
app.controller('TodoController',  function($state,$http,$rootScope, $scope,$auth) {
 
    $scope.todos=[];
    $scope.newTodo={};
 
    $scope.init = function (){
 
        $http.get('http://localhost/authTodo/public/api/todo').then(function(data){

            if($rootScope.currentUser === undefined){
                $http.get('http://localhost/authTodo/public/api/authenticate/user').
                then(function(response) {
                    $rootScope.currentUser = response.data.user;
                    $scope.todos=data.data;
                });
            }
            
        }, function(error){
            $state.go('login');
        })
    };
 
    $scope.save = function(){
        $http.post('http://localhost/authTodo/public/api/todo',$scope.newTodo).success(function (data) {
            $scope.todos.push(data);
            $scope.newTodo={};
        });
    };
 
    $scope.update = function(index){
         $http.put('http://localhost/authTodo/public/api/todo/'+ $scope.todos[index].id,$scope.todos[index]);
    };
 
    $scope.delete = function(index){
         $http.delete('http://localhost/authTodo/public/api/todo/'+ $scope.todos[index].id).success(function(){
             $scope.todos.splice(index,1);
         });
    };
 
    $scope.logout = function() {
        $auth.logout().then(function() {
             $rootScope.currentUser = null;
             $state.go('login');
        });
    }
 
    $scope.init();
 
});