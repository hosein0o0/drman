import React ,{Component} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import DataStatic from '../staticData';
import Cookies from 'js-cookie'
import SideBar from './sidebar'
export default class EditPrescription extends Component{
    constructor(props){
        super(props);
        this.state={
            Token:Cookies.get('Token'),
            form:{
                patient_name:this.props.location.state===undefined?'':this.props.location.state.managers.patient_name,
                patient_id:'',
                lab_name:this.props.location.state===undefined?'':this.props.location.state.managers.lab_name,
                lab_id:''
            },
            clinic_id:this.props.location.state?this.props.location.state.institute_id:null,
            user_Type_name:this.props.location.state?this.props.location.state.user_Type_name:null,
            PatientList:[],
            LabList:[],
            notFound:false,
            notFoundLab:false,
            body:this.props.location.state===undefined?[]:this.props.location.state.managers.body,
            error:false,
            Redirect:false,
            Edit:false
        }
    }
SearchPatient=(env)=>{
    if(env.target.value!==''){
        axios.get(`${DataStatic.domainIp}/Search_Patient?patient_name=${env.target.value}`,{
        headers: 
            {'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'api_token' : this.state.Token
            }
          })
          .then((response)=>{
              if(response.data===0){
                alert('لطفا نام بیمار را جستجو کنید')
              }else if(response.data===1){
                  this.setState({notFound:true})
              }else{
                  this.setState({notFound:false,PatientList:response.data})
              }
          })
          .catch((err)=>{
            this.setState({error:true})
          })
          const data=this.state.form
          data[env.target.name]=null
          this.setState({form:data})
    }else {
        this.setState({PatientList:[]})
        setTimeout(()=>{this.setState({notFound:false})},300);
    }
}
selectPatient=(env)=>{
    const data=this.state.form
    data['patient_name']=env.name
    data['patient_id']=env.id
    this.setState({form:data,PatientList:[]})
}
SearchLab=(env)=>{
    if(env.target.value!==''){
        axios.get(`${DataStatic.domainIp}/Search_Lab?lab_name=${env.target.value}`)
        .then((response)=>{
            if(response.data===0){
                alert('لطفا نام آزمایشگاه را جستجو کنید')
            }else if(response.data===1){
                this.setState({notFoundLab:true})
            }else{
                this.setState({LabList:response.data,notFoundLab:false})
            }
        })
        .catch((err)=>{
            this.setState({error:true})
        })
        const data=this.state.form
        data[env.target.name]=null
        this.setState({form:data})
    }else{
        this.setState({LabList:[]})
        setTimeout(()=>{this.setState({notFoundLab:false})},300);
    }
}
SelectLab=(env)=>{
    const data=this.state.form
    data['lab_name']=env.name
    data['lab_id']=env.id
    this.setState({form:data,LabList:[]})
}
handelAdd=()=>{
    if(this.refs.first.value !==''){
        const data ={}
        data['Test_name']=this.state._isLabel
        if(this.state._isInput===undefined){
            null
        }
        else if(this.state._isInput!==''){
        if(this.state._isInput.includes(',')){
        data["Items"] = this.state._isInput.split(',')
        }
        else{
        data["Items"] =[this.state._isInput]
        }
    }else null
        this.setState({body:[...this.state.body,data],_isInput:''})
        this.refs.first.style.border= '1px solid #c7c4c4'
        this.refs.second.style.border= '1px solid #c7c4c4'
        this.refs.first.value =''
        this.refs.second.value =''
        }else if(this.refs.first.value===''){
            this.refs.first.style.border = '1px solid #ff0d0d'
    }
}
_handelClose=(name)=>{
    const data = this.state.body
    data.splice(name,1)
    this.setState({body:data})
}
handleSubmit=()=>{
const datareg={}
datareg['patient_id']=this.state.form.patient_id===''?this.props.location.state.managers.patient_id:this.state.form.patient_id,
datareg['lab_id']=this.state.form.lab_id===''?this.props.location.state.managers.lab_id:this.state.form.lab_id,
datareg['clinic_id']=this.state.clinic_id,
datareg['body']=this.state.body,
datareg['lab_take_at']=null,
datareg['lab_result_at']=null,
datareg['result']=null,
datareg['description']=null,
datareg['agree']=0
axios.post(`${DataStatic.domainIp}/Update_Prescription_Clinic?prescription_id=${this.props.location.state.managers.id}`,datareg,
{
    headers: 
    {'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'api_token' : this.state.Token
    }
  })
.then((response)=>{
    if(response.data===0){
        alert('بروز رسانی نسخه با موفقیت انجام شد')
        this.setState({Redirect:true,Edit:true})
        // window.location.reload(true)
    }else if(response.data===1){
        alert('لطفا مقادیر را پر کنید')
    }else if(response.data===2){
        alert('نسخه ای یافت نشد')
    }else if(response.data===3){
        alert('دسترسی ممکن نیست')
    }else if(response.data===4){
        alert('به روز رسانی امکان پذیر نیست زیرا نسخه ای از طرف آزمایشگاه پذیرفته شده است')
    }else if(response.data===5){
        alert('مطب یافت نشد')
    }else if(response.data===6){
        alert('موسسه از نوع کلینیک نمیباشد')
    }else if(response.data===7){
        alert('برای کلینیک مورد نظر نسخه ای تجویز نمیشود')
    }
})
.catch((err)=>{
    this.setState({error:true})
})
}
render(){
    if(this.state.Redirect){
        return <Redirect to={{pathname:`/prescription`,state:{user_Type_name:this.state.user_Type_name,institute_id:this.state.clinic_id}}} />
    }else{
    if(this.state.Token){
        if(this.state.user_Type_name==='drclinic'){
        if(this.props.location.state===undefined){
            return <Redirect to='./prescription' />
        }else{
            return(
            <div className='col-12'>
                <div className='row'>
                    <div className='col-md-7 col-12 mt-5 mr-auto ml-auto'>
                    {
                    this.state.error?
                    <div className='error'>
                    <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                    }
                    <div className='col-12 m-auto'>
                    <div className='form'>
                
                <div className='m-1 field name col-12'>
                    <div className='label col-4'>
                    <label>نام بیمار :</label>
                    </div>
                    <div className="value col-8">
                <div className='position-relative'>
            <input name='patient_name' type='text'  placeholder = 'نام بیمار' value={this.state.form.patient_name}  onChange ={this.SearchPatient}/>
            <div className={`searchname ${this.state.PatientList.length===0?'p-0':null}`} style={this.state.PatientList.length>4?{height:"15em",overflow:'auto'}:null}>
                    {this.state.notFound?
                    <div className='name p-3 text-center'>
                    <span> بیمار مورد نظر یافت نشد</span>
                    </div>
                    :
                    this.state.PatientList.map((data,key)=>
                    <div className='name' key={key} >
                        <label onClick={()=>this.selectPatient(data)}>{data.name}</label>
                </div>    
                )
                        }
                </div>
        </div>
        </div>
                </div>
                <div className='m-1 field name col-12'>
                    <div className='label col-4'>
                    <label>نام آزمایشگاه :</label>
                    </div>
                    <div className="value col-8">
                <div className='position-relative'>
            <input name='lab_name' type='text'  placeholder = 'نام آزمایشگاه' value={this.state.form.lab_name}  onChange ={this.SearchLab}/>
            <div className={`searchname ${this.state.LabList.length===0?'p-0':null}`} style={this.state.LabList.length>4?{height:"15em",overflow:'auto'}:null}>
                    {this.state.notFoundLab?
                    <div className='name p-3 text-center'>
                    <span> آزمایشگاه مورد نظر یافت نشد</span>
                    </div>
                    :
                    this.state.LabList.map((data,key)=>
                    <div className='name' key={key} >
                        <label onClick={()=>this.SelectLab(data)}>{data.name}</label>
                </div>    
                )
                        }
                </div>
                </div>
                </div>
                </div>
                {this.state.body.map((data,key)=>
                    <div className='m-1 field col-12' key={key}>
                        <div className='label col-4'>
                    <label>{data.Test_name} :</label>
                    </div>
                    <div className='mt-2 value col-8 name_field position-relative' style={!data.Items?{border:'none'}:{border:'1px solid #c7c4c4'}}>
                    <span >
                    {data.Items?data.Items.join():data.Items}<span className='position-absolute' style={{left:'0.5em'}} onClick={()=>this._handelClose(key)}><i className="fa fa-times"></i></span>
                    </span>
                    </div>
                </div>    
                )}
                <div className = 'm-1 field col-12'>
                    <div className='label col-4'>
                <label><div className="desired mt-3"><input ref='first' style={{width: '100%'}} onChange={(ev)=>this.setState({_isLabel:ev.target.value })} placeholder='نام آزمایش'/> </div></label>
                </div>
                <div className='value col-8 position-relative'>
                <div className='notification'>
                        <label>لطفا موارد را با <big>" , "</big> از هم جدا کنید</label>
                    </div>
                <input className='mt-3' ref='second' placeholder = 'موارد' onChange={(ev)=>this.setState({_isInput:ev.target.value})}/>
                </div>
                </div>

                <div className="addField text-right">
                    <button onClick={this.handelAdd}><i className='fa fa-plus'></i>
                    </button>
                </div>

                <div className='submit mt-3'>
                <button className='submit_sign' type='submit' onClick={this.handleSubmit}>ذخیره تغییرات</button>
                </div>
            </div>
                        </div>
                        </div>
                        <div className='col-md-2 col-6'>
                            <SideBar institute_id={this.state.clinic_id} user_Type_name={this.state.user_Type_name} managers={this.props.location.state.managers} showIcon={this.props.location.state.showIcon} Edit={this.state.Edit}/>
                        </div>


                    </div>
            </div>
        )
    }
}else return <Redirect to='./singlePrescription' />
}else return <Redirect to='./' />
}
}
}