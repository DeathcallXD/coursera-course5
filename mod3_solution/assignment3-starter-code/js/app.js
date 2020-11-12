(function (){
  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "loader/itemsloaderindicator.template.html",
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: DirectiveController,
      controllerAs: 'dirCtrl',
      bindToController: true,
      link: FoundItemsDirectiveLink
    };
    return ddo;
  };

  function FoundItemsDirectiveLink(scope,element,attrs,controller){
    scope.$watch('dirCtrl.isFound()', function (newValue, oldValue) {
      if(newValue === true){
        displayLoader();
      }
      else{
        displayLoader();
      }
    });

    function displayLoader() {
      var warnElem = element.find("div.loader");
      warnElem.css('display','block');
    }
  }

  function DirectiveController(){
    var dirCtrl = this;

    dirCtrl.isFound = function () {
      if(dirCtrl.items.length == 0){
        return false;
      }
      return true;
    };
  };

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;

    ctrl.searchTerm = "";
    ctrl.items = [];
    ctrl.getItems = function(){
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      promise.then(function (response) {
        ctrl.items = response;
      });
    };
    ctrl.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(ctrl.items,itemIndex);
    };
  };

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      }).then(function (response){
        var foundItems = response.data;
        var found = [];
        for(var i = 0; i < foundItems.menu_items.length; i++){
         if(foundItems.menu_items[i].description.search(searchTerm) !== -1){
           found.push(foundItems.menu_items[i]);
          }
        }
        return found;
      });
    };

    service.removeItem = function(items,itemIndex){
      items.splice(itemIndex,1);
    };
  };
})();
