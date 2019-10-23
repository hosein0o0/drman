import React , {Component} from 'react'
import DataStatic from '../staticData'
import axios from 'axios';
import Cookies from 'js-cookie'
import { Link ,Redirect} from 'react-router-dom';
export default class ClinicDoctorSign extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                // Clinic:'',
                // institute_id:'',
                // mobile:'',
                // lab:''
            },
            // nameClinic:[],
            idClinic:[],
            ClinicList:[],
            // state:'null',
            // city:'null',
            // region:'null',
            type_id:'',
            error:false,
            Token:Cookies.get('Token'),
            CityList:[],
            notFound:'',
            RegionList:[],
            region:1,
            mobile:'',
            Tel:'',
            BirthDay:""
        }
    }
componentDidMount(){
    axios.get(`${DataStatic.domainIp}/ListTypeUser`)
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
           if(this.props.select==='Clinic'&&response.data[i].name==='drclinic'){
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
            const data = this.state
            const message = value.slice(0,11)
            data['mobile']=message
            this.setState(data)
    }else if(env.target.name==='Tel'){
        const { value, maxLength } = env.target;
            const data = this.state
            const message = value.slice(0,11)
            data['Tel']=message
            this.setState(data)
    }else if(env.target.name==='BirthDay'){
        const { value } = env.target;
            const data = this.state
            const message = value.slice(0,4)
            data['BirthDay']=message
            this.setState(data)
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
    }else if(env.target.name==='BirthDay'){
        const { value } = env.target;
            const data = this.state
            if(value.length===2){
                data['BirthDay']=13+''+value
                this.setState(data)
            }
    }
    else {
        env.target.style.border = '1px solid #c7c4c4'
    }
}
    }
