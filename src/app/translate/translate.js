angular.module('ripplecharts.translate', [
    'ui.state'
])
.factory('native_currency', function() {
    return  Options.native_currency
})
.factory('native_currency_name', function() {
    return  Options.native_currency_name
})
.factory('translateCoin', function(native_currency, native_currency_name) {
    return  Options.translateCoin
})
.factory('translateBack', function(native_currency, native_currency_name) {
    return  Options.translateBack
})
.filter('translateCoinsFilter', function (translateCoin) {
    return function (coins) {
        var translated_coins = [];
        angular.forEach(coins, function (coin) {
            translated_coins.push(translateCoin(coin));
        });
        // console.log("Coin: " + coins);
        return translated_coins;
    }
})



// .directive('translateCoins', function() {
//     return {
//         restrict: 'A',
//         require: '?ngModel',
//         link: function(scope, elm, attrs, ngModel) {
//             // Translate for view only
//             ngModel.$formatters.unshift(function(coin) {
//                 if(coin){
//                     console.log("Original Coin: " + coin);
//                     var translated = scope.translateCoin(coin);
//                     console.log("Formatted Coin: " + translated);
//                     return translated;
//                 }
//             });
//             // Translate back for model only
//             ngModel.$parsers.unshift(function(coin) {
//                 if(coin){
//                     console.log("Original View Coin: " + coin);
//                     var translated = scope.translateBack(coin);
//                     console.log("Translated Back Coin: " + translated);
//                     return translated;
//                 }
//             });
//         }
//     };
// })