import React, { Component } from 'react';
import SignPatient from './SignPatient'
import ClinicDoctorSign from './ClinicDoctorSign'
import LabDoctorSign from './LabDoctorSign'
import ClinicSecretarySign from './ClinicSecretarySign'
import LabSecretarySign from './LabSecretarySign'
import { Link ,Redirect} from 'react-router-dom';
export default class sign extends Component{
    constructor(props){
        super(props);
        this.state ={
            checkEmail:false,
            checkSubmit : false,
            select:'null',
            error:false,
            Items:''
        }
    }
handlechange=(env)=>{
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
GetItems=(Item)=>{
    this.setState({Items:Item})
}
handleShow=()=>{
    if(this.state.select==='Sick_Clinic'){
        return <SignPatient/>
    }else if(this.state.select==='DR_Clinic'){
        return <ClinicDoctorSign select={this.state.select} GetItems={this.GetItems}/>
    }else if(this.state.select==='DR_Lab'){
        return <LabDoctorSign select={this.state.select} GetItems={this.GetItems}/>
    }else if(this.state.select==='Secretary_Clinic'){
        return <ClinicSecretarySign select={this.state.select} GetItems={this.GetItems}/>
    }else if(this.state.select==='Secretary_Lab'){
        return <LabSecretarySign select={this.state.select} GetItems={this.GetItems}/>
    }
}
handleSubmit=()=>{
    console.log(this.state.Items)
}
    render(){ 
        return(
            <div className='container'>
                <div className='col-lg-8 col-xs-12 main m-auto'>
            <div className='form h-100'>
            <div className="header">
                    <h3>Sign</h3>
                    </div>
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
                {this.handleShow()}
                {this.state.select==='null'||this.state.select==='Sick_Clinic'?
                this.state.select==='Sick_Clinic'?'':
                <div className='submit'>
                <Link to="/login">ورود</Link>
                </div>
                :
                <div className='submit'>
                <button className='submit_sign' type='submit' onClick={this.handleSubmit}>ثبت نام</button>
                <Link to="/login">ورود</Link>
                </div>
                }
            </div>
            </div>
            </div>
         )
    }
}
