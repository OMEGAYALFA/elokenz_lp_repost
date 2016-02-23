var app = angular.module('elokenz', ['restangular']);
var wrapper = document.getElementById("wrapper");
var user_id = wrapper.getAttribute("data-author_id"); 
var token = wrapper.getAttribute("data-token");
var now = new Date().getTime()

// Using RestangularProvider we can configure properties. To check all properties go to https://github.com/mgonto/restangular
app.config(function(RestangularProvider) {
    
    RestangularProvider.setBaseUrl('http://127.0.0.1:8030/');
    // Added for Django compatibility with trailing slashes : 
    // https://github.com/mgonto/restangular/issues/90
    RestangularProvider.setRequestSuffix('/');
    //RestangularProvider.setDefaultRequestParams({ts:now});
    RestangularProvider.setDefaultHeaders({Authorization: "Token " + token});
});
 
angular.module('elokenz').controller('MainCtrl', function($scope,  Restangular) {
    Restangular.setDefaultRequestParams({});
    // The base URL for all author
    var all_authors = Restangular.all('users');  
    var base_author = Restangular.one("users",user_id);  
    $scope.message = "Angular recu";
    //all_authors.get(user_id).then(function(author) {
    Restangular.one("users", user_id).get().then(function(user) {
        $scope.author = user;
    }, function(response){
        console.log(response);
    }); // End get author
});
 
 
angular.module('elokenz').controller('ArticleCtrl', function($scope,  Restangular) {
    Restangular.setDefaultRequestParams({});
    // The base URL for all articles;  
    var base_author = Restangular.one("users",user_id).all("articles");  
    var all_authors = Restangular.all('users');  
    
    // Get articles {
    base_author.getList().then(function(articles) {
        $scope.articles = articles;
        
        // Retrieve tags
        angular.forEach($scope.articles , function(article, key) {
        console.log(key + ': ' + article.id);
        Restangular.one("users",user_id).one("articles",article.id).all("tags").getList().then(function(tags) {
            console.log(tags);
            $scope.articles[key].tags = tags
        });
    });
    
    
    }, function(response){
        console.log(response);
    }); // End get articles
    
    // Get user details {
    all_authors.get(user_id).then(function(user) {
        $scope.user = user;
        
    }, function(response){
        console.log(response);
    }); // End get user detail
    
    // Posting single url
    $scope.registerUser=function(){
        console.log($scope.article.url);
        var article = {"url" : $scope.article.url};
        
        Restangular.all("pages").post(article).then(function(postedArticle) {
            console.log("Success");
            console.log(postedArticle);
            // Associate the user and the article
            Restangular.one("users",user_id).one("articles", postedArticle.id).all("tags").post({}).then(function(tags) {
                // Add the new article to the scope for other treatments
                var tempArticles = $scope.articles.concat(postedArticle); // Might contain one duplicate
                $scope.articles = _.uniq(tempArticles, 'id');
            });
        })
        
    }; // end posting
    
    
});

