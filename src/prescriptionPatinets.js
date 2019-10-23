import React , {Component,useState} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import * as moment from 'jalali-moment';
import Cookies from 'js-cookie'
import axios from 'axios';
import DataStatic from './staticData'
import SideBar from './sidebar'
export default class prescriptionPatints extends Component{
    constructor(props){
        super(props);
        this.state = {
            lab_id:this.props.location.state?this.props.location.state.institute_id:null,
            Token:Cookies.get("Token"),
            user_Type_name:this.props.location.state?this.props.location.state.user_Type_name:null,
            Agree:false,
            form:{
                day_lab_take:'',
                month_lab_take:'',
                year_lab_take:'',
                day_lab_result:'',
                month_lab_result:'',
                year_lab_result:''
            },
            inputs:0,
            date_lab_take:'',
            date_lab_result:'',
            checked:false,
            Description:'',
            finalCheck:false,
            error:false,
            showIcon:false,
            Data:this.props.history.location.state?this.props.history.location.state.managers:null,
            Redirect:false
        }           
    }
componentDidMount(){
    if(document.getElementById('root').offsetWidth<797){
        this.setState({showIcon:true})
    }
    if(this.props.history.location.state){
    if(this.props.history.location.state.managers.lab_take_at!==null&&this.props.history.location.state.managers.lab_result_at!==null){
        this.setState({checked:true})
    }else this.setState({checked:false})
    if(this.props.history.location.state.managers.result!==null){
        this.setState({finalCheck:true})
    }else this.setState({finalCheck:false})
    var AllDate=[]
    var test=[]
    var name=[]
    if(this.props.history.location.state.managers.lab_result_at===null&&this.props.history.location.state.managers.lab_take_at===null){
        test=[this.props.history.location.state.managers.created_at]
        name=['created_at']
    }else if(this.props.history.location.state.managers.lab_result_at===null){
        test=[this.props.history.location.state.managers.created_at,this.props.history.location.state.managers.lab_take_at]
        name=['created_at','lab_take_at']
    }else if(this.props.history.location.state.managers.lab_take_at===null){
        test=[this.props.history.location.state.managers.created_at,this.props.history.location.state.managers.lab_result_at]
        name=['created_at','lab_result_at']
    }else {
        test=[this.props.history.location.state.managers.created_at,this.props.history.location.state.managers.lab_take_at,this.props.history.location.state.managers.lab_result_at]
        name=['created_at','lab_take_at','lab_result_at']
    }
    if(this.props.location.state.change){
        for(var i=0;i<test.length;i++){
            AllDate.push(test[i])
      }
    }
    else for(var i=0;i<test.length;i++){
          var list=test[i].split(',')
          list=list[1].split(' ')
          list=[list[1],list[2],list[3]]
          var mon=list[1]
          var month=null
        if(mon==='Jan') month="1"
        else if(mon==='Feb') month="2"
        else if(mon==='Mar') month="3"
        else if(mon==='Apr') month="4"
        else if(mon==='May') month="5"
        else if(mon==='Jun') month="6"
        else if(mon==='Jul') month="7"
        else if(mon==='Aug') month="8"
        else if(mon==='Sep') month="9"
        else if(mon==='Oct') month="10"
        else if(mon==='Nov') month="11"
        else if(mon==='Dec') month="12"
        list=[list[2],month,list[0]]
        list=list.toString()
        var date=list.replace(/,/g,'/')
        const changeDate =moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
        AllDate.push(changeDate)
    }
    const data=this.props.history.location.state.managers
    for(var j=0;j<name.length;j++){
        data[name[j]]=AllDate[j]
        this.setState({singlepr:data})
    }
}else null
}
LabSingleItem=(name , value)=>{
    const data=this.state
    data[name]=value
    this.setState({data:data})
}
handelAddItemsLab=(env)=>{

}
handleChange=(env)=>{
const data =this.state.form
data[env.target.name]=null
this.setState({form:data})
if(env.target.name==='day_lab_take'||env.target.name==='day_lab_result'){
    if(env.target.value>31){
    data[env.target.name]=env.target.value.slice(0,1)       
    this.setState({form:data})
    }else{
        data[env.target.name]=env.target.value
        this.setState({form:data})
    }
}else if(env.target.name==='month_lab_take'||env.target.name==='month_lab_result'){
    if(env.target.value>12){
        data[env.target.name]=env.target.value.slice(0,1)
        this.setState({form:data})
    }else{
        data[env.target.name]=env.target.value
        this.setState({form:data})
    }
}
}
handleCheck=(env)=>{
    const data=this.state.form
    if(env.target.maxLength===2){
        if(env.target.value.length===1){
            data[env.target.name]=0+''+env.target.value
            this.setState({form:data})
        }else{
        data[env.target.name]=env.target.value
        this.setState({form:data})
        }
    }else if(env.target.maxLength===4){
        if(env.target.value.length===2){
            data[env.target.name]=13+''+env.target.value
            this.setState({form:data})
        }
    }
}
showResult=(name)=>{
    var Alldata=[]
    for(var j=0;j<this.props.history.location.state.managers.result.length;j++){
        for(var w in this.props.history.location.state.managers.result[j].Items){
            if(this.props.history.location.state.managers.result[j].Test_name===name){
                Alldata.push(
                <div className='col-12'>
                <div className="Items_lab">
                <label>{w} :</label>
                <span>{this.props.history.location.state.managers.result[j].Items[w]}</span>
            </div>
            </div>
                )
            }
        }
    }
    return Alldata
}
checkAgree=(env)=>{
    this.setState({Agree:env.target.checked})
}   
EditResult=()=>{
    if(this.state.checked){
        
    let listLab=[]
    for(var i=0;i<this.props.history.location.state.managers.body.length;i++){
        listLab.push(this.props.history.location.state.managers.body[i].Test_name)
    }
    var body =[]
    for(var j=0;j<listLab.length;j++){
        const listItem={}
        const Item={}
        for(let value in this.state){
            if(value.includes('labInputs')){
                var list=value.split('-')
                let name_test=list[1]
                if(name_test===listLab[j]){
                    Item[list[2]]=this.state[value]
                    listItem['Test_name']=name_test
                    listItem["Items"]=Item
                }
            }
        }
        body.push(listItem)
    }
    const result={}
    result['lab_id']=this.state.lab_id
    result['prescription_id']=this.props.history.location.state.managers.id
    result['result']=body
    axios.post(`${DataStatic.domainIp}/Edit_Result`,result,
    {headers: 
        {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'api_token' : this.state.Token
        }})
    .then((response)=>{
        if(response.data===0){
            alert('نسخه ای یافت نشد')
        }else if(response.data===1){
            alert('آزمایشگاه مورد نظر یافت نشد')
        }else if(response.data===2){
            alert('دسترسی ممکن نیست')
        }else{
            this.setState({checked:true , finalCheck:true})
            alert('تغییرات با موفقیت انجام شد');
            // window.location.href='/labPrescription'
            this.setState({Redirect:true})
        }
    })
    .catch((err)=>{
        this.setState({error:true})
    })
    }else alert('لطفا اول تاریخ پذیرش و جواب دهی را پر کنید')
}
handleSubmit=()=>{
    const date_lab_take = moment.from(this.state.form.year_lab_take+"/"+this.state.form.month_lab_take+"/"+this.state.form.day_lab_take, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
    const date_lab_result = moment.from(this.state.form.year_lab_result+"/"+this.state.form.month_lab_result+"/"+this.state.form.day_lab_result, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
    if(date_lab_result==='Invalid date'||date_lab_take==='date_lab_take'){
        alert('لطفا تاریخ پذیرش و جواب دهی را پر کنید')
    }else{
        const datareg ={}
        datareg['lab_id']=this.state.lab_id
        datareg['prescription_id']=this.props.history.location.state.managers.id
        datareg['lab_take_at']=date_lab_take
        datareg['lab_result_at']=date_lab_result
        axios.post(`${DataStatic.domainIp}/Create_Result`,datareg ,
        {
            headers: 
            {'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'api_token' : this.state.Token
            }
        })
        .then((response)=>{
            if(response.data===0){
                alert('نسخه مورد نظر پیدا نشد')
            }else if(response.data===1){
                alert('محل یافت نشد')
            }else if(response.data===2){
                alert('ارتباط برقرار نشد')
            }else{
                alert('تغییرات با موفقیت انجام شد');
                this.setState({checked:true,Redirect:true})
                // window.location.href='/labPrescription'
            }
        })
        .catch((err)=>{
           this.setState({error:true})
        })
    }
}
SubmitResult=()=>{
    if(this.state.finalCheck){
    const Submit_Result={}
    Submit_Result['lab_id']=this.state.lab_id
    Submit_Result['prescription_id']=this.props.history.location.state.managers.id
    Submit_Result['description']=this.props.history.location.state.managers.description===null?this.state.Description:this.props.history.location.state.managers.description
    Submit_Result['agree']= this.state.Agree?1:0
    axios.post(`${DataStatic.domainIp}/Submit_Result`,Submit_Result,
    {
        headers: 
        {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'api_token' : this.state.Token
        }
    })
    .then((response)=>{
        if(response.data===0){
            alert('نسخه ای یافت نشد')
        }else if(response.data===1){
            alert('آزمایشگاه مورد نظر یافت نشد')
        }else if(response.data===2){
            alert('دسترسی ممکن نیست')
        }else {
            alert('تغییرات با موفقیت انجام شد')
            this.setState({Redirect:true})
            // window.location.href='/labPrescription'
        }
    })
    .catch((err)=>{
        this.setState({error:true})
    })   
}else alert('لطفا اول موارد را پر کنید') 
}
render(){
    console.log(this)
    if(this.state.Redirect){
        return <Redirect to={{pathname:`/labPrescription`,state:{user_Type_name:this.state.user_Type_name,institute_id:this.state.lab_id}}} />
    }else{
    if(this.state.Token){
    if(this.state.user_Type_name==='secretarylab'||this.state.user_Type_name==='drlab'){
        if(this.props.history.location.state===undefined){
            return <Redirect to='/' />
            }else{
        const data = this.props.history.location.state.managers
        return(
                <div className='col-12'>
                <div className='row'>
                {
                    this.state.error?
                    <div className='error'>
                    <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                    }
                    <div className="col-md-8 col-12 mr-auto ml-auto mt-3">
                    <div className='singlePres m-3 p-3 row'>
                            
                    <div className='detail col-12 col-md-4'>
                    <h3>اطلاعات بیمار</h3>
                    <div className='field_singlepr'>
                    <label>نام و نام خانوادگی بیمار : </label>
                    <span>{this.state.Data.patient_name}</span>
                    </div>
                    <div className='field_singlepr'>
                    <label>سن بیمار : </label>
                    <span>{this.state.Data.patient_age}</span>
                    </div>
                    <div className='field_singlepr'>
                    <label>کد ملی بیمار : </label>
                    <span>{this.state.Data.patient_national_code}</span>
                    </div>
                    <div className='field_singlepr'>
                    <label>تلفن بیمار : </label>
                    <span>{this.state.Data.patient_tel}</span>
                    </div>
                    </div>
                    <div className=' detail col-12 col-md-4'>
                    <h3>اطلاعات نسخه</h3>
                    <div className='field_singlepr'>
                    <label>نام مطب : </label>
                    <span>{this.state.Data.clinic_name}</span>
                    </div>
                    <div className='field_singlepr'>
                    <label>پزشک معالج : </label>
                    <span>{this.state.Data.drclinic_name}  {this.state.Data.drclinic_family}</span>
                    </div>
                    </div>
                    <div className='d-flex detail date col-md-4 col-12 mt-3'>
                    <label>تاریخ نسخه : </label>
                    <span>{this.state.Data.created_at}</span>
                    </div>
                    <div className='detail col-md-6 col-12'>
                    <h3>اطلاعات آزمایشگاه</h3>
                    <div className='field_singlepr row mt-2 mb-2 row'>
                    <div className='col-4'>
                    <label>تاریخ پذیرش : </label>
                    </div>
                    {
                    this.state.Data.lab_take_at===null?
                    <div className='lab_date col-8'>
                    <input placeholder='روز' name='day_lab_take' value={this.state.form.day_lab_take} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='2'/>/
                    <input placeholder='ماه' name='month_lab_take'  onChange={this.handleChange} value={this.state.form.month_lab_take} onBlur={this.handleCheck} maxLength='2'/>/
                    <input placeholder='سال' name='year_lab_take'  onChange={this.handleChange} value={this.state.form.year_lab_take} onBlur={this.handleCheck} maxLength='4'/>
                    </div> 
                    :
                    <span>{this.state.Data.lab_take_at}</span>
                    }
                    </div>
                                

                    <div className='field_singlepr row mt-2 mb-2 row'>
                    <div className='col-4'>
                    <label>تاریخ جواب دهی : </label>
                    </div>
                    {this.state.Data.lab_result_at===null?
                    <div className='lab_date col-8'>
                    <input placeholder='روز' name='day_lab_result' value={this.state.form.day_lab_result} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='2'/>/
                    <input placeholder='ماه' name='month_lab_result' value={this.state.form.month_lab_result} onChange={this.handleChange} onBlur={this.handleCheck}  maxLength='2'/>/
                    <input placeholder='سال' name='year_lab_result' value={this.state.form.year_lab_result} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='4'/>
                    </div> 
                    :
                    <span>{this.state.Data.lab_result_at}</span>
                    }
                    </div>
                    </div>


                    <div className="detail col-12 p-0">
                    <div className='field_singlepr row m-0'>
                    
                    {this.state.Data.result===null?
                     this.props.history.location.state.managers.body.map((data,key)=>
                     <ShowResultLab key={key} data={data} onChange={(ev)=>this.setState(ev)} singleItem={this.LabSingleItem}/>
                     )
                    :
                    <div className='field_singlepr col-12'>
                        <div className='head'>
                        <h3>نتیجه آزمایش</h3>
                        </div>
                    <div className='col-12'>
                        <div className='row'>
                        
                {
                    this.state.Data.result.map((data,key)=>
                    <div className='col-md-4 col-12 tests'>
                        <div className='name_lab'>
                <label>نام آزمایش :</label>
                <span>{data.Test_name}</span>
                </div>
                <div className='lable'>
                <label>موارد : </label>
                </div>
                    {this.showResult(data.Test_name)}
                    </div>
                    )
                }
                    </div>
                    </div>
                    </div>
                    }
                    </div>


                    {this.state.user_Type_name==='drlab'?
                    this.state.Data.description===null?
                    <div className='field_singlepr mt-3 mb-3'>
                        <label className='ml-1 mr-1 d-block'>توضیحات</label>
                        <textarea className='mr-4 w-auto' onChange={(ev)=>this.setState({Description:ev.target.value})}></textarea>
                        </div>
                    :
                    <div className='field_singlepr'>
                    <label>توضیحات : </label>
                    <span>{this.state.Data.description}</span>
                    </div>
                    :
                    ''
                    }
                    {this.state.user_Type_name==='secretarylab'?
                    this.state.Data.description!==null?
                    <div className='field_singlepr'>
                    <label>توضیحات : </label>
                    <span>{this.state.Data.description}</span>
                    </div>
                    :
                    ''
                    :
                    ''
                    }
                    {this.state.user_Type_name==='secretarylab'?
                    this.state.Data.agree?
                    <div className='field_singlepr'>
                    <label>توضیحات : </label>
                    <span className='p-2'>توسط پزشک آزمایشگاه ملاحظه گردید </span>
                    </div>
                    :
                    ''
                    :
                    ''
                    }
                    {this.state.user_Type_name==='drlab'?
                    <div className='field_singlepr'>
                    <span className='p-2'>توسط پزشک آزمایشگاه ملاحظه گردید </span>
                    {this.state.Data.agree?
                    ''
                    :
                    <input type='checkbox' onChange={this.checkAgree}/>
                    }
                    </div>:null
                    }
                    </div> 
                    <div className='submit'>
                    {   this.state.user_Type_name==='drlab'?
                        !this.state.Data.agree?
                        this.state.user_Type_name==='drlab'&&this.state.finalCheck?
                    <button onClick={this.SubmitResult}>ذخیره تغییرات</button>                        
                        :
                    <button onClick={this.state.checked? this.EditResult:this.handleSubmit}>ذخیره تغییرات</button>
                    :''
                    :''
                        }
                        
                        {
                            this.state.user_Type_name==='secretarylab'?
                            !this.state.finalCheck?
                            <button onClick={this.state.checked? this.EditResult:this.handleSubmit}>ذخیره تغییرات</button>
                            :''
                            :
                            ''
                        }
                    
                    {this.state.user_Type_name==='secretarylab'?
                    !this.state.Data.agree?
                    <Link to={{pathname:`/EditePrescriptionlab`,state:{managers:this.state.Data}}} >
                    <button style={{backgroundColor:'rgb(44, 255, 0)'}}>ویرایش</button>
                    </Link>
                    :''
                    :''
                        }


                    {this.state.user_Type_name==='drlab'?
                    data.agree?
                    <Link to={{pathname:`/EditePrescriptionlab`,state:{managers:data,institute_id:this.state.lab_id,user_Type_name:this.state.user_Type_name}}} >
                    <button style={{backgroundColor:'rgb(44, 255, 0)'}}>ویرایش</button>
                    </Link>
                    :''
                    :''
                        }
                    </div>

                    </div>
                    </div>
                    <div className='col-md-2 col-6'>
                        <SideBar showIcon={this.state.showIcon} user_Type_name={this.state.user_Type_name} institute_id={this.state.lab_id}/>
                    </div>
                </div> 
            </div>
        )
        }
    }else return <Redirect to='/' />
    }else return <Redirect to='/' />
}
}
}
class InputAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            value : "",
        }
    }
    handleItemsValue=(ev)=>{
        var AllItems={}
        AllItems["labInputs-"+this.props.name+"-"+ev.target.name] = ev.target.value
        this.props.onChange(AllItems)
    }
    render(){
    return (
        <div className='m-1 col-12'>
            <div className='row'>
                <div className='col-md-4 m-2'>
            <input className='w-100' name="value_name" value={this.state.name} onChange={(ev)=>this.setState({name:ev.target.value})}/>
            :
            </div>
            <div className='col-md-6 m-2'>
            <input className='w-100' name={this.state.name} onChange={(ev)=>this.handleItemsValue(ev)}/>
            </div>
        </div>
        </div>
    )
    }
}
class ShowResultLab extends Component{
    constructor(props){
        super(props);
        this.state={
            inputs :0,
        }
    }
    handelAddItemsLab=(nm)=>{
        const data =[]
        for(let i=0;i<this.state.inputs;i++){
            data.push(<InputAdd key={i} onChange={(ev)=>this.props.onChange(ev)} name={nm}/>)
        }
        return data;
    }
    handleChange=(env)=>{
        this.props.singleItem(env.target.name , env.target.value)
    }
    render(){
    return(
            <div className='result col-md-4 col-12'>
            <div className='lab_detail'>
            <label>نام آزمایش</label>
            <span>{this.props.data.Test_name}</span>
            </div>
            <label>موارد :</label>
            {   this.props.data.Items?
                this.props.data.Items.map((data,key)=>
                <div className='m-1 singleItem'>
                    <label>{data}</label>:
                    <input name={'labInputs-'+this.props.data.Test_name+'-'+data} onChange={this.handleChange}/>
                    </div>
                )
                :''
            }
            {this.handelAddItemsLab(this.props.data.Test_name)}
            <div className='addItems'>
                <button onClick={()=>this.setState({inputs:this.state.inputs+1})}><i className='fa fa-plus'></i></button>
            </div>
            </div>
        )   
    }
}
