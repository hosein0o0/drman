import React ,{Component} from 'react';
import axios from 'axios';
import DataStatic from '../staticData';
import Cookies from 'js-cookie';
import { Link ,Redirect} from 'react-router-dom';
export default class DeletePrescription extends Component{
    constructor(props){
        super(props);
        this.state={
            Token:Cookies.get('Token'),
            username:Cookies.get('username'),
            password:Cookies.get('password'),
            user_Type_name:this.props.user_Type_name,
            institute_id:this.props.id,
            error:false,
            Redirect:false
        }
    }
HandleDelete=()=>{
    axios.get(`${DataStatic.domainIp}/Delete_Prescription?prescription_id=${this.props.id}`,{
        headers: 
        {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'api_token' : this.state.Token
        }
      })
      .then((response)=>{
          if(response.data===0){
              alert('حذف نسخه با موفقیت انجام شد')
            //   window.location.href='/List_prescription'
            this.setState({Redirect:true})
          }else if(response.data===1){
              alert('دسترسی ممکن نیست')
          }else if(response.data===2){
              alert('به روز رسانی امکان پذیر نیست زیرا نسخه از طرف آزمایشگاه پذیرفته شده است')
          }else if(response.data===2){
              alert('نسخه ای یافت نشد')
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
    if(this.state.Token||this.state.username||this.state.password||this.state.user_Type_name){
        if(this.state.user_Type_name==='drclinic'){
    return(
        <div className='col-12'>
            <div className='row'>
                <div className='background'>
                {
                    this.state.error?
                    <div className='error'>
                    <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                    }
                <div className='box'>
                <div className='p-1 text-right'>
                    <div className='head h-auto P-3'>
                    <label>آیا شما مطمئن به حذف نسخه بیمار {this.props.patient_name}  هستید؟</label>
                    </div>
                    <div className='select'>
                        <button onClick={()=>this.props.HandleDelete(false)} style={{backgroundColor:'rgb(245, 60, 60)'}}> <i className="fa fa-times"></i> خیر </button>
                        <button style={{backgroundColor:'rgb(44, 255, 0)'}} onClick={this.HandleDelete}> <i className="fa fa-check"></i> بله</button>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
        }else return <Redirect to='/List_prescription' />
    }else return <Redirect to='/' />
}
}
}