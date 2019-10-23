import React , {Component} from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
export default class SideBar extends Component{
    constructor(props){
        super(props);
        this.state={
            CheckMenu:false,
            select:'ListPrescription'
        }
    }
componentDidMount(){
    
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

            <div className={`field ${this.state.select==='ListPrescription'&&this.props.List?'change':''}`} onClick={()=>this.setState({CheckMenu:false,select:'ListPrescription'})}>
            <Link className='w-100 h-100 justify-content-end' to={{pathname:`/labPrescription`,state:{user_Type_name:this.props.user_Type_name,institute_id:this.props.institute_id}}} >لیست نسخه ها<i className="fa fa-list"></i></Link>
                
            </div>
            {this.props.Edit?
                <div className={`field ${this.state.select==='ListPrescription'&&this.props.List?'change':''}`} onClick={()=>this.setState({CheckMenu:false,select:'ListPrescription'})}>
            <Link className='w-100 h-100 justify-content-end' to={{pathname:`/singlepr`,state:{user_Type_name:this.props.user_Type_name,institute_id:this.props.institute_id,managers:this.props.managers,change:true}}} >بازگشت<i class="fas fa-arrow-right"></i></Link>
                </div>
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