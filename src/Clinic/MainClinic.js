import React , {Component} from 'react'
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie'
import SideBar from './sidebar'
import Prescription from './prescription'
import List_prescription from './List_prescription'
import SignPatient from '../Sign/SignPatient'
export default class MainClinic extends Component{
    constructor(props){
        super(props);
        this.state ={
            Token:Cookies.get('Token'),
            username :Cookies.get('username'),
            password : Cookies.get('password'),
            user_Type_name:this.props.location.state?this.props.location.state.user_Type_name:null,
            showIcon:false,
            show:this.props.location.state?
            this.props.location.state.user_Type_name==='drclinic'?'NewPrescription':'ListPrescription'
            :null
        }
    }
    componentDidMount(){
        if(document.getElementById('root').offsetWidth<797){
            this.setState({showIcon:true})
        }
    }
    ChangeShow=(env)=>{
        this.setState({show:env})
    }
    handleShow=()=>{
        if(this.state.show==='NewPrescription') return <Prescription data={this.props.location.state}/>
        else if(this.state.show==='ListPrescription') return <List_prescription ChangeShow={this.ChangeShow} data={this.props.location.state}/>  
        else if(this.state.show==='Patient_Registration') return (
            <div className='col-lg-7 col-12 m-auto'>
            <div className='form h-100'>
        <SignPatient />
        </div>
        </div>
        )
    }
    render(){
        if(this.props.location.state){
        if(this.state.password&&this.state.username&&this.state.Token){
            if(this.state.user_Type_name==='secretaryclinic'||this.state.user_Type_name==='drclinic'){
        return(
            <div className='col-12'>
                <div className='row'>
            {this.handleShow()}
        <div className='col-md-2 col-6'>
            <SideBar showIcon={this.state.showIcon} data={this.props.location.state} ChangeShow={this.ChangeShow} show={this.state.show}/>
        </div>
        </div>
        </div>
        )
    }else return <Redirect to='/' />
        }else {
            return <Redirect to="/"/> 
        }
    }else return <Redirect to="/"/>
    }
}