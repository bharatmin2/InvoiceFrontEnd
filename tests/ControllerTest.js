// Suite
describe('Testing controller', function() {

  beforeEach(module('invoicing'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  // Test (spec)
  it('should say \'currency\'', function() {
    var $scope = {};
    // $controller takes an object containing a reference to the $scope
    var controller = $controller('InvoiceCtrl', { $scope: $scope });
    // the assertion checks the expected result
    expect($scope.currencySymbol).toEqual('$');
  });

  
  it('should show date', function() {
   var $scope = {};
   var controller = $controller('InvoiceCtrl', { $scope: $scope }); 
   var date =  new Date();
   expect($scope.invoice.customer_info.date).toEqual(date);
  });

  it('should have default rate', function() {
   var $scope = {};
   var controller = $controller('InvoiceCtrl', { $scope: $scope });
   expect($scope.invoice.tax).toEqual(13.00);
  });

  // ... Other tests here ...


});
