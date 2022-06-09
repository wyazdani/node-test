import * as fs from 'fs';

class Fruit {
    type: string;
    color: string;
    weight: number;
   
    constructor(type: string, color: string, weight: number) {
      this.type = type;
      this.color = color;
      this.weight = weight;
    }
}  

class FruitBasket {
    id: string;
    max_weight: number;
    fruits: Fruit[];

    constructor(id: string, max_weight: number, fruits: Fruit[]){
        this.id = id;
        this.max_weight = max_weight;
        this.fruits = fruits;
    }
}

var baskets: FruitBasket[] = [];
let input_data = JSON.parse(fs.readFileSync('input.json', 'utf-8'))
input_data.forEach(basket => {
    var fruits: Fruit[] = [];
    basket.contents.forEach(fruit => fruits.push(new Fruit(fruit.type, fruit.color, fruit.weight)))
    baskets.push(new FruitBasket(basket.id, basket.max_weight, fruits));
})

var output_data = [];
baskets.forEach(basket => {
    var fruits = [];
    basket.fruits.forEach(fruit => {
        fruits[fruit.type] ? fruits[fruit.type] += fruit.weight : fruits[fruit.type] = fruit.weight
    })

    var keys = Object.keys(fruits);
    
    var total_weight = 0;
    keys.forEach(k => total_weight += fruits[k]);

    output_data.push({
        id: basket.id,
        total_fruits: keys.length,
        total_weight: total_weight,
        fruit_counts: keys.map(k => {
            let fruit = {
                type: k,
                count: fruits[k]
            }
            return fruit;
        })
    })
});

fs.writeFile("output.json", JSON.stringify(output_data), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});