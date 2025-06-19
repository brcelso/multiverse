import Fruit from "./Fruit";
export default function Fruits() {
    
    //const fruits = ["Apple", "Mango", "Banana", "Orange", "Pineapple"];
    const fruits =[
      { name:"Apple",price:10,emoji: "🍎" },
      { name:"Mango",price:7,emoji: "🥭" },
      { name:"Banana",price:2,emoji: "🍌" },
      { name:"Orange",price:5,emoji: "🍎" },
      { name:"Pineapple",price:8,emoji: "🍍" },
      { name:"Grape",price:6,emoji: "🍇" },
      { name:"Lemon",price:4,emoji: "🍋" },
      { name:"Strawberry",price:9,emoji: "🍓" }, // Added Strawberry
      { name:"Watermelon",price:12,emoji: "🍉" }, // Added Watermelon
      { name:"Peach",price:11,emoji: "🍑" }, // Added Peach
      { name:"Cherry",price:15,emoji: "🍒" }, // Added Cherry
      { name:"Kiwi",price:13,emoji: "🥝" }, // Added Kiwi
    ];
    return (
        
    <div>
       <ul>
         {fruits.map((fruit) => (
            <Fruit 
            key={fruit.name}
            name={fruit.name}
            price={fruit.price} 
            emoji={fruit.emoji} 
            />
         ))}
       </ul>
    </div>
      );
}

/*
rendering manually
<li key={fruit.name}>
               {fruit.emoji} {fruit.name} ${fruit.price}
            </li>
*/
/*rendering array
<ul>
        {fruits.map((fruit) => (
        <li key={fruit.name}>
         {""}
         {fruit.emoji} {fruit.name} ${fruit.price}
        </li>
        ))}
       </ul>
*/