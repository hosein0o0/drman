import React , {Component} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import DataStatic from '../staticData'
import Cookies from 'js-cookie'
export default class Prescription extends Component{
    constructor(props){
        super(props);
        this.state ={
            Token:Cookies.get('Token'),
            username :Cookies.get('username'),
            password : Cookies.get('password'),
            user_Type_name:this.props.data.user_Type_name,
            body :[],
            count : 0,
            add : false,
            remove: false,
            _isInput:'',
            _isLabel:'',
            form :{
                Patient_name:'',
                Patient_id:'',
                Lab_name:'',
                lab_id:'',
                clinic_id:this.props.data.institute_id
            },
            labList : [],
            PatientList:[],
            notfoundPatient:false,
            notfoundLab:false,
            error:false,
            showIcon:false
        }
    }
componentDidMount(){
    let test=document.getElementById('root')
    if(test.offsetWidth<797){
        this.setState({showIcon:true})
    }
}
    handlechange=(env)=>{
            this.setState({
            [env.target.name] : env.target.value
            })
        }
    serachPatient=(env)=>{
        if(env.target.value !==''){
            axios.get(`${DataStatic.domainIp}/Search_Patient?patient_name=${env.target.value}`,{
                headers: 
            {'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'api_token' : this.state.Token
            }
            })
            .then((response)=>{
                if(response.data===0){
                    // this.setState({notfound:false})
                }else if(response.data===1){
                    this.setState({notfoundPatient:true})
                }else{
                    this.setState({PatientList:response.data,notfoundPatient:false})
                }
            })
            .catch((err)=>{
                this.setState({error:true})
            })
            const data = this.state.form
            data['Patient_name']=null
            this.setState({form:data})
            }
        else if(env.target.value===''){
            setTimeout(()=>this.setState({notfoundPatient:false}),400);
            this.setState({PatientList:[]})
            } 
        }
    selectPatient=(env)=>{
        const data=this.state.form
        data['Patient_id']=env.id
        data['Patient_name']=env.name
        this.setState({form:data,PatientList:[]})
    }
    searchLab=(env)=>{
            if(env.target.value !==''){
            axios.get(`${DataStatic.domainIp}/Search_Lab?lab_name=${env.target.value}`)
            .then((response)=>{
                if(response.data===0){
                    
                }else if(response.data===1){
                    this.setState({notfoundLab:true})
                }else{
                    this.setState({labList:response.data,notfoundLab:false})
                }
            })
            .catch((err)=>{
                this.setState({error:true})
            })
            const data = this.state.form
            data['Lab_name'] = null
            this.setState({form : data})
        }else if(env.target.value===''){
            setTimeout(()=>this.setState({notfoundLab:false}),400);
          this.setState({labList:[]})
        } 
    }
    selectLab=(env)=>{
        const data=this.state.form
        data['Lab_name']=env.name
        data['lab_id']=env.id
        this.setState({form:data,labList:[]})
    }
    handlecheck=(env)=>{
        if(env.target.value===''){
            env.target.style.border ='1px solid #ff0d0d'
        }else if(env.target.value!==''){
            env.target.style.border='1px solid #c7c4c4'
        }
    }
    handelAdd=()=>{
        if(this.refs.first.value !==''){
            const data ={}
           
            data['Test_name']=this.state._isLabel
            if(this.state._isInput!==''){
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
        let state=this.state
        let check=state.form.lab_id===''||state.form.Patient_id===''||state.form.clinic_id===''||state.body.length===0
        if(check){
            alert('لطفا همه مقادیر را پر کنید')
        }
        else{
            const datareg={}
            datareg['patient_id']=state.form.Patient_id,
            datareg['lab_id']=state.form.lab_id
            datareg['clinic_id']=state.form.clinic_id
            datareg['body']=this.state.body
            if(this.state.Token){
                axios.post(`${DataStatic.domainIp}/CreatePrescription`,datareg,
                    {
                      headers: 
                      {'Access-Control-Allow-Origin': '*',
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'api_token' : this.state.Token
                      }
                    })
                    .then(function (response) {
                      if(response.data===0){
                          alert('شما دکتر نیستید')
                      }else if(response.data===1){
                          alert('لطفا همه مقادیر را پر کنید')
                      }else if(response.data===2){
                          alert('آزمایشگاه پیدا نشد')
                      }else if(response.data===3){
                          alert('بیمار پیدا نشد')
                      }else if(response.data===4){
                          alert('کلینیک مورد نظر یافت نشد')
                      }else{
                          alert('ثبت نسخه با موفقیت انجام شد')
                          window.location.reload(true)
                      }
                    })
                    .catch((err)=>{
                      this.setState({error:true})
                    });
                    }
        }
    
    }
    LogOut=()=>{
        Cookies.remove('Token')
        Cookies.remove('password')
        Cookies.remove('user_Type_name')
        window.location.reload(true)
    }
    render(){
        if(this.state.password&&this.state.username&&this.state.Token){
            if(this.state.user_Type_name==='secretaryclinic'||this.state.user_Type_name==='drclinic'){

        return(
            <div className='col-md-6 col-12 mr-auto mt-3 ml-auto'>
        <div className='form'>
        {
        this.state.error?
        <div className='error'>
        <span>ارتباط با سرور برقرار نشد</span>
        </div>
        :
        ''
        }
        <div className="header">
                <h3>ثبت نسخه</h3>
                </div>
                <div className = 'm-1 field name col-12'>
                    <div className='label col-4'>
                    <label>نام و نام خانوادگی بیمار  * :</label>
                    </div>
                    <div className='col-8'>
                    <div className='position-relative'>
                    <input name='sick_name' type='text' required placeholder = 'نام بیمار' value={this.state.form.Patient_name} onChange={this.serachPatient} onBlur={this.handlecheck}/>
                    <div className={`searchname ${this.state.PatientList.length===0?'p-0':null}`} style={this.state.PatientList.length>4?{height:"15em",overflow:'auto'}:null}>
                    {
                    this.state.notfoundPatient?
                    <div className='name p-3 text-center' style={{justifyContent:'center'}}>
                    <span> مقادیر مورد نظر یافت نشد</span>
                    </div>
                    :
                    this.state.PatientList.map((data,key)=>
                    <div className='name' key={key}>
                        <label onClick={()=>this.selectPatient(data)}>{data.name}</label>
                </div>    
                )
                        }
                </div>
                </div>
                </div>
                </div>


                 <div className = 'm-1 field name col-12'>
                 <div className='label col-4'>
                    <label>نام آزمایشگاه * :</label>
                    </div>
                    <div className='value col-8'>
                    <div className='position-relative'>
                    <input className="mb-0" name='laboratory' type='text' required value={this.state.form.Lab_name} placeholder = 'نام آزمایشگاه' onChange={this.searchLab} onBlur={this.handlecheck}/>
                    <div className={`searchname ${this.state.labList.length===0?'p-0':null}`} style={this.state.labList.length>4?{height:"15em",overflow:'auto'}:null}>
                        
                    {
                    this.state.notfoundLab?
                    <div className='name p-3 text-center' style={{justifyContent:'center'}}>
                    <span> مقادیر مورد نظر یافت نشد</span>
                    </div>
                    :    
                    this.state.labList.map((data,key)=>
                    <div className='name' key={key}>
                        <label onClick={()=>this.selectLab(data)}>{data.name}</label>
                </div>    
                )
                    }
                </div>
                </div>
                </div>
                </div>
                    

                    <div className='titr text-center pt-3'>
                        <label>آزمایشات</label>
                    </div>
                {this.state.body.map((data,key)=>
                    <div className='m-1 field col-12' key={key}>
                        <div className='label col-4'>
                    <label>{data.Test_name} :</label>
                    </div>
                    <div className='mt-2 value col-8 name_field' style={data.Items?{border:'1px solid #c7c4c4'}:{border:'none'}}>
                        <div className='position-relative'>
                    <span>
                    {data.Items?data.Items.join():data.Items}<span className='position-absolute' style={{left:'0.5em'}} onClick={()=>this._handelClose(key)}><i className="fa fa-times"></i></span></span>
                    </div>
                    </div>
                </div>    
                )}
                <div className = 'm-1 field col-12'>
                    <div className='label col-4'>
                <label><div className="desired mt-3"><input ref='first' style={{width: '100%'}} onChange={(ev)=>this.setState({_isLabel:ev.target.value })} placeholder='نام آزمایش'/> </div></label>
                </div>
                <div className='value col-8'>
                <div className className='position-relative'>
                <div className='notification'>
                        <label>لطفا موارد را با <big>" , "</big> از هم جدا کنید</label>
                    </div>
                <input className='mt-3' ref='second' placeholder = 'موارد' onChange={(ev)=>this.setState({_isInput:ev.target.value})}/>
                </div>
                </div>
                </div>

                <div className="addField text-right">
                    <button onClick={this.handelAdd}><i className='fa fa-plus'></i>
                    </button>
                </div>


                <div className='submit'>
                <button className='submit_sign'  type='submit' onClick={this.handleSubmit}>ثبت نسخه</button>
                </div>
        </div>
        </div>
        )
        }
    }else return <Redirect to='/' />
        
    }
}