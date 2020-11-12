(function () {
  angular.module("MenuApp")
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "templates/home.template.html"
    })
    .state('categories', {
      url: '/categories',
      templateUrl: "templates/menuapp-categories.template.html",
      controller: 'CategoriesController as catCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('items', {
      url: '/categories/{itemCategory}',
      templateUrl: "templates/menuapp-items.template.html",
      controller: 'ItemsController as itemCtrl',
      resolve: {
        items: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.itemCategory);
        }]
      },
      params:{
        itemCategory: null
      }
    });
  }
})();
