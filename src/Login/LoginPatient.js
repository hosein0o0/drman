import React , {Component} from 'react'
export default class LoginPatient extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
handleChange=(env)=>{
    if(env.target.name==='UserName'){
        var check = /^[\u0600-\u06FF\s]+$/;
        if(check.test(env.target.value)){
            env.target.value=''
        }else null
    }
    this.setState({[env.target.name]:env.target.value})
}
handlecheck=(env)=>{
    if(env.target.value===''){
        env.target.style.border='1px solid #ff0d0d'
    }else if(env.target.name==='Password'){
        if(env.target.value.length<6){
        env.target.style.border='1px solid #ff0d0d'
        }else env.target.style.border='1px solid #c7c4c4'
    }else env.target.style.border='1px solid #c7c4c4'


    if(this.state.Password&&this.state.UserName){
    this.props.GetItems(this.state)
    }else this.props.GetItems(undefined)
}
render(){
    return(
        <React.Fragment>
            <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>نام کاربری :</label>
                    </div>
                    <div className='value col-8'>
                    <div className='login_field position-relative'>
                    <input className='text-left' name='UserName' type='text' required ref='UserName' placeholder = 'نام کاربری' onChange={this.handleChange} onBlur={this.handlecheck}/>
                    <i className="fa fa-user"></i>
                    </div>
                    </div>
                </div>
                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>رمز عبور :</label>
                    </div>
                    <div className='value col-8'>                    
                    <div className='login_field position-relative'>
                    <input className='text-left' name='Password' type='Password' required ref='Password' placeholder = 'رمز عبور' onChange={this.handleChange} onBlur={this.handlecheck}/>
                    <i className="fa fa-lock"></i>
                    </div>
                    </div>
                </div>
        </React.Fragment>
    )
}
}