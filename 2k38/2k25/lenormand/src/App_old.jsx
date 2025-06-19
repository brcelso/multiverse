import ConditionalComponent from "./components/ConditionalComponent";
import Fruits from "./components/Fruits";
import Hello from "./components/Hello";
import Lenormand from "./components/Lenormand";

function App() {
  const person = {
      avatar: "https://github.com/brcelso.png",
      message: "go!", 
      emoji: "🐎",  
      name: "celso", 
      seatNumbers: [7, 4, 1], 
  };

  return (
    <div className="App">
       <Lenormand/>
    </div>
  );
}

export default App;
