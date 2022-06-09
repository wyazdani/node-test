"use strict";
exports.__esModule = true;
var fs = require("fs");
var Fruit = /** @class */ (function () {
    function Fruit(type, color, weight) {
        this.type = type;
        this.color = color;
        this.weight = weight;
    }
    return Fruit;
}());
var FruitBasket = /** @class */ (function () {
    function FruitBasket(id, max_weight, fruits) {
        this.id = id;
        this.max_weight = max_weight;
        this.fruits = fruits;
    }
    return FruitBasket;
}());
var baskets = [];
var input_data = JSON.parse(fs.readFileSync('input.json', 'utf-8'));
input_data.forEach(function (basket) {
    var fruits = [];
    basket.contents.forEach(function (fruit) { return fruits.push(new Fruit(fruit.type, fruit.color, fruit.weight)); });
    baskets.push(new FruitBasket(basket.id, basket.max_weight, fruits));
});
var output_data = [];
baskets.forEach(function (basket) {
    var fruits = [];
    basket.fruits.forEach(function (fruit) {
        fruits[fruit.type] ? fruits[fruit.type] += fruit.weight : fruits[fruit.type] = fruit.weight;
    });
    var keys = Object.keys(fruits);
    var total_weight = 0;
    keys.forEach(function (k) { return total_weight += fruits[k]; });
    output_data.push({
        id: basket.id,
        total_fruits: keys.length,
        total_weight: total_weight,
        fruit_counts: keys.map(function (k) {
            var fruit = {
                type: k,
                count: fruits[k]
            };
            return fruit;
        })
    });
});
fs.writeFile("output.json", JSON.stringify(output_data), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});
