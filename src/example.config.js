/* config vars must be global */

//API      = "" //moved to deployment.environments.json;
//MIXPANEL = "" //moved to deployment.environments.json;

Options = {
  theme: "light",
  multimarkets: [
    {
      "base": {"currency": "BTC", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"},
      "counter": {"currency": "XRP"}
    },
    {
      "base": {"currency": "EMN", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"},
      "counter": {"currency": "XRP"}
    },
    {
      "base": {"currency": "XRP"},
      "counter": {"currency": "ETH", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"}
    },
    {
      "base": {"currency": "EMN", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"},
      "counter": {"currency": "ETH", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"}
    },
    {
      "base": {"currency": "BTC", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"},
      "counter": {"currency": "ETH", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"}
    },
    {
      "base": {"currency": "BCH", "issuer": "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"},
      "counter": {"currency": "XRP"}
    }
  ],
  base: {currency: "BTC", issuer: "rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8"},
  trade: {currency: "XRP", issuer: ""},
//  chartType : "line",
//  interval  : "15m",
//  range     : {name: "1d"},

  ripple: {
//    "server": "wss://s1.ripple.com:443"
//    "server": "wss://s-west.zvi.io:7107",
    "server": "wss://s-east.zvi.io:7107"
  },
  domain: 'zvi.io',
  native_currency: 'ZVI',
  native_currency_name: 'Zvi',
  conversions: [
    {original: 'XSD', translated: 'XSDR'},
    {original: 'XIM', translated: 'XIMM'}
  ],
  translateCoin: function (coin) {
    if(typeof native_currency === 'undefined' || typeof native_currency_name === 'undefined') {
      native_currency = Options.native_currency;
      native_currency_name = Options.native_currency_name;
    }
    switch (coin) {
      case 'XRP':
      case 'ripple':
        return native_currency;
      case 'XRP - Ripples':
        return native_currency + " - " + native_currency + "s";
      default:
        if (coin && typeof coin === 'string') {
          if (coin.indexOf('XRP') !== -1) {
            coin = coin.replace(/XRP/g, native_currency);
            return coin;
          }
          // Convert all coins to their longer currency codes
          var conv = Options.conversions;
          if (conv && conv.length > 0) {
            for (var i = 0; i < conv.length; i++) {
              if (coin.indexOf(conv[i].translated) === -1 && coin.indexOf(conv[i].original) !== -1) {
                coin = coin.replace(new RegExp(conv[i].original, "g"), conv[i].translated)
              }
            }
          }
        }
        return coin;
    }
  },
  translateBack: function (coin) {
    if(typeof native_currency === 'undefined' || typeof native_currency_name === 'undefined') {
      native_currency = Options.native_currency;
      native_currency_name = Options.native_currency_name;
    }
    switch (coin) {
      case native_currency:
      case native_currency_name:
        return 'XRP';
      case native_currency + ' - ' + native_currency + 's':
        return 'XRP - Ripples';
      default:
        if (coin && typeof coin === 'string') {
          if (coin.indexOf(native_currency) !== -1) {
            coin = coin.replace(new RegExp(native_currency, "g"), 'XRP');
            return coin;
          }
          // Convert all coins to their longer currency codes
          var conv = Options.conversions;
          if (conv && conv.length > 0) {
            for (var i = 0; i < conv.length; i++) {
              if (coin.indexOf(conv[i].translated) !== -1) {
                coin = coin.replace(new RegExp(conv[i].translated, "g"), conv[i].original)
              }
            }
          }
        }
        return coin;
    }
  }
}
if(typeof store !== 'undefined'){
  store.set("multimarkets", Options.multimarkets)
}
