import React , {Component} from 'react'
import DataStatic from '../staticData'
import axios from 'axios';
export default class LoginClinic extends Component{
    constructor(props){
        super(props);
        this.state={
            institute_name:'',
            ClinicList:[],
            notFound:false
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
    const data=this.state
    data['institute_name']=undefined
    this.setState(data)
}else if(env.target.value===''){
    setTimeout(()=>{this.setState({notFound:undefined})},300);
    this.setState({ClinicList:[]})
    }
}
selectClinic=(env)=>{
    const data = this.state
    data['institute_name']=env.name
    data['ClinicList']=[]
    this.setState(data)
    }
handleChange=(env)=>{
    if(env.target.name==='UserName'){
        var check = /^[\u0600-\u06FF\s]+$/;
        if(check.test(env.target.value)){
            env.target.value=''
        }else null
    }
    this.setState({[env.target.name]:env.target.value})
}
handlecheck=(env)=>{
    if(env.target.value===''){
        env.target.style.border='1px solid #ff0d0d'
    }else if(env.target.name==='Password'){
        if(env.target.value.length<6){
            env.target.style.border='1px solid #ff0d0d'
        }else env.target.style.border='1px solid #c7c4c4'
    }else env.target.style.border='1px solid #c7c4c4'

    if(this.state.institute_name!==''&&this.state.Password&&this.state.UserName){
        this.props.GetItems(this.state)
        }else this.props.GetItems(undefined)
}
render(){
    return(
        <React.Fragment>
            <div className = 'm-1 field name col-12'>
                    <div className='label col-4'>
                <label>نام مطب  :</label>
                </div>
                <div className="value col-8">
                    <div className='position-relative'>
                <input name='Clinic' type='text' required placeholder = 'نام مطب' value={this.state.institute_name} onChange ={this.searchClinic} onBlur={this.handlecheck}/>
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
            <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>نام کاربری :</label>
                    </div>
                    <div className='value col-8'>
                    <div className='login_field position-relative'>
                    <input className='text-left' name='UserName' type='text' required ref='UserName' placeholder = 'نام کاربری' onChange={this.handleChange}  onBlur={this.handlecheck}/>
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
                    <input className='text-left' name='Password' type='Password' required ref='Password' placeholder = 'رمز عبور' onChange={this.handleChange} onBlur={this.handlecheck}/>
                    <i className="fa fa-lock"></i>
                    </div>
                    </div>
                </div>
        </React.Fragment>
    )
}
}