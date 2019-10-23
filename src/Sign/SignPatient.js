import React ,{Component} from 'react'
import { Link ,Redirect} from 'react-router-dom';
export default class SignPatient extends Component{
    constructor(props){
        super(props);
        this.state={
            Gender:'',
            state:'null',
            city:'null',
            region:'null',
            form:{
                National_Code:'',
                mobile:'',
                tel:'',
                age:''
            }
        }
    }
    selectOnlyThis=(env)=>{
        for (var i = 1;i <= 2; i++){
            document.getElementById("Check"+i).checked = false;
        }
        document.getElementById("Check"+env.target.name).checked=true
        this.setState({Gender:env.target.value})
    }
    handlechange=(env)=>{
    this.setState({
        [env.target.name]:env.target.value
    })
    if(env.target.name==='National_Code'){
                const data = this.state.form
                const message = env.target.value.slice(0,10)
                data['National_Code']=message
                this.setState({form:data})
    }else if(env.target.name==='name'||env.target.name==='family'){
        var check = /^[\u0600-\u06FF\s]+$/;
        if(!check.test(env.target.value)){
            env.target.value=''
        }else null
    }else if(env.target.name==='mobile'){
        const data = this.state.form
        const message = env.target.value.slice(0,11)
        data['mobile']=message
        this.setState({form:data})
}else if(env.target.name==='tel'){
    const data = this.state.form
    const message = env.target.value.slice(0,11)
    data['tel']=message
    this.setState({form:data})
}else if(env.target.name==='age'){
    const data = this.state.form
    const message = env.target.value.slice(0,2)
    data['age']=message
    this.setState({form:data})
}
}
handleCheck=(env)=>{
if(env.target.name==='National_Code'){
    if(env.target.value.length!==10){
        env.target.style.border='1px solid #ff0d0d'
    }else env.target.style.border='1px solid #c7c4c4'
}else if(env.target.name==='mobile'||env.target.name==='tel'){
    if(env.target.value.length!==11){
        env.target.style.border='1px solid #ff0d0d'
    }else env.target.style.border='1px solid #c7c4c4'
}
}
handleSubmit=()=>{
    console.log(this.state)
}
render(){
    return(
                <React.Fragment>
                    {this.props.newPatient?
                    <div className='back'>
                        <span onClick={()=>this.props.newPatient(false)}>بازگشت</span>
                    </div>
                    :''}
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
                {this.state.state==='null'?'':
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
                }
                {this.state.city==='null'?'':
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
            }
                {this.state.region==='null'?'':
                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>جزییات آدرس :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='address' type='text' placeholder = 'جزییات آدرس' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                }
                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>کد ملی * :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='National_Code' type='number' value={this.state.form.National_Code} placeholder = 'کد ملی' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>نام بیمار * :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='name' type='text' placeholder = 'نام بیمار' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>نام خانوادگی بیمار * :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='family' type='text' placeholder = 'نام خانوادگی بیمار' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                
                <div className='mr-1 ml-1 mb-1 mt-2 field col-12'>
                    <div className='label col-4'>
                    <label>جنسیت * :</label>
                    </div>
                    <div className='col-8 d-flex justify-content-center align-items-center'>
                    <div className='col-12 row'>
                    <div className='value  col-12 col-md-6 row'>
                        <div className='col-6'>
                        <label>مرد</label>
                        </div>
                        <div className='col-6'>
                    <input name={1} type='checkbox' id="Check1" value={0} onClick={this.selectOnlyThis} required />
                    </div>
                </div>
                <div className='value  col-12 col-md-6 row'>
                    <div className='col-6'>
                        <label>زن</label>
                        </div>
                        <div className='col-6'>
                    <input name={2} type='checkbox' id="Check2" value={1} onClick={this.selectOnlyThis} required />
                    </div>
                </div>
                </div>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>موبایل * :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='mobile' type='number' value={this.state.form.mobile} placeholder = 'موبایل' required onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>تلفن ثابت :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='tel' type='number' value={this.state.form.tel} placeholder = 'تلفن ثابت' onChange ={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>

                <div className='m-1 field col-12'>
                    <div className='label col-4'>
                    <label>سن * :</label>
                    </div>
                    <div className='value col-8'>
                    <input name='age' type='number' placeholder = 'سن' value={this.state.form.age} onChange={this.handlechange} onBlur={this.handleCheck}/>
                </div>
                </div>
                <div className='submit'>
                <button className='submit_sign' type='submit' onClick={this.handleSubmit}>ثبت نام</button>
                <Link to="/login">ورود</Link>
                </div>
                </React.Fragment>  
    )
}
}