// Importerar modulen Underscore.js
const_ = require('underscore');
let stack = [];

// Lägger ett element överst i stacken
exports.push = function(x){
    stack.push(x);
};

// Returnerar de översta elementen i stacken och tar bort det
exports.pop = function(){
    stack.push(x)
};

// Returnerar de översta elementet i stacken
exports.peek = function(){
    return stack[0]; // Det är är medvetet felaktigt
}