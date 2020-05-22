import React, {useState} from "react";
import Home from "./components/home";
import Order from "./components/order";
import { Route, Switch, Link, } from 'react-router-dom';


const App = () => {

  const [pizzaMembers, setPizzaMembers] = useState([
    {
        id:0,
        name:'Shantel',
        pepperoni: '',
        sausage:'',
        ham:'',
        peppers:'',
        mushrooms:'', 
        instructions:'Cut into squares',
        size:"Small",
        sauce:"Tomato",
    },
  
  ]
  
  ) 
const addNewPizza = pizza => {
  const newPizza = {
    id:Date.now(),
    name:pizza.name,
    pepperoni: pizza.pepperoni,
    sausage: pizza.sausage,
    ham: pizza.ham,
    peppers: pizza.peppers,
    mushrooms: pizza.mushrooms,
    instructions:pizza.instructions, 
    size:pizza.size,
    sauce:pizza.sauce,
  }
  setPizzaMembers([...pizzaMembers, newPizza])
}

  return (
    <div className="homePage">
      <h1>Lambda Eats</h1>
      
     

        <Route exact path="/">
            <Home addNewPizza={addNewPizza} pizzaMembers={pizzaMembers} />
            </Route>

        <Route exact path="/pizza">
             <Order addNewPizza={addNewPizza} pizzaMembers={pizzaMembers}/>
              </Route>
    </div>
  );
};
export default App;
