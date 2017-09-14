angular.module('invoicing', ["ui.bootstrap"])

// The invoice displayed when the user first uses the app
.constant('DEFAULT_INVOICE', {
  tax: 13.00,
  invoiceId: '',
  customer_info: {
    name: '',
    web_link: '',
    date: new Date(),
  },
  items:[
    { qty: 1, description: 'Tea', cost: 4.50 }
  ]
})
// Service for accessing local storage
.service('LocalStorage', [function() {

  var Service = {};

  // Checks to see if an invoice is stored
  var hasInvoice = function() {
    return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
  };

  // Returns a stored invoice (false if none is stored)
  Service.getInvoice = function() {
    if (hasInvoice()) {
      return JSON.parse(localStorage['invoice']);
    } else {
      return false;
    }
  };

  Service.setInvoice = function(invoice) {
    localStorage['invoice'] = JSON.stringify(invoice);
  };

  // Clears a stored invoice
  Service.clearinvoice = function() {
    localStorage['invoice'] = '';
  };

  return Service;

}])

// Main application controller
.controller('InvoiceCtrl', ['$scope', '$http', 'DEFAULT_INVOICE', 'LocalStorage',
  function($scope, $http, DEFAULT_INVOICE, LocalStorage) {

  // Set defaults
  $scope.currencySymbol = '$';

  (function init() {
    // Attempt to load invoice from local storage
    !function() {
      var invoice = LocalStorage.getInvoice();
      $scope.invoice = invoice ? invoice : DEFAULT_INVOICE;
    }();
  })()
  // Adds an item to the invoice's items
  $scope.addItem = function() {
    $scope.invoice.items.push({ qty:'1', cost:'0.00', description:"" });
  }

  var obj = new Object();

  $scope.saveNewInvoice = function() {
        var jsonArr = [];
        var jsonData = (LocalStorage.getInvoice());
        for (i=0;i<jsonData.items.length;i++) {
        obj.name = jsonData.customer_info.name;
        obj.email = jsonData.customer_info.web_link;
        obj.date = jsonData.customer_info.date;
        obj.description = jsonData.items[i].description;
        obj.amount = jsonData.items[i].cost * jsonData.items[i].qty;
        obj.id = jsonData.invoiceId;
        obj.item_id = i+1;
        jsonArr.push(obj);
        }
        JSON.stringify(jsonArr);
        console.log(jsonArr);
        $http.post('http://localhost:8080/SpringBootRestApi/api/invoice/', jsonArr).then(successCallback(status), errorCallback(status));
  };

  var original = angular.copy($scope.invoice);
  $scope.reset = function() {
     $scope.invoice = angular.copy(original);
  };

  successCallback = function (status) {
  LocalStorage.clearinvoice();
  $scope.reset();
  }

  errorCallback = function (status) {
      console.log(status)//do something
  }

  // Remotes an item from the invoice
  $scope.removeItem = function(item) {
    $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
  };

  // Calculates the sub total of the invoice
  $scope.invoiceSubTotal = function() {
    var total = 0.00;
    angular.forEach($scope.invoice.items, function(item, key){
      if (item.qty && item.cost)
      {
        total += (item.qty * item.cost);
      }
    });
    return total;
  };

  // Calculates the tax of the invoice
  $scope.calculateTax = function() {
    return (($scope.invoice.tax * $scope.invoiceSubTotal())/100);
  };

  // Calculates the grand total of the invoice
  $scope.calculateGrandTotal = function() {
    saveInvoice();
    return $scope.calculateTax() + $scope.invoiceSubTotal();
  };

  // Sets the current invoice to the given one
  var setInvoice = function(invoice) {
    $scope.invoice = invoice;
    saveInvoice();
  };

  // Saves the invoice in local storage
  var saveInvoice = function() {
    LocalStorage.setInvoice($scope.invoice);
  };

  var today = new Date();
  $scope.invoice.customer_info.date = new Date();
  $scope.dateFormat = 'yyyy-MM-dd';
  $scope.availableDateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      minDate: new Date(1900, 5, 22),
      maxDate: new Date(2030, 5, 22)
  };
  $scope.availableDatePopup = {
      opened: false
  };
  $scope.ChangeExpiryMinDate = function(availableDate) {
      if (availableDate != null) {
          var expiryMinDate = new Date(availableDate);
          $scope.expireDateOptions.minDate = expiryMinDate;
          $scope.ExpireDate = expiryMinDate;
      }
  };
  $scope.ChangeExpiryMinDate();
  $scope.OpenAvailableDate = function() {
      $scope.availableDatePopup.opened = !$scope.availableDatePopup.opened;
  };
  $scope.invoice.items.description = undefined;
    $scope.fruits = ['Apples', 'Apricots', 'Avacado','Banana','Blueberries','Cherries','Clementines','Cranberries','Figs','Grapes','Grapefruit',
  'Guava', 'Jackfruit', 'kiwi', 'Lemon', 'Lime', 'Mango', 'Olives', 'Orange', 'Papaya', 'Pineapple', 'Peach',
'Pear', 'Plums', 'Pomegranate', 'Rasberries', 'Strawberries', 'Tangerine', 'Watermelon'];

}]);
