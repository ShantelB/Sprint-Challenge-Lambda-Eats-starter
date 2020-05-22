import React, {useState, useEffect} from "react";
// import { Container, Card, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import * as yup from "yup";
import axios from "axios";
import { Route, Switch, Link, } from 'react-router-dom';


const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field.").min(2, "Name must be at least 2 characters long."), 
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    ham: yup.boolean(),
    peppers: yup.boolean(),
    mushrooms: yup.boolean(),
    instructions: yup.string().required(" Instructions are is a required field.").min(2, "Must be at least 10 characters long."),
    size: yup.string(),
    sauce: yup.string(),
  });

const Order = (props) => {
  
    const [disable, setDisable] = useState(true);

  const [pizzaName, setPizzaName] = useState({
      name: "", 
      pepperoni: "",
        sausage: "",
        ham: "",
        peppers: "",
        mushrooms: "", 
        instructions:"", 
        size:"",
        sauce:"",
    })  

    const [error, setError] = useState({
        name: "", 
        pepperoni: "",
        sausage: "",
        ham: "",
        peppers: "",
        mushrooms: "",
        instructions:"",
        size:"", 
        sauce:"", 
    })
    
   const [post, setPost] = useState([])

 useEffect(() => {
    formSchema.isValid(pizzaName)
    .then(pressed => {
        setDisable(!pressed);
    })
}, [pizzaName])

const checkChange = event => {

    yup
    .reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then(pressed => {
        setError({
            ...error, [event.target.name] : ''
        });
    })
    
    .catch(err => {
        setError({
            ...error, [event.target.name] : err.errors[0], 
        })
    })
}
 
    const makeChange = event => {
        event.persist();
        const newData = {
            ...pizzaName, [event.target.name] : 
            event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        setPizzaName(newData);
        checkChange(event);
    };


    const submitPizza = event => {
        event.preventDefault();
        props.addNewPizza(pizzaName);
        axios
              .post("https://reqres.in/api/users", pizzaName)
              .then(res => {
                setPost(res.data); 
                console.log("success", post);
            
                
                
                setPizzaName({
                  name: "",
                  pepperoni: "",
                  sausage: "",
                  ham: "",
                  peppers: "",
                  mushrooms: "",
                  instructions:"", 
                  size:"",
                  sauce:"",
                });
              })
              .catch(err => console.log(err.response));
    }
            


    return (
      <div className="Member-List">
      <form onSubmit={submitPizza}>

      <Link exact to="/" className="home" >Home</Link>

      <br></br>
            <div className="name">
          <label htmlFor="member">Name{error.name.length > 2 ? (<p className="error">{error.name}</p>) : null}</label>
          <input id="member" type="text" name="name" onChange={makeChange} placeholder="Name" value= {pizzaName.name} />
            </div>
          <br></br>

          <div className="size">
          <label htmlFor="size">
        What size pizza would you like?
        <select id="size" name="size" onChange={makeChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="Large">Large</option>
          <option value="extra large">Extra Large</option>
        </select>
      </label>
            </div>

      <br></br>

      <div className="sauce">
      <label htmlFor="sauce">
        What sauce would you like for your pizza?
        <select id="sauce" name="sauce" onChange={makeChange}>
          <option value="tomato">Tomato</option>
          <option value="pesto">Pesto</option>
          <option value="buffalo">Buffalo</option>
        </select>
      </label>
        </div>

      <br></br>

      <div className="toppings">
          <input type="checkbox" name="pepperoni" checked={pizzaName.pepperoni} onChange={makeChange} />
          <label htmlFor="pepperoni" className="pepperoni">Pepperoni</label>

          <input type="checkbox" name="sausage" checked={pizzaName.sausage} onChange={makeChange} />
          <label htmlFor="sausage" className="sausage">Sausage</label>

          <input type="checkbox" name="ham" checked={pizzaName.ham} onChange={makeChange} />
          <label htmlFor="ham" className="ham">Ham</label>

          <input type="checkbox" name="peppers" checked={pizzaName.peppers} onChange={makeChange} />
          <label htmlFor="peppers" className="peppers">Bell Peppers</label>

          <input type="checkbox" name="mushrooms" checked={pizzaName.mushrooms} onChange={makeChange} />
          <label htmlFor="mushrooms" className="mushrooms">Mushrooms</label>
        </div>

          <br></br>

          <div className="instructions">
          <label htmlFor="instruction">Special Instructions <textarea name="instructions" value={pizzaName.instructions} onChange={makeChange} placeholder="Special Instructions"/>
          {error.instructions.length > 10 ? (<p className="error">{error.instructions}</p>) : null}</label>
            </div>
         
         <div className="button">
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
         <button disabled={disable} type="submit" >Submit</button>
         </div>
      </form>

      
          {props.pizzaMembers.map(pizza => (
              <div className="list" key={pizza.id}>

                <div className="card">
          <h2>Name: {pizza.name}</h2>
          <h3>Size: {pizza.size}</h3>
          <h3>Sauce: {pizza.sauce}</h3>
          <h3>Special Instructions: {pizza.instructions}</h3>
                </div> 
          </div>
          ))}
    
    
      </div>
    );
  };
  export default Order;