import React , {Component} from 'react'
import DataStatic from '../staticData'
import axios from 'axios';
export default class LoginClinic extends Component{
    constructor(props){
        super(props);
        this.state={
            institute_name:'',
            LabList:[],
            notFound:false
        }
    }
searchLab=(env)=>{
    if(env.target.value!==''){
        axios.get(`${DataStatic.domainIp}/Search_Lab?lab_name=${env.target.value}`)
            .then((response)=>{
                if(response.data===0){
                    env.target.style.border='1px solid #ff0d0d';
                    this.setState({notFound:false})
                }
                else if(response.data===1){
                    this.setState({LabList:[],notFound:true})
                }
                else{
                this.setState({LabList:response.data,notFound:false})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            const data=this.state
            data['institute_name']=null
            this.setState(data)
        }else if(env.target.value===''){
            setTimeout(()=>{this.setState({notFound:false})},300);
            this.setState({LabList:[]})
        }
}
SelectLab=(env)=>{
    const data = this.state
    data['institute_name']=env.name
    data['LabList']=[]
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

    if(this.state.institute_name!==''||this.state.institute_name!==null&&this.state.Password&&this.state.UserName){
    this.props.GetItems(this.state)
    }else this.props.GetItems(undefined)
}
render(){
    return(
        <React.Fragment>
            <div className = 'm-1 field name col-12'>
                    <div className='label col-4'>
                <label>نام آزمایشگاه  :</label>
                </div>
                <div className="value col-8">
                    <div className='position-relative'>
                <input name='Lab' type='text' required placeholder = 'نام آزمایشگاه' value={this.state.institute_name} onChange ={this.searchLab} onBlur={this.handlecheck}/>
                <div className={`searchname ${this.state.LabList.length===0?'p-0':null}`} style={this.state.LabList.length===0?{display:'none'}:null,this.state.LabList.length>4?{height:'15em',overflow:'auto'}:null}>
                            {
                        this.state.notFound?
                        <div className='name p-3 text-center' style={{justifyContent:'center'}}>
                    <span> مقادیر مورد نظر یافت نشد</span>
                    </div>
                    :
                        this.state.LabList.map((data,key)=>
                        <div className='name' key={key}>
                            <label onClick={()=>this.SelectLab(data)}>{data.name}</label>
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
                    <input className='text-left' name='username' type='text' required ref='username' placeholder = 'نام کاربری' onChange={(env)=>this.setState({UserName:env.target.value})}  onBlur={this.handlecheck}/>
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
                    <input className='text-left' name='password' type='password' required ref='password' placeholder = 'رمز عبور' onChange={(env)=>this.setState({Password:env.target.value})} onBlur={this.handlecheck}/>
                    <i className="fa fa-lock"></i>
                    </div>
                    </div>
                </div>
        </React.Fragment>
    )
}
}