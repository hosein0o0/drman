import React , {Component} from 'react'
import {Link,Redirect} from 'react-router-dom';
import LoginClinic from './LoginClinic'
import LoginPatient from './LoginPatient'
import LoginLab from './LoginLab'
import axios from 'axios';
import Cookies from 'js-cookie'
import DataStatic from '../staticData'
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:null,
            error:false,
            select:'null',
            result:'',
            loading:false
        }
    }
handlechange=(env)=>{
    this.setState({[env.target.name]:env.target.value})
}
GetItems=(env)=>{
    this.setState({Items:env})
}
handleShow=()=>{
    if(this.state.select==='Clinic') return <LoginClinic GetItems={this.GetItems}/>
    else if(this.state.select==='Sick') return <LoginPatient GetItems={this.GetItems}/>
    else if(this.state.select==='Lab') return <LoginLab GetItems={this.GetItems}/>
}
handlesubmit=()=>{
    const data=this.state.Items
    if(data){
   if(data.Password&&data.Password!==''&&data.UserName&&data.UserName!==''&&data.institute_name!==''){
       if(data.Password.length<6){
           alert('رمز عبور باید دارای 6 کاراکتر باشد')
       }else{
        const datareg={}
        datareg['username_or_email']=data.UserName
        datareg['password']=data.Password
        datareg['institute_name']=data.institute_name
        axios({
            method : "POST",
            url :`${DataStatic.domainIp}/login`,
            data : datareg,
            config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
                    "contentType": "application/json",
                    "mimeType": "multipart/form-data"
                    }
        })
        .then((response)=>{
            if(response.data===0){
                alert('نام کاربری یا رمزعبور اشتباه میباشد')
            }else if(response.data===1){
                alert('لطفا محل کار را درست انتخاب کنید ')
            }
            else{
                this.setState({token:response.data.token,
                    institute_id:response.data.institute_id,
                    user_Type_name:response.data.user_Type_name,
                    UserName:data.UserName,
                    Password:data.Password})
                Cookies.set('Token', this.state.token,{expires:31})
                Cookies.set('username',data.UserName,{expires:31})
                Cookies.set('password',data.Password,{expires:31})
                Cookies.set('user_Type_name',response.data.user_Type_name,{expires:31})
                Cookies.set('institute_id',response.data.institute_id,{expires:31})
                if(this.state.select==='Clinic'){
                    this.setState({loading:true})
                    setTimeout(()=>this.setState({result:'Clinic',}), 1000);
                }else if(this.state.select==='Lab'){
                    this.setState({result:'Lab'})
                }
            }
        })
        .catch((err)=>{
            this.setState({error:true})
        })
       }
    }else alert('لطفا همه مقادیر را پر کنید')
}else alert('لطفا همه مقادیر را پر کنید')
}
    render(){
    if(this.state.result===''){
        if(this.state.loading){
            return(
                <div className='backgroundSearch'>
                <div className="lds-roller">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    </div>
            )
    }else return(
    <div className='container'>
                <div className='col-lg-7 col-12 m-auto'>
            <div className='form h-100'>
                {
                    this.state.error?
                    <div className='error'>
                        <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                }
                <div className="header">
                    <h3>login</h3>
                    </div>
                    <div className = 'm-1 field col-12'>
                        <div className="col-4 label"></div>
                        <div className="value col-8">
                <select onClick={this.handlechange} name='select'>
                    <option value='null'>لطفا انتخاب کنید</option>
                    <option value='Sick'>بیمار</option>
                    <option value="Clinic">کلینیک</option>
                    <option value="Lab">آزمایشگاه</option>
                </select>
                </div>
                </div>
                {this.handleShow()}
                {this.state.select==='null'?'':
                <div className='submit mt-3'>
                <button className='submit_sign'  type='submit' onClick={this.handlesubmit}>ورود</button>
                <Link to="/CreateUser">ثبت نام</Link>
                </div>
                }
            </div>
            </div>
            </div>
        )
            }
            else if(this.state.result==='Clinic') return <Redirect to={{pathname:`/prescription`,state:{user_Type_name:this.state.user_Type_name,institute_id:this.state.institute_id}}} />
            else if(this.state.result==='Lab') return <Redirect to={{pathname:`/labPrescription`,state:{user_Type_name:this.state.user_Type_name,institute_id:this.state.institute_id}}} />
        }
}