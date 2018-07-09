angular.module('ripplecharts.translate', [
    'ui.state'
])
.value('native_currency', 'ZVI')
.value('native_currency_name', 'Zvi')
.factory('translateCoin', function(native_currency, native_currency_name) {
    return  function (coin) {
        switch(coin) {
            case 'XRP':
            case 'ripple':
                return native_currency;
            case 'XSD':
                return 'XSDR';
            case 'XRP - Ripples':
                return native_currency + " - " + native_currency + "s";
            default:
                if(coin && typeof coin === 'string'){
                    if(coin.indexOf('XRP') !== -1){
                        coin = coin.replace(/XRP/g, native_currency)
                    }
                    if(coin.indexOf('XSDR') === -1 && coin.indexOf('XSD') !== -1){
                        coin = coin.replace(/XSD/g, 'XSDR')
                    }
                }
                return coin;
        }
    };
})
.factory('translateBack', function(native_currency, native_currency_name) {
    return  function (coin) {
        switch(coin) {
            case native_currency:
            case native_currency_name:
                return 'XRP';
            case 'XSDR':
                return 'XSD';
            case native_currency + ' - ' + native_currency + 's':
                return 'XRP - Ripples';
            default:
                if(coin && typeof coin === 'string'){
                    if(coin.indexOf(native_currency) !== -1){
                        coin = coin.replace(/native_currency/g, 'XRP')
                    }
                    if(coin.indexOf('XSDR') !== -1){
                        coin = coin.replace(/XSDR/g, 'XSD')
                    }
                }
                return coin;
        }
    };
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