searchClinic=(env)=>{
        if(env.target.value!==''){
            axios.get(`${DataStatic.domainIp}/Search_Clinic_Name?clinic_name=${env.target.value}`)
            .then((response)=>{
                if(response.data===0){
                    env.target.style.border='1px solid #ff0d0d';
                    this.setState({notFound:'Clinic'})
                }
                else if(response.data===1){
                    this.setState({ClinicList:[],notFound:'Clinic'})
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
searchClinicRegion=(env)=>{
    // if(env.target.value!==''){
    //     axios.get(`${DataStatic.domainIp}/Search_Clinic_Region?region_id=${}`)
    //     .then((response)=>{
    //         if(response.data===0){
    //             this.setState({notFound:'Region'})
    //         }else if(response.data===1){
    //             this.setState({notFound:'Region'})
    //         }else{
    //             this.setState({RegionList:response.data})
    //         }
    //     })
    // }else {
    //     setTimeout(() =>this.setState({notFound:'',RegionList:[]}), 1000);
    // }
}
selectClinic=(env)=>{
const data=this.state.form
data['Clinic']=''
this.setState({ClinicList:[],nameClinic:[...this.state.nameClinic,env.name],idClinic:[...this.state.idClinic,env.id]})
}

handleCloseClinic=(id)=>{
    const { nameClinic , idClinic }= this.state
    nameClinic.splice(id,1);
    idClinic.splice(id,1)
    this.setState({nameClinic:nameClinic,idClinic:idClinic})
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
SearchCity=(env)=>{
    if(env.target.value!==''){
        axios.get(`${DataStatic.domainIp}/Search_City?city=${env.target.value}`)
        .then((response)=>{
            if(response.data===0){
                this.setState({notFound:'City'})
            }else if(response.data===1){
                this.setState({notFound:'City'})
            }else{
                this.setState({CityList:response.data})
            }
        })
        .catch((err)=>{
            this.setState({error:true})
        })
    }else {
        setTimeout(() =>this.setState({notFound:'',CityList:[]}), 1000);
    }
    const data=this.state
    data['cityName']=undefined
    this.setState(data)
}
SearchRegion=(env)=>{
    if(env.target.value!==''){
        axios.get(`${DataStatic.domainIp}/Search_Region?region=${env.target.value}&city_id=${this.state.city}`)
        .then((response)=>{
            if(response.data===0){
                this.setState({notFound:'Region'})
            }else if(response.data===1){
                this.setState({notFound:'Region'})
            }else{
                this.setState({RegionList:response.data})
            }
        })
    }else {
        setTimeout(() =>this.setState({notFound:'',RegionList:[]}), 1000);
    }
}
render(){
    if(this.state.Token===window.location.href.split('/').slice(-1)[0]){
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
                <div className = 'm-1 field name col-12'>
                <div className="col-4 label">
                    <label>شهر</label>
                </div>
            <div className="value col-8">
                <div className='position-relative'>
            <input type='text' required placeholder = 'شهر' value={this.state.cityName}  onChange={this.SearchCity} />
        <div className={`searchname ${this.state.CityList.length===0?'p-0':null}`} style={this.state.CityList.length>4?{height:"15em",overflow:'auto'}:null} >
        {this.state.notFound==='City'?
                <div className='name p-3 text-center'>
                    <span> شهر مورد نظر یافت نشد</span>
                </div>
                :
                this.state.CityList.map((data,key)=>
                <div className='name' key={key}>
                <label onClick={()=>this.setState({city:data.id,cityName:data.name,CityList:[]})}>{data.name}</label>
                </div>    
                    )
                        
                    }
                </div>
                </div>
                </div>
                </div>
                {this.state.city?
                <div className = 'm-1 field name col-12'>
                <div className="col-4 label">
                    <label>منطقه</label>
                </div>
            <div className="value col-8">
                <div className='position-relative'>
            <input type='text' required placeholder = 'منطقه' value={this.state.regionName}  onChange={this.SearchRegion} />
        <div className={`searchname ${this.state.RegionList.length===0?'p-0':null}`} style={this.state.RegionList.length>4?{height:"15em",overflow:'auto'}:null} >
        {this.state.notFound==='Region'?
                <div className='name p-3 text-center'>
                    <span> منطقه مورد نظر یافت نشد</span>
                </div>
                :
                this.state.RegionList.map((data,key)=>
                <div className='name' key={key}>
                <label onClick={()=>this.setState({region:data.id,regionName:data.name,RegionList:[]})} >{data.name}</label>
                </div>    
                    )
                        
                    }
                </div>
        </div>
        </div>
                </div>
                :''}

            {this.state.idClinic.length===0?
            ''
            :
            <div className='m-1 field col-12'>
            <div className='label col-4'>
            <label>مطب ها * :</label>
            </div>
            <div className='value list col-8'>
            <p className='row'>
            {
                this.state.nameClinic.map((data,key)=>
                <span className='m-1'>{data} <i className='fa fa-close p-1' onClick={()=>this.handleCloseClinic(key)}></i></span>
                )
            }
            </p>
            </div>
            </div>
            }

            <div className = 'm-1 field name col-12'>
            <div className='label col-4'>
            <label>نام مطب * :</label>
            </div>
            <div className='col-8'>
            <div className="value">
            <div className='position-relative'>
            <input type='text' required placeholder = 'نام مطب' value={this.state.form.Clinic} onChange ={this.searchClinic} onBlur={this.handleCheck}/>
        <div className={`searchname ${this.state.ClinicList.length===0?'p-0':null}`} style={this.state.ClinicList.length>4?{height:"15em",overflow:'auto'}:null} >
                {this.state.notFound==='Clinic'?
                <div className='name p-3 text-center'>
                    <span> کیلنیک مورد نظر یافت نشد</span>
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
        {this.state.region?
        <div className="value">
            <div className='position-relative'>
            <input type='text' required placeholder = 'نام مطب' value={this.state.form.Clinic} onChange ={this.searchClinicRegion} onBlur={this.handleCheck}/>
            <div className='position-absolute location'>
            <i className="fa fa-search-location"></i>
            </div>
        <div className={`searchname ${this.state.ClinicList.length===0?'p-0':null}`} style={this.state.ClinicList.length>4?{height:"15em",overflow:'auto'}:null} >
                {this.state.notFound==='Clinic'?
                <div className='name p-3 text-center'>
                    <span> کیلنیک مورد نظر یافت نشد</span>
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
        :''}
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
                    <input name='mobile' type='number' placeholder = 'موبایل' required value={this.state.mobile} onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className="col-4 label">
                    <label>تلفن * :</label>
                    </div>
                    <div className="col-8 value">
                    <input name='Tel' type='number' placeholder = 'تلفن' required value={this.state.Tel} onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                <div className='m-1 field col-12'>
                    <div className="col-4 label">
                    <label>سال تولد * :</label>
                    </div>
                    <div className="col-8 value">
                    <input name='BirthDay' type='number' placeholder = 'سال تولد' required value={this.state.BirthDay} onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                <div className='m-1 field col-12'>
                    <div className="label col-4">
                    <label>مجوز فعالیت * :</label>
                    </div>
                    <div className="value col-8">
                    <input type='file' required accept="image/jpg,image/png,image/jpeg,image/x-png,application/pdf" onChange={(env)=>this.handleUpload(env)}/>
                </div>
                </div>
                <div className='submit'>
                <button className='submit_sign' type='submit' onClick={this.handleSubmit}>ثبت نام</button>
                <Link to="/login">ورود</Link>
                </div>
                </React.Fragment>
    )
} else return <Redirect to='/' />
}
}