import React, {useState} from "react";
import { Route, Switch, Link, } from 'react-router-dom';

const Home = () => {

    
  
    return (
      <div>
          
         <Link exact to="/pizza" className="order" >Order Now!</Link>
      </div>
    );
  };

  export default Home;