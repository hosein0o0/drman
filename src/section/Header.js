import React, { Component } from 'react';
import logo from './../logo.svg';
import {Link, Redirect} from 'react-router-dom';
export default class Header extends Component {
  constructor(props){
    super(props)
    this.state={
      login:true,
    }
  }
  logout(){
    localStorage.clear()
    this.setState({login:false})
  }
   render() {
     if(this.state.login)
    return (
      <div className="header">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {localStorage.getItem("user")?
           <button onClick={()=>this.logout()}>خروج</button>
          :
          <Link to="/login" style={{marginLeft:"15px"}}>ورود</Link>
    }
          <h1 className="App-title">{this.props.title}</h1>
          
        </header>
        </div>
    );
    else return <Redirect to="/login"/>
  }
}
