import React , {Component} from 'react'
import {Link} from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import DataStatic from './staticData'
import Cookies from 'js-cookie'
import axios from 'axios';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkLogin : false,
            token:null,
            ClinicList:[],
            LabList:[],
            form:{
                Clinic:'',
                Lab:'',
            },
            notFound:undefined,
            error:false
        }
    this.handlechange = this.handlechange.bind(this)
    this.handlesubmit = this.handlesubmit.bind(this)
    this.handleselect = this.handleselect.bind(this)
    }
handlechange(env){
if(env.target.value===''){
    env.target.style.border = '1px solid #ff0d0d'
    env.target.style.backgroundColor = '#fff'
}else if(env.target.value!==''){
    if(env.target.name==='username'){
    var check = /^[\u0600-\u06FF\s]+$/;
        if(check.test(env.target.value)){
            env.target.value=''
        }else null
    }
    this.setState({
        [env.target.name] : env.target.value
    })
    env.target.style.backgroundColor = '#e4f0fe'
    env.target.style.border = '1px solid #c7c4c4'
    env.target.style.transition = '0.5s'
    this.setState({checkLogin:true})
}
}
handlecheck=(env)=>{
    if(env.target.value===''){
        env.target.style.border ='1px solid #ff0d0d'
    }else if(env.target.value!==''){
        env.target.style.border='1px solid #c7c4c4'
    }
}
searchClinic=(env)=>{
    if(env.target.value!==''){
        axios.get(`${DataStatic.domainIp}/Search_Clinic?clinic_name=${env.target.value}`)
        .then((response)=>{
            if(response.data===0){
                env.target.style.border='1px solid #ff0d0d';
                this.setState({notFound:undefined})
            }
            else if(response.data===1){
                this.setState({ClinicList:[],notFound:1})
            }
            else{
            this.setState({ClinicList:response.data,notFound:undefined})
            }
        })
        .catch((err)=>{
            this.setState({error:true})
        })
        const data=this.state.form
        data['Clinic']=null
        this.setState({form:data})
    }else if(env.target.value===''){
        setTimeout(()=>{this.setState({notFound:undefined})},300);
        this.setState({ClinicList:[]})
    }
    }
    selectClinic=(env)=>{
        const data = this.state.form
        data['Clinic']=env.name
        this.setState({ClinicList:[],form:data})
    }
    searchLab=(env)=>{
        if(env.target.value!==''){
            axios.get(`${DataStatic.domainIp}/Search_Lab?lab_name=${env.target.value}`)
            .then((response)=>{
                if(response.data===0){
                    env.target.style.border='1px solid #ff0d0d';
                    this.setState({notFound:undefined})
                }
                else if(response.data===1){
                    this.setState({ClinicList:[],notFound:1})
                }
                else{
                this.setState({LabList:response.data,notFound:undefined})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            const data=this.state.form
            data['Lab']=null
            this.setState({form:data})
        }else if(env.target.value===''){
            setTimeout(()=>{this.setState({notFound:undefined})},300);
            this.setState({LabList:[]})
        }
    }
    selectLab=(env)=>{
        const data=this.state.form
        data['Lab']=env.name
        this.setState({form:data,LabList:[]})
    }
    handleselect(){
        if(this.state.select==='Clinic'){
            return(
                <div className = 'm-1 field name col-12'>
                    <div className='label col-4'>
                <label>نام مطب  :</label>
                </div>
                <div className="value col-8">
                    <div className='position-relative'>
                <input name='Clinic' type='text' required placeholder = 'نام مطب' value={this.state.form.Clinic} onChange ={this.searchClinic} onBlur={this.handlecheck}/>
                <div className={`searchname ${this.state.ClinicList.length===0?'p-0':null}`} style={this.state.ClinicList.length===0?{display:'none'}:null,this.state.ClinicList.length>4?{height:'15em',overflow:'auto'}:null}>
                            {
                        this.state.notFound?
                        <div className='name p-3 text-center' style={{justifyContent:'center'}}>
                    <span> مقادیر مورد نظر یافت نشد</span>
                    </div>
                    :
                        this.state.ClinicList.map((data,key)=>
                        <div className='name' key={key}>
                            <label onClick={()=>this.selectClinic(data)}>{data.name}</label>
                    </div>    
                    )
                            }
                    </div>
            </div>
            </div>
            </div>
            )
        }
        else if(this.state.select==='Lab'){
            return (
                <div className = 'm-1 field name col-12'>
                    <div className="label col-4">
                <label>نام آزمایشگاه  :</label>
                </div>
                <div className="value col-8">
                    <div className='position-relative'>
                <input name='Lab' type='text' required placeholder = 'نام آزمایشگاه' value={this.state.form.Lab} onChange ={this.searchLab} onBlur={this.handlecheck}/>
                <div className={`searchname ${this.state.LabList.length===0?'p-0':null}`} style={this.state.LabList.length>4?{height:"15em",overflow:'auto'}:null}>
                            {
                        this.state.notFound?
                        <div className='name p-3 text-center'>
                        <span className='text-center'> مقادیر مورد نظر یافت نشد</span>
                        </div>
                        :
                        this.state.LabList.map((data,key)=>
                        <div className='name' key={key} >
                            <label onClick={()=>this.selectLab(data)}>{data.name}</label>
                    </div>    
                    )
                            }
                    </div>
            </div>
            </div>
            </div>
            )
        }
        }
handlesubmit(event){
    if(this.state.checkLogin){
    if(this.state.username !==undefined  && this.state.username !==''&&  this.state.password !==undefined  && this.state.password!==''){
        const datareg={}
        datareg['username_or_email']=this.state.username
        datareg['password']=this.state.password
        if(this.state.select==='Clinic'){
        datareg['institute_name']=this.state.form.Clinic
        }else if(this.state.select==='Lab'){
            datareg['institute_name']=this.state.form.Lab
        }
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
                this.setState({token:response.data.token})
                Cookies.set('Token', this.state.token,{expires:31})
                Cookies.set('username',this.state.username,{expires:31})
                Cookies.set('password',this.state.password,{expires:31})
                Cookies.set('user_Type_name',response.data.user_Type_name,{expires:31})
                Cookies.set('institute_id',response.data.institute_id,{expires:31})
                if(this.state.select==='Clinic'){
                    if(response.data.user_Type_name==="drclinic"){
                        window.location.href = '/prescription'
                    }else if(response.data.user_Type_name==='secretaryclinic'){
                        window.location.href='List_prescription'
                    }
                }else if(this.state.select==='Lab'){
                    window.location.href = '/labPrescription'
                }
            }
        })
        .catch((err)=>{
            this.setState({error:true})
        })
    }else{
        this.setState({checkLogin:false})
        event.preventDefault();
        alert('مقادیر مورد نیاز را پر کنید')
    }
}else{
        alert('لطفا همه مقادیر مورد نیاز را پر کنید')
    }
}
    render(){
        return(
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
                {this.handleselect()}
                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>نام کاربری :</label>
                    </div>
                    <div className='value col-8'>
                    <div className='login_field position-relative'>
                    <input className='text-left' name='username' type='text' required ref='username' placeholder = 'نام کاربری' onChange={this.handlechange}  onBlur={this.handlecheck}/>
                    <i className="fa fa-user"></i>
                    </div>
                    </div>
                </div>
                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>رمز عبور :</label>
                    </div>
                    <div className='value col-8'>                    
                    <div className='login_field position-relative'>
                    <input className='text-left' name='password' type='password' required ref='password' placeholder = 'رمز عبور' onChange={this.handlechange} onBlur={this.handlecheck}/>
                    <i className="fa fa-lock"></i>
                    </div>
                    </div>
                </div>
                <div className='submit mt-3'>
                <button className='submit_sign'  type='submit' onClick={this.handlesubmit}>ورود</button>
                <Link to="/CreateUser">ثبت نام</Link>
                </div>
            </div>
            </div>
            </div>
        )
    }
}