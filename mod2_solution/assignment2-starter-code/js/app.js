(function () {
  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController",ToBuyController)
  .controller("AlreadyBoughtController",AlreadyBoughtController)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var BuyCtrl = this;

    BuyCtrl.items = ShoppingListCheckOffService.get_items_to_buy();

    BuyCtrl.remove_item = function (itemIndex){
      ShoppingListCheckOffService.check_bought(itemIndex);
    };
  };

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var BoughtCtrl = this;

    BoughtCtrl.items = ShoppingListCheckOffService.get_items_bought();
  };

  function ShoppingListCheckOffService() {
    var service = this;

    var items_to_buy = [
      {
        item_name : "Milk",
        item_quantity: 3
      },
      {
        item_name : "Cookies",
        item_quantity: 4
      },
      {
        item_name : "Bread",
        item_quantity: 5
      },
      {
        item_name : "Flour",
        item_quantity: 2
      },
      {
        item_name : "Rice",
        item_quantity: 1
      }
    ];
    var items_bought = [];

    service.check_bought = function(itemIndex) {
      items_bought.push(items_to_buy[itemIndex]);
      items_to_buy.splice(itemIndex,1);
    };

    service.get_items_to_buy = function () {
      return items_to_buy;
    };

    service.get_items_bought = function () {
      return items_bought;
    };
  };
})();
