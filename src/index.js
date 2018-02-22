// PLEASE DON'T change function name
module.exports = function makeExchange(currency) {
    if (currency < 0) return {};
    
    if (currency > 10000) {
        return { 
            error: 'You are rich, my friend! We don\'t have so much coins for exchange' 
        };
    }

    var coins = [1, 5, 10, 25, 50],
        signs = ['P', 'N', 'D', 'Q', 'H'],
        data = [0].concat(Array(currency).fill(Infinity)),
        denom = Array(currency + 1).fill(0),
        result = {};

    for (var i = 1; i < currency + 1; i++) 
        for (var j = 1; j < coins.length + 1; j++) 
            if (coins[j] <= i && data[i - coins[j]] < data[i]) {
                data[i] = data[i - coins[j]] + 1;
                denom[i] = j;
            }

    while (currency) {
        var sign = signs[denom[currency]];

        if (sign in result) {
            result[sign]++;
        } else {
            result[sign] = 1;
        }

        currency -= coins[denom[currency]];
    }

    return result;
}
