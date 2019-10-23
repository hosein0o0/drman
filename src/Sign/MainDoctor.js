import React , {Component} from 'react'
import DataStatic from '../staticData'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie'
import ClinicDoctorSign from './ClinicDoctorSign'
import LabDoctorSign from './LabDoctorSign'
export default class MainDoctor extends Component{
    constructor(props){
        super(props);
        this.state={
            select:'Clinic',
            Token:Cookies.get('Token')
        }
    }
handleShow=()=>{
    if(this.state.select==='Clinic') return <ClinicDoctorSign select={this.state.select}/>
    else if(this.state.select==='Lab') return <LabDoctorSign  select={this.state.select}/>
}
render(){
    // console.log(this.props.GetItems)
    // this.state.nameClinic.filter((item,index)=>this.state.nameClinic.indexOf(item)===index);
    // let newList=this.state.nameClinic.reduce((unique , item)=>
    // unique.includes(item)?unique:[...unique,item],[]
    // )
    if(this.state.Token===window.location.href.split('/').slice(-1)[0]){
    return(
        <div className='col-12'>
        <div className='container'>
        <div className='col-lg-8 col-xs-12 main m-auto'>
    <div className='form h-100'>
            {
                    this.state.error?
                    <div className='error'>
                        <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                }
                <div className = 'm-1 field col-12'>
                        <div className="col-4 label"></div>
                        <div className="value col-8">
                <select onClick={(env)=>this.setState({[env.target.name]:env.target.value})} name='select'>
                    <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
                    <option value="Clinic">کلینیک</option>
                    <option value="Lab">آزمایشگاه</option>
                </select>
                </div>
                </div>
                {this.handleShow()}
                </div>
                </div>
                </div>
                </div>
    )
} else return <Redirect to='/' />
}
}