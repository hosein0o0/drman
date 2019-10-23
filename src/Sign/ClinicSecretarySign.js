import React ,{Component} from 'react'
import DataStatic from '../staticData'
import axios from 'axios';
export default class ClinicSecretarySign extends Component{
    constructor(props){
        super(props);
        this.state={
            state:'null',
            city:'null',
            region:'null',
            form:{
                Year_of_Birth:'',
                mobile:''
            },
            type_id:'',
            error:false
        }
    }
componentDidMount(){
    axios.get(`${DataStatic.domainIp}/ListTypeUser`)
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
            if(this.props.select==='Secretary_Clinic'&&response.data[i].name==='secretaryclinic'){
                    this.setState({type_id:response.data[i].id})
           }else if(this.props.select==='Secretary_Lab'&&response.data[i].name==='secretarylab'){
                    this.setState({type_id:response.data[i].id})
        }
        }
    })
    .catch((err)=>{
        this.setState({error:true})
    })
}
handleCheck=(env)=>{
    if(env.target.value===''){
        env.target.style.border="1px solid #ff0d0d"
        
    }else{
    if(env.target.name ==='mobile'){
        if(env.target.value.length !==11){
            env.target.style.border = '1px solid #ff0d0d'
    }
        else{
            env.target.style.border = '1px solid #c7c4c4'
            }
        }else if(env.target.name==='password'){
            if(env.target.value.length<6){
                env.target.style.border = '1px solid #ff0d0d'
            
            }
            else{
                env.target.style.border = '1px solid #c7c4c4'
            }
        }else if(env.target.name==='Year_of_Birth'){
            const data=this.state.form
            if(env.target.value.length===2){
                data['Year_of_Birth']=13+''+env.target.value
                this.setState({form:data})
                env.target.style.border = '1px solid #c7c4c4'
            }else if(env.target.value.length===3){
                data['Year_of_Birth']=''
                this.setState({form:data})
                env.target.style.border = '1px solid #ff0d0d'
            }
        }
        else {
            env.target.style.border = '1px solid #c7c4c4'
        }
    }
        }
handlechange=(env)=>{
    this.setState({[env.target.name]:env.target.value})
    const data=this.state.form
    if(env.target.name==='username'){
        var check = /^[\u0600-\u06FF\s]+$/;
            if(check.test(env.target.value)){
                env.target.value=''
            }else null
    }else if(env.target.name==='name'||env.target.name==='family'){
        var check = /^[\u0600-\u06FF\s]+$/;
        if(check.test(env.target.value)) null
        else{
            env.target.value=''
        }
    }else if(env.target.name==='Year_of_Birth'){
        const { value} = env.target;
        const message = value.slice(0,4)
        data['Year_of_Birth']=message
        this.setState({form:data})
    }else if(env.target.name==='mobile'){
        const {value}=env.target
        const mobile=value.slice(0,11)
        data['mobile']=mobile
        this.setState({form:data})
    }
}
checkEmail=(env)=>{
        if(env.target.value.includes("@")){
        env.target.parentElement.children[0].style.color=null 
        env.target.style.border='1px solid #c7c4c4'
      }
      else if(env.target.value ===''||!env.target.value.includes("@")){
          env.target.style.border = '1px solid #ff0d0d'
      }
}
render(){
    return(
        <React.Fragment>
                {
                    this.state.error?
                    <div className='error'>
                        <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                }
                <div className = 'm-1 field col-12'>
                <div className="col-4 label">
                    <label>آدرس محل سکونت</label>
                </div>
                <div className="value col-8">
                <select onClick={this.handlechange} name='state'>
                    <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
                    <option value="karaj">البرز</option>
                    <option value="teh">تهران</option>
                </select>
                </div>
                </div>
                {this.state.state==='null'?'':
                <div className = 'm-1 field col-12'>
                <div className="col-4 label">
                <label>شهر</label>
                </div>
                <div className="value col-8">
                <select onClick={this.handlechange} name='city'>
                <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
                <option value="karaj">کرج</option>
                <option value="mohamadshahr">محمد شهر</option>
                <option value="fardis">قردیس</option>
                </select>
                </div>
                </div>
                }
                {this.state.city==='null'?'':
                <div className = 'm-1 field col-12'>
                    <div className="col-4 label">
                        <label>منطقه</label>
                    </div>
                    <div className="value col-8">
                    <select onClick={this.handlechange} name='region'>
                        <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
                        <option value="gloshahr">45 متری گلشهر</option>
                        <option value="azimie">عظیمیه</option>
                        <option value="gohardasht">گوهردشت</option>
                    </select>
                    </div>
                    </div>
                }
                {this.state.region==='null'?'':
                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>جزییات آدرس :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='address' type='text' placeholder = 'جزییات آدرس' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                }
            <div className='m-1 field col-12'>
            <div className='label col-4'>
            <label>کد پرسنلی * :</label>
            </div>
            <div className='value col-8'>
            <input name='code' type='number' placeholder = 'کد پرسنلی' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
        </div>
        </div>

        <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>نام کاربری * :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='username' type='text' placeholder = 'نام کاربری' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
        <div className='m-1 field col-12'>
                    <div className="label col-4">
                    <label>رمز عبور * :</label>
                    </div>
                    <div className="value col-8">
                    <input name='password' type='password' placeholder = 'رمز عبور' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
        <div className='m-1 field col-12'>
                    <div className="label col-4">
                    <label>نام * :</label>
                    </div>
                    <div className="value col-8">
                    <input name='name' type='text' placeholder = 'نام' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
        <div className='m-1 field col-12'>
                    <div className="col-4 label">
                    <label>نام خانوادگی * :</label>
                    </div>
                    <div className="col-8 value">
                    <input name='family' type='text' placeholder = 'نام خانوادگی' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
        </div>
        </div>
        <div className='m-1 field col-12'>
                    <div className="col-4 label">
                    <label>سال تولد * :</label>
                    </div>
                    <div className="col-8 value">
                    <input name='Year_of_Birth' type='number' placeholder = 'سال تولد' required value={this.state.form.Year_of_Birth} onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
        <div className='m-1 field col-12'>
        <div className="col-4 label">
        <label>موبایل * :</label>
        </div>
        <div className="col-8 value">
        <input name='mobile' type='number' placeholder = 'موبایل' required value={this.state.form.mobile} onChange ={this.handlechange} onBlur={this.handleCheck}/>
        </div>
        </div>

        <div className='m-1 field col-12'>
                    <div className="label col-4">
                    <label>ایمیل * :</label>
                    </div>
                    <div className="value col-8">
                    <input name='email' type='email' placeholder = 'ایمیل' required onChange={this.handlechange} onBlur={this.checkEmail}/>
                </div>
                </div>
        </React.Fragment>
    )
}
}