// Importerar modulen Underscore.js
const _ = require('underscore');
let stack = [];

// Lägger ett element överst i stacken
exports.push = function(x){
    stack.push(x);
};

// Returnerar de översta elementen i stacken och tar bort det
exports.pop = function(){
    return stack.pop()
};

// Returnerar de översta elementet i stacken
exports.peek = function(){
    return _.last(stack); 
}