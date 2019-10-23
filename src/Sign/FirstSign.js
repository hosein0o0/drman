import React, { Component } from 'react';
import DataStatic from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios';
export default class FirstStage extends Component{
    constructor(props){
        super(props);
        this.state={
            CheckEmail:false,
            Email:'',
            error:false,
            loading:false
        }
    }
handlechange=(env)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({CheckEmail:re.test(String(env.target.value).toLowerCase()),Email:env.target.value})
}
handleSubmit=()=>{
    this.setState({loading:true})
    if(this.state.CheckEmail){
    var datareg = new FormData();
    datareg.append('email',this.state.Email)
    axios({
        method: 'post',
        url: `${DataStatic.domainIp}/Send_Email`,
        data: datareg,
        config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
        "contentType": "application/json",
        "mimeType": "multipart/form-data"
        }
    })
    .then((response)=>{
        this.setState({loading:false})
        if(response.data===0){
            alert('لطفا ایمیل خود را وارد کنید')
        }else{
             Cookies.set('Token',response.data)
             alert('لطفا ایمیل خود را چک کنید')
            }
    })
    .catch((err)=>{
        this.setState({error:true,loading:false})
        console.log(err)
    })
}else alert('ایمیل خود را به درستی وارد کنید')
}
render(){
    if(this.state.loading){
        return(
            <div className='backgroundSearch' style={{position:'fixed',backgroundColor:'rgba(12, 7, 7, 0.92)'}}>
            <div className="lds-roller">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
                </div>
        )
    }else {
    return(
        <React.Fragment>
        <div className='m-1 field col-12'>
            <div className='label col-4'>
            <label>ایمیل ذخیره شده در نظام پزشکی * :</label>
            </div>
            <div className='value col-8'>
            <input type='email' placeholder = 'ایمیل' required onChange ={this.handlechange}/>
        </div>
        </div>
        <div className='submit'>
                <button className='submit_sign' type='submit' onClick={this.handleSubmit}>ثبت نام</button>
                </div>
        </React.Fragment>
    )
    }
}
}