import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import DataStatic from './staticData'
import SignPatient from './SignPatient'
export default class sign extends Component{
    constructor(props){
        super(props);
        this.state ={
            checkEmail:false,
            checkSubmit : false,
            form:{
                mobile:'',
                Clinic:'',
                lab:'',
                institute_id:'',
                birthday:''
            },
            ClinicList:[],
            LabList:[],
            notFound:undefined,
            proficiency:null,
            type_id:'',
            error:false,
            SignPatient:'',
            Labs:[]
        }
    this.handlechange = this.handlechange.bind(this)
    this.handlesubmit = this.handlesubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    }
handleCheck(env){
    if(env.target.value===''){
        env.target.style.border="1px solid #ff0d0d"
        this.setState({checkSubmit:false})
    }else{
    if(env.target.name==='email'){
        if(env.target.value.includes("@")){
        // env.target.parentElement.children[1].style.color=null 
        env.target.style.border='1px solid #c7c4c4'
        this.setState({checkEmail:true , checkSubmit:true})

      }
      else if(env.target.value ===''||!env.target.value.includes("@")){
          this.setState({checkSubmit:false})
          env.target.style.border = '1px solid #ff0d0d'
      }
    }
    else if(env.target.name ==='mobile'){
        if(env.target.value.length !==11){
            env.target.style.border = '1px solid #ff0d0d'
            this.setState({checkSubmit:false})
        }
        else{
            env.target.style.border = '1px solid #c7c4c4'
        }
    }
    else {
        env.target.style.border = '1px solid #c7c4c4'
        this.setState({checkSubmit:true})
    }
}
    }
handlechange(env){
    this.setState({
        [env.target.name]:env.target.value}
        )
    if(env.target.name==='mobile'){
        const { value, maxLength } = env.target;
            const data = this.state.form
            const message = value.slice(0,11)
            data['mobile']=message
            this.setState({form:data})
    }
    else if(env.target.name==='birthday'){
        const { value} = env.target;
            const data = this.state.form
            const message = value.slice(0,4)
            data['birthday']=message
            this.setState({form:data})
    }
    else if(env.target.name==='username'){
        var check = /^[\u0600-\u06FF\s]+$/;
            if(check.test(env.target.value)){
                env.target.value=''
            }else null
        }else if(env.target.name==='name'){
            var check = /^[\u0600-\u06FF\s]+$/;
            if(check.test(env.target.value)) null
            else{
                env.target.value=''
            }
        }else if(env.target.name==='family'){
            var check = /^[\u0600-\u06FF\s]+$/;
            if(check.test(env.target.value)) null
            else{
                env.target.value=''
            }
        }
    else if(env.target.value ===''){
        env.target.style.border = '1px solid #ff0d0d'
    }else{
        env.target.style.backgroundColor = '#e4f0fe'
        env.target.style.divansition = '1s'
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
    const data=this.state.form
    data['Clinic']=env.name
    data['institute_id']=env.id
    this.setState({form:data,ClinicList:[]})
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
        this.setState({error:true})
    })
    const data=this.state.form
    data['lab']=null
    this.setState({form:data})
}else if(env.target.value===''){
    setTimeout(()=>{this.setState({notFound:undefined})},300);
    this.setState({LabList:[]})
}
}
selectLab=(env)=>{
    const data=this.state.form
    data['lab']=env.name
    data['institute_id']=env.id
    this.setState({form:data,LabList:[],Labs:[...this.state.Labs,env.id]})
}
handleselect=()=>{
    axios.get(`${DataStatic.domainIp}/ListTypeUser`)
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
           if(this.state.select==='DR_Clinic'&&response.data[i].name==='drclinic'){
                   this.setState({type_id:response.data[i].id})
           }else if(this.state.select==='Secretary_Clinic'&&response.data[i].name==='secretaryclinic'){
                    this.setState({type_id:response.data[i].id})
           }else if(this.state.select==='DR_Lab'&&response.data[i].name==='drlab'){
                    this.setState({type_id:response.data[i].id})
           }else if(this.state.select==='Secretary_Lab'&&response.data[i].name==='secretarylab'){
                    this.setState({type_id:response.data[i].id})
           }
        }
    })
    .catch((err)=>{
        this.setState({error:true})
    })
    if(this.state.select==='DR_Clinic'){
        return(
            <div className = 'm-1 field name col-12'>
                <div className='label col-4'>
            <label>نام مطب * :</label>
            </div>
            <div className="value col-8">
                <div className='position-relative'>
            <input type='text' required placeholder = 'نام مطب' value={this.state.form.Clinic} onChange ={this.searchClinic} onBlur={this.handleCheck}/>
        <div className={`searchname ${this.state.ClinicList.length===0?'p-0':null}`} style={this.state.ClinicList.length>4?{height:"15em",overflow:'auto'}:null} >
                {this.state.notFound?
                <div className='name p-3 text-center'>
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
    else if(this.state.select==='DR_Lab'){
        return (
            <div className = 'm-1 field name col-12'>
                <div className="label col-4">
            <label>نام آزمایشگاه * :</label>
            </div>
            <div className="value col-8">
                <div className='position-relative'>
            <input type='text' required placeholder = 'نام آزمایشگاه' value={this.state.form.lab} onChange ={this.searchLab} onBlur={this.handlecheck}/>
            <div className={`searchname ${this.state.LabList.length===0?'p-0':null}`} style={this.state.LabList.length>4?{height:"15em",overflow:'auto'}:null}>
                    {this.state.notFound?
                    <div className='name p-3 text-center'>
                    <span> مقادیر مورد نظر یافت نشد</span>
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
handleShow=()=>{
    if(this.state.select==='DR_Clinic'||this.state.select=='DR_Lab'){
        return(
            <div>
            <div className='m-1 field col-12'>
            <div className='label col-4'>
            <label>کد نظام پزشکی * :</label>
            </div>
            <div className='value col-8'>
            <input name='code' type='number' placeholder = 'کد نظام پزشکی' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
        </div>
        </div>
        <div className='m-1 field col-12'>
        <div className="label col-4">
        <label>تخصص * :</label>
        </div>
        <div className="col-8 value">
        <input name='proficiency' type='text' placeholder = 'تخصص' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
        </div>
        </div>
        </div>
        )
    }else if(this.state.select==='Secretary_Clinic'||this.state.select==='Secretary_Lab'){
        return(
            <div className='m-1 field col-12'>
            <div className='label col-4'>
            <label>کد پرسنلی * :</label>
            </div>
            <div className='value col-8'>
            <input name='code' type='number' placeholder = 'کد پرسنلی' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
        </div>
        </div>
        )
    }else if(this.state.select==='null') return null
}
handlesubmit(event){
    if(this.state.checkSubmit){
   if(this.state.checkEmail){
   if(this.state.password ===undefined||this.state.password.length<6){
   event.preventDefault();
   alert('رمز حداقل باید 6 حرفی باشد')
   }
   else{
    // const datareg ={}
    // datareg['code']=this.state.code
    // datareg['username']=this.state.username
    // datareg['password']=this.state.password
    // datareg['name']=this.state.name
    // datareg['family']=this.state.family
    // datareg['mobile']=this.state.mobile
    // datareg['email']=this.state.email
    // datareg['proficiency']=this.state.proficiency
    // datareg['institute_id']=this.state.form.institute_id
    // datareg['type_id']=this.state.type_id
    // axios({
    //     method: 'POST',
    //     url: `${DataStatic.domainIp}/CreateUser`,
    //     data : JSON.stringify(datareg),
    //     config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
    //                 "contentType": "application/json",
    //                 "mimeType": "multipart/form-data"
    //                 }
    // })
    // .then((response)=>{
    //     if(response.data===0){
    //         alert("لطفا همه مقادیر را پر کنید")
    //     }else if(response.data===1){
    //         alert('نام کاربری یا ایمیل تکراری میباشد')
    //     }else if(response.data===2){
    //         alert('نام آزمایشگاه یا مطب را به درستی وارد کنید')
    //     }else{
    //         alert('ثبت نام با موفقیت انجام شد')
    //         window.location.href='/login'
    //     }
        
    // })
    // .catch((err)=>{
    //     this.setState({error:true})
    // })
    }
 }else{
   alert('ایمیل خود را به درستی وارد کنید')
 }
}else{
    alert('لطفا همه مقادیر را پر کنید')
}
}
handleUpload=(env)=>{
    let accept=env.target.accept.split(',')
    if(accept.includes(env.target.files[0].type)){
        env.preventDefault();
        let reader = new FileReader();
        let file = env.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            FileUrl: reader.result
          });}
          reader.readAsDataURL(file)
    }else{

        env.target.value=''
        alert('موارد فقط از نوع عکس یا پی دی اف باید باشند')
    }
}
    render(){
        return(
            <div className='container'>
                <div className='col-lg-8 col-xs-12 main float-right'>
            
            <div className='form'>
            {
                    this.state.error?
                    <div className='error'>
                        <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                }
                    <h3 className='text-center'>ثبت نام </h3>

                    <div className = 'm-1 field col-12'>
                        <div className="col-4 label"></div>
                        <div className="value col-8">
                <select onClick={this.handlechange} name='select'>
                    <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
                    <option value="Sick_Clinic">کلینیک-بیمار</option>
                    <option value="DR_Clinic">کلینیک-پزشک</option>
                    <option value="Secretary_Clinic">کلینیک-منشی</option>
                    <option value="DR_Lab">آزمایشگاه-پزشک</option>
                    <option value="Secretary_Lab">آزمایشگاه-منشی</option>
                </select>
                </div>
                </div>
                {this.handleselect()}
                {this.handleShow()}
                {this.state.select==='Sick_Clinic'?
            <SignPatient/>
            :   
            <React.Fragment>
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
                    <label>موبایل * :</label>
                    </div>
                    <div className="col-8 value">
                    <input name='mobile' type='number' placeholder = 'موبایل' required value={this.state.form.mobile} onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                
                <div className='m-1 field col-12'>
                    <div className="col-4 label">
                    <label>سال تولد * :</label>
                    </div>
                    <div className="col-8 value">
                    <input name='birthday' type='number' placeholder = 'سال تولد' required value={this.state.form.birthday} onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className="label col-4">
                    <label>ایمیل * :</label>
                    </div>
                    <div className="value col-8">
                    <input name='email' type='email' placeholder = 'ایمیل' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                
                <div className='m-1 field col-12'>
                    <div className="label col-4">
                    <label>مجوز فعالیت * :</label>
                    </div>
                    <div className="value col-8">
                    <input type='file' required accept=".jpg,.png,.jpeg,application/pdf" onChange ={(env)=>this.handleUpload(env)}/>
                </div>
                </div>
                
                <div className='submit'>
                <button className='submit_sign' type='submit' onClick={this.handlesubmit}>ثبت نام</button>
                <Link to="/login">ورود</Link>
                </div>
                </React.Fragment>
                }
            </div>
            </div>
            </div>
         )
    }
}
