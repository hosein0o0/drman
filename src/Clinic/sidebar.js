import React , {Component} from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
export default class SideBar extends Component{
    constructor(props){
        super(props);
        this.state={
            select:this.props.data?this.props.data.user_Type_name==='drclinic'?'NewPrescription':'ListPrescription':null,
            CheckMenu:false,
        }
    }
componentDidMount(){
    if(this.props.data){
        if(this.props.data.back){
        this.props.ChangeShow('ListPrescription');
        this.setState({select:'ListPrescription'})
        }
    }
}
LogOut=()=>{
        Cookies.remove('Token')
        Cookies.remove('password')
        Cookies.remove('username')
        window.location.reload(true)
}
render(){
    return(
        <React.Fragment>
        <div id='sidebar' className={`col-12 col-md-2 sidebar p-0 ${this.props.showIcon?this.state.CheckMenu?'checkmenu':'closemenu':''}`} style={this.props.showIcon?this.state.CheckMenu?{right:'0em'}:{right:'-20em'}:null}>
            {this.props.data?
            <React.Fragment>
            {this.props.data.user_Type_name==='drclinic'?
            <div className={`field ${this.state.select==='NewPrescription'?'change':''}`} onClick={()=>{this.props.ChangeShow('NewPrescription');this.setState({select:'NewPrescription',CheckMenu:false})}}>
                <label>ثبت نسخه جدید <i className="fas fa-plus"></i></label>
            </div>
            :''}
            <div className={`field ${this.state.select==='ListPrescription'?'change':''}`} onClick={()=>{this.props.ChangeShow('ListPrescription');this.setState({select:'ListPrescription',CheckMenu:false})}}>
                <label>لیست نسخه ها <i className="fa fa-list"></i></label>
            </div>
                <div className={`field ${this.state.select==='Patient_Registration'?'change':''}`} onClick={()=>{this.props.ChangeShow('Patient_Registration');this.setState({select:'Patient_Registration',CheckMenu:false})}}>
                <label>ثبت بیمار <i className="fas fa-plus"></i></label>
                </div>
                </React.Fragment>
                :''}

                {!this.props.data?
                <React.Fragment>
                <div className={`field ${this.state.select==='ListPrescription'?'change':''}`} onClick={()=>this.setState({CheckMenu:false})}>
                <Link className='w-100 h-100 justify-content-end' to={{pathname:`/prescription`,state:{user_Type_name:this.props.user_Type_name,institute_id:this.props.institute_id,back:this.props.back}}} >لیست نسخه ها <i className="fa fa-list"></i></Link>
                </div>
                {!this.props.back?
                <div className={`field ${this.state.select==='ListPrescription'?'change':''}`} onClick={()=>this.setState({CheckMenu:false})}>
                <Link className='w-100 h-100 justify-content-end' to={{pathname:`/singlePrescription`,state:{managers:this.props.managers,user_Type_name:this.props.user_Type_name,institute_id:this.props.institute_id,back:this.props.back}}} >بازگشت <i className="fas fa-arrow-right"></i></Link>
                </div>
                :''}
                </React.Fragment>
                    :''}

                <div className={`field ${this.state.select==='LogOut'?'change':''}`} onClick={this.LogOut}>
                <label>خروج <i className="fas fa-sign-out-alt"></i></label>
            </div>
        </div>
        {this.props.showIcon?
        <div className='Toggle d-none' style={this.state.CheckMenu?{right:'40%',transition:'0.4s'}:{right:0,transition:'0.4s'}}>
        <div className='position-relative' onClick={()=>this.state.CheckMenu?this.setState({CheckMenu:false}):this.setState({CheckMenu:true})}>
        <div className={`icon ${this.state.CheckMenu?'close':''}`} style={this.state.CheckMenu?{width:'1em'}:{width:'2em'}}></div>
        <div className={`icon ${this.state.CheckMenu?'open':''}`}></div>
        <div className={`icon ${this.state.CheckMenu?'close':''}`} style={this.state.CheckMenu?{width:'1em'}:{width:'2em'}}></div>
        </div>
        </div>
        :''}
</React.Fragment>
    )
}
}