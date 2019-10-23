import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import Cookies from 'js-cookie'
export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            Token:Cookies.get('Token'),
            login : false,
            sign : false
        }
    }

    render(){
      if(this.state.Token)
        return(
          <Redirect to='/login' />
        )
        else{
          return <Redirect to='/CreateUser' />
        }
        }
}