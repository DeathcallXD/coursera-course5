(function () {
  angular.module("MenuApp")
  .component("items",{
    templateUrl: "templates/items.template.html",
    bindings: {
      items: '<'
    }
  });
})();
