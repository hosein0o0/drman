import React ,{Component} from 'react'
import { Link ,Redirect} from 'react-router-dom';
export default class CreateClinic extends Component{
    constructor(props){
        super(props);
        this.state={
            state:'null',
            city:'null',
            checkEmail:false
        }
    }
handlechange=(env)=>{
    this.setState({[env.target.name]:env.target.value})
}
handleCheck=(env)=>{
    if(env.target.value===''){
        env.target.style.border = '1px solid #ff0d0d'
    }
    else if(env.target.name==='email'){
        env.target.parentElement.children[0].style.color=null
        if(env.target.value.includes("@")){
            env.target.style.border='1px solid #c7c4c4'
            this.setState({checkEmail:true})
        }else if(env.target.value ===''||!env.target.value.includes("@")){
            this.setState({checkEmail:false})
            env.target.style.border = '1px solid #ff0d0d'
        }
    }else if(env.target.name==='website'){
        env.target.parentElement.children[0].style.color=null
        if(env.target.value.includes('https://')||env.target.value.includes('http://')){
            env.target.style.border='1px solid #c7c4c4'
        }else if(env.target.value===''||!env.target.value.includes('http://')||!env.target.value.includes('https://')){
            env.target.style.border = '1px solid #ff0d0d'
        }
    }else{
        env.target.style.border='1px solid #c7c4c4'
    }
}
HandleShow=()=>{
        if(this.state.state==='null') null
            else{
            return(
                <div className = 'm-1 field col-12'>
                    <div className="col-4 label">
                        <label>شهر</label>
                    </div>
                    <div className="value col-8">
                    <select onClick={this.handlechange} name='city'>
                        <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
                        <option value="karaj">کرج</option>
                        <option value="mohamadshahr">محمد شهر</option>
                        <option value="fardis">قردیس</option>
                    </select>
                    </div>
                    </div>
            )
        }
    }
HandleRegion=()=>{
        if(this.state.city==='null') null
        else return(
        <div className = 'm-1 field col-12'>
        <div className="col-4 label">
            <label>منطقه</label>
        </div>
        <div className="value col-8">
        <select onClick={this.handlechange} name='region'>
            <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
            <option value="gloshahr">45 متری گلشهر</option>
            <option value="azimie">عظیمیه</option>
            <option value="gohardasht">گوهردشت</option>
        </select>
        </div>
        </div>
        )
    }
render(){
    console.log(this.props.changeHandle)
    return(
        <React.Fragment>
            <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>نام مطب :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='name' type='text' placeholder = 'نام مطب' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>تلفن ثابت :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='Tel' type='text' placeholder = 'تلفن ثابت' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className = 'm-1 field col-12'>
                <div className="col-4 label">
                    <label>استان</label>
                </div>
                <div className="value col-8">
                <select onClick={this.handlechange} name='state'>
                    <option value='null' style={{display:'none'}}>لطفا انتخاب کنید</option>
                    <option value="karaj">البرز</option>
                    <option value="teh">تهران</option>
                </select>
                </div>
                </div>
                {this.HandleShow()}
                {this.HandleRegion()}

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>آدرس :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='Address' type='text' placeholder = 'آدرس' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>ایمیل :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='email' type='text' placeholder = 'ایمیل' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>وب سایت :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='website' type='text' placeholder = 'وب سایت' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                <div className='submit'>
                <button className='submit_sign m-1' type='submit' onClick={this.handlesubmit}>ثبت مطب</button>
                <span onClick={()=>this.props.changeHandle(false)}>ثبت آزمایشگاه</span>
                </div>
        </React.Fragment>
    )
}
}