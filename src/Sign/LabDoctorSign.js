import React , {Component} from 'react'
import DataStatic from '../staticData'
import axios from 'axios';
export default class ClinicDoctorSign extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                institute_id:'',
                mobile:'',
                lab:''
            },
            nameLab:[],
            idLab:[],
            LabList:[],
            city:'null',
            state:'null',
            region:'null',
            type_id:'',
            error:false
        }
    }
componentDidMount(){
    axios.get(`${DataStatic.domainIp}/ListTypeUser`)
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
            if(this.props.select==='DR_Lab'&&response.data[i].name==='drlab'){
                    this.setState({type_id:response.data[i].id})
           }
        }
    })
    .catch((err)=>{
        this.setState({error:true})
    })
}
handlechange=(env)=>{
    this.setState({[env.target.name]:env.target.value})

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
    }else if(env.target.name==='mobile'){
        const { value, maxLength } = env.target;
            const data = this.state.form
            const message = value.slice(0,11)
            data['mobile']=message
            this.setState({form:data})
    }
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
    }else if(env.target.name==='email'){
        if(env.target.value.includes("@")){
        env.target.parentElement.children[0].style.color=null 
        env.target.style.border='1px solid #c7c4c4'
      }
      else if(env.target.value ===''||!env.target.value.includes("@")){
          env.target.style.border = '1px solid #ff0d0d'
      }
    }
    else {
        env.target.style.border = '1px solid #c7c4c4'
    }
}
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
    data['lab']=''
    this.setState({LabList:[],nameLab:[...this.state.nameLab,env.name],idLab:[...this.state.idLab,env.id]})
}
handleCloseLab=(id)=>{
    const {nameLab , idLab}=this.state
    nameLab.splice(id,1)
    idLab.splice(id,1)
    this.setState({nameLab:nameLab,idLab:idLab})
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

    // this.state.nameClinic.filter((item,index)=>this.state.nameClinic.indexOf(item)===index);
    // let newList=this.state.nameClinic.reduce((unique , item)=>
    // unique.includes(item)?unique:[...unique,item],[]
    // )
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
            {this.state.idLab.length===0?
            ''
            :
            <div className='m-1 field col-12'>
            <div className='label col-4'>
            <label>آزمایشگاه ها * :</label>
            </div>
            <div className='value list col-8'>
            <p className='row'>
            {
                this.state.nameLab.map((data,key)=>
                <span className='m-1'>{data} <i className='fa fa-close p-1' onClick={()=>this.handleCloseLab(key)}></i></span>
                )
            }
            </p>
            </div>
            </div>
            }

        
           <div className = 'm-1 field name col-12'>
            <div className='label col-4'>
            <label>نام آزمایشگاه * :</label>
            </div>
            <div className="value col-8">
            <div className='position-relative'>
            <input type='text' required placeholder = 'نام آزمایشگاه' value={this.state.form.lab} onChange ={this.searchLab} onBlur={this.handleCheck}/>
        <div className={`searchname ${this.state.LabList.length===0?'p-0':null}`} style={this.state.LabList.length>4?{height:"15em",overflow:'auto'}:null} >
                {this.state.notFound?
                <div className='name p-3 text-center'>
                    <span> مقادیر مورد نظر یافت نشد</span>
                </div>
                :
                this.state.LabList.map((data,key)=>
                <div className='name' key={key}>
                <label onClick={()=>this.selectLab(data)}>{data.name}</label>
                </div>    
                    )
                        
                    }
                </div>
        </div>
        </div>
        </div>

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
                    <div className="label col-4">
                    <label>ایمیل ثبت شده در نظام پزشکی*:</label>
                    </div>
                    <div className="value col-8">
                    <input name='email' type='text' placeholder = 'ایمیل' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                <div className='m-1 field col-12'>
                    <div className="label col-4">
                    <label>مجوز فعالیت * :</label>
                    </div>
                    <div className="value col-8">
                    <input type='file' required accept="image/jpg,image/png,image/jpeg,image/x-png,application/pdf" onChange ={(env)=>this.handleUpload(env)}/>
                </div>
                </div>
                </React.Fragment>
    )
}
}