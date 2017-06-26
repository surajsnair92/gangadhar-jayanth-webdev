(function () {
    angular
        .module("project")
        .controller("searchController", searchController);

    function searchController($http, $location, homeService,userService, currentUser) {
        var model = this;
        model.search = search;
        model.selectedMovie = selectedMovie;
        model.login = login;
        model.register = register;
        model.generateUrl = generateUrl;

        function register(user) {
            // console.log(user);
            if (user.password !== user.password2){
                model.uerror = "Sorry, the passwords do not match";
                return
            }
            if (typeof user.username === "undefined"){
                model.uerror = "Please enter a valid username";
                return
            }
            userService
                .findUserByUsername(user.username)
                .then(function (user) {
                    // console.log(user);
                    model.uerror = "Sorry, that username is taken!";
                }, function (err) {
                    userService
                        .register(user)
                        .then(function (data) {
                            $location.url('/user/profile');
                        })
                });
        }

        function login(user) {
            userService
                .login(user.username, user.password)
                .then(function (found) {
                    if (found!== null){
                        $location.url('/user/profile');
                    }
                    else{

                        model.message = "Sorry, " + user.username + " not found.Please try again!"
                    }
                },function (){
                    model.message = "Sorry, " + user.username + " not found.Please try again!"
                });
        }

        function search(text) {
            homeService
                .findMovieByTitle(text)
                .then(function(movies){
                        model.movies = movies;
                    }
                )
        }

        function selectedMovie(id) {
            $location.url("/user/movie/"+id);
        }

        function generateUrl(path) {
            var url = "http://image.tmdb.org/t/p/w185"+path;
            return url;
        }
    }

})();