angular.module( 'ripplecharts.trade-volume', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'tradeVolume', {
    url: '/trade-volume',
    views: {
      "main": {
        controller: 'TradeVolumeCtrl',
        templateUrl: 'trade-volume/trade-volume.tpl.html'
      }
    },
    data:{ }
  });
})

.controller( 'TradeVolumeCtrl', function TradeVolumeCtrl( $scope, $location, $interval) {

  var api = new ApiHandler(API);
  var pairs = [
    {
      counter : {currency : 'BTC', issuer : 'rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8'},
      base    : {currency:'XRP'}
    },
    {
      counter : {currency : 'ETH', issuer : 'rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8'},
      base    : {currency:'XRP'}
    },
    {
      counter : {currency : 'EMN', issuer : 'rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8'},
      base    : {currency:'XRP'}
    },
    {
      counter : {currency : 'BSD', issuer : 'rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8'},
      base    : {currency:'XRP'}
    },
    {
      counter : {currency : 'DGB', issuer : 'rMJSrGBUCTYnJN9kPNdgEm2hAfuC6bfPi8'},
      base    : {currency:'XRP'}
    }
  ];

  //source radio
  $scope.source = {
    type: 'live'
  };

  //historical dates
  $('#datepicker').datepicker({
    maxDate: '-1d',
    minDate: new Date(2013, 1, 31),
    dateFormat: "yy-mm-dd",
    onSelect: function(date) {
      $scope.$apply(function() {
        if ($scope.source.type === 'history') {
          $scope.loadTopMarkets(date);
        } else {
          $scope.source.type = 'history';
        }
      });
    }
  }).datepicker('setDate', new Date());

  //reload when source changes
  $scope.$watch('source.type', function() {
    var date;

    if ($scope.source.type === 'history') {
      date = moment($('#datepicker').datepicker('getDate')).format('YYYY-MM-DD');
    }

    $scope.loadTopMarkets(date);
  });

  //load the data
  $scope.loadTopMarkets = function (date) {
    var rates = [];
    pairs.forEach(function(c) {
      api.exchangeRate({
        date: date,
        base: c.base,
        counter: c.counter
      },
      function(err, rate) {
        if (err) {
          console.log(err);
          return;
        }

        rates.push({
          currency: c.counter.currency,
          issuer: c.counter.issuer,
          rate: rate
        });

        $scope.setNormalizationRates(rates);
      });
    });

    api.getExchangeVolume({
      interval: 'day',
      start: date,
      end: date
    }, function(err, resp) {
      var data = [];

      if (err) {
        console.log(err);

      } else if (resp.rows && resp.rows.length) {
        resp.rows[0].components.forEach(function(c) {
          if (!c.converted_amount) {
            return;
          }

          data.push({
            volume: c.converted_amount,
            amount: c.amount,
            count: c.count,
            base_rate: c.rate,
            base_currency: c.base.currency,
            base_issuer: c.base.issuer,
            counter_currency: c.counter.currency,
            counter_issuer: c.counter.issuer,
            base: c.base.currency + (c.base.issuer ? '.' + c.base.issuer : ''),
            counter: c.counter.currency + (c.counter.issuer ? '.' + c.counter.issuer : '')
          });
        });
      }

      $scope.chordData = data;
      $scope.update();
    });
  }

  //if live, reload every 5 minutes
  $interval(function() {
    if ($scope.source.type === 'live') {
      $scope.loadTopMarkets();
    }

  }, 300 * 1000);
});
