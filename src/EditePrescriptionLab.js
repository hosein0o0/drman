import React , {Component,useState} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import * as moment from 'jalali-moment';
import Cookies from 'js-cookie'
import axios from 'axios';
import DataStatic from './staticData'
import SideBar from './sidebar'
export default class EditePrescriptionLab extends Component{
    constructor(props){
        super(props);
        this.state = {
            form:{
                day_lab_take:this.props.location.state===undefined?null:this.props.location.state.managers.lab_take_at.split('/')[2],
                month_lab_take:this.props.location.state===undefined?null:this.props.location.state.managers.lab_take_at.split('/')[1],
                year_lab_take:this.props.location.state===undefined?null:this.props.location.state.managers.lab_take_at.split('/')[0],
                day_lab_result:this.props.location.state===undefined?null:this.props.location.state.managers.lab_result_at.split('/')[2],
                month_lab_result:this.props.location.state===undefined?null:this.props.location.state.managers.lab_result_at.split('/')[1],
                year_lab_result:this.props.location.state===undefined?null:this.props.location.state.managers.lab_result_at.split('/')[0]
            },
            Token:Cookies.get('Token'),
            lab_id:this.props.location.state?this.props.location.state.institute_id:null,
            user_Type_name:this.props.location.state?this.props.location.state.user_Type_name:null,
            error:false,
            showIcon:false,
            Data:this.props.location.state?this.props.location.state.managers:null,
            Redirect:false
        }           
    }
componentDidMount(){
    if(document.getElementById('root').offsetWidth<797){
        this.setState({showIcon:true})
    }
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
LabSingleItem=(name , value)=>{
    const data=this.state
    data[name]=value
    this.setState(data)
}
showResult=(name)=>{
    var Alldata=[]
    for(var j=0;j<this.props.location.state.managers.result.length;j++){
        for(var w in this.props.location.state.managers.result[j].Items){
            if(this.props.location.state.managers.result[j].Test_name===name){
                Alldata.push(
                <div className='result col-12'>
                    
                <div className="Items_lab">

                <label>{w} :</label>
                <span>{this.props.location.state.managers.result[j].Items[w]}</span>
            </div>
            </div>
                )
            }
        }
    }
    return Alldata
}
ChangeTestName=(name,value)=>{
    const data=this.state
    data[name]=value
    this.setState(data)
}
EditResult=()=>{
    let listLab=[]
    for(var i=0;i<this.props.location.state.managers.body.length;i++){
        listLab.push(this.props.location.state.managers.body[i].Test_name)
    }
    var body =[]
    for(var j=0;j<listLab.length;j++){
        const listItem={}
        const Item={}
        for(let value in this.state){
            let newValue=this.state
            if(value.includes('labInputs')){
                var list=value.split('-')
                let name_test=list[1]
                if(listLab[j]===name_test){
                    Item[list[2]]=this.state[value]
                    listItem['Test_name']=name_test
                    for(let val in newValue){
                        if(val.includes('name_test')){
                            var List_Name=val.split('-')[1]
                            if(List_Name===name_test){
                                listItem['Test_name']=newValue[val]
                            }                      
                        }
                    }
                    listItem["Items"]=Item
                }
            }
        }
        body.push(listItem)
    }
    const data=this.state.form
    const lab_take_at = moment.from(data.year_lab_take+'/'+data.month_lab_take+'/'+data.day_lab_take,'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
    const lab_result_at=moment.from(data.year_lab_result+'/'+data.month_lab_result+'/'+data.day_lab_result,'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
    const result={}
    result['lab_id']=this.state.lab_id
    result['lab_take_at']=lab_take_at
    result['lab_result_at']=lab_result_at
    result['result']=body
    this.state.user_Type_name==='drlab'?
    result['description']=!this.state.Description?this.props.location.state.managers.description:this.state.Description
    :
    result['description']=null

    this.state.user_Type_name==='drlab'?
    result['agree']=1
    :
    result['agree']=0
    axios.post(`${DataStatic.domainIp}/Update_Prescription_Lab?prescription_id=${this.props.location.state.managers.id}`,JSON.stringify(result),
    {headers: 
        {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'api_token' : this.state.Token
        }})
    .then((response)=>{
        if(response.data===0){
            alert('بروز رسانی نسخه با موفقیت انجام شد')
            // window.location.href='/labPrescription'
            this.setState({Redirect:true})
        }else if(response.data===1){
            alert('لطفا مقادیر را پر کنید')
        }else if(response.data===2){
            alert('نسخه ای یافت نشد')
        }else if(response.data===3){
            alert('دسترسی ممکن نیست')
        }else if(response.data===4){
            alert('به روز رسانی امکان پذیر نیست زیرا نسخه مورد قبول دکتر آزمایشگاه است')
        }else if(response.data===5){
            alert('آزمایشگاه یافت نشد')
        }else if(response.data===6){
            alert('محل شما از نوع آزمایشگاه نمیباشد')
        }else if(response.data===7){
            alert('برای آزمایشگاه مورد نظر  تجویز نمیشود')
        }else if(response.data===8){
            alert('ورودی های صحیح را وارد کنید')
        }
    })
    .catch((err)=>{
        this.setState({error:true})
    })
}
handleClose=()=>{

}
render(){ 
    if(this.state.Redirect){
        return <Redirect to={{pathname:`/labPrescription`,state:{user_Type_name:this.state.user_Type_name,institute_id:this.state.lab_id}}} />
    }else{
    if(this.state.user_Type_name==='drlab'||this.state.user_Type_name==='secretarylab'){
        if(this.props.location.state){
        const data = this.props.location.state.managers
        if(this.state.Token){
        return(
                <div className='col-12'>
                <div className='row'>
                    <div className="col-md-8 col-12 mr-auto ml-auto mt-3">
                    {
                    this.state.error?
                    <div className='error'>
                    <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                    }
                    <div className='singlePres m-3 p-3 row'>
                    <div className='detail col-12'>
                    <h3 className='p-3'>اطلاعات آزمایشگاه</h3>
                    <div className='field_singlepr row mt-2 mb-2'>
                    <div div className='col-md-3 col-8'>
                    <label>تاریخ پذیرش : </label>
                    </div>
                    
                    <div className='lab_date col-md-3 col-12'>
                    <input placeholder='روز' name='day_lab_take' value={this.state.form.day_lab_take} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='2'/>/
                    <input placeholder='ماه' name='month_lab_take'   value={this.state.form.month_lab_take} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='2'/>/
                    <input placeholder='سال' name='year_lab_take'    value={this.state.form.year_lab_take} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='4'/>
                    </div> 
                    
                    </div>
                                

                    <div className='field_singlepr row mt-2 mb-2'>
                    <div className='col-md-3 col-8'>
                    <label>تاریخ جواب دهی : </label>
                    </div>
                    <div className='lab_date col-md-3 col-12'>
                    <input placeholder='روز' name='day_lab_result' value={this.state.form.day_lab_result} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='2'/>/
                    <input placeholder='ماه' name='month_lab_result' value={this.state.form.month_lab_result} onChange={this.handleChange} onBlur={this.handleCheck}  maxLength='2'/>/
                    <input placeholder='سال' name='year_lab_result' value={this.state.form.year_lab_result} onChange={this.handleChange} onBlur={this.handleCheck} maxLength='4'/>
                    </div> 
                    </div>
                    </div>


                    <div className="detail col-10 p-0">
                        <ShowResultLab   result={this.props.location.state.managers.result} onChange={(ev)=>this.setState(ev)} singleItem={this.LabSingleItem} ChangeTestName={this.ChangeTestName} HandleClose={this.HandleClose}/>
                    </div> 
                    {this.state.user_Type_name==='drlab'?
                    <div className='detail col-10 p-0'>
                        <div className='col-12'>
                        <div className='row singleItem'>
                        <div className='col-md-3 col-8 d-flex align-items-center justify-content-center'>
                    <label>توضیحات</label>
                    </div>
                    <div className='col-md-3 col-12'>
                    <textarea className='w-100 m-2 p-2' value={!this.state.Description?data.description:this.state.Description} onChange={(env)=>this.setState({Description:env.target.value})}></textarea>
                    </div>
                    </div>
                    </div>
                    </div>
                    :''
                    }
                    <div className='submit'>
                    <button onClick={this.EditResult}>ذخیره تغییرات</button>                        
                    </div>

                    </div>
                    </div>
                    <div className='col-md-2 col-6'>
                        <SideBar showIcon={this.state.showIcon} user_Type_name={this.state.user_Type_name} institute_id={this.state.lab_id} Edit={true} managers={this.state.Data}/>
                    </div>
                </div>
            </div>
        )
                }else return <Redirect to={{pathname:`/labPrescription`,state:{user_Type_name:this.state.user_Type_name,institute_id:this.state.lab_id}}} />
        }else return <Redirect to={{pathname:`/labPrescription`,state:{user_Type_name:this.state.user_Type_name,institute_id:this.state.lab_id}}} />
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
        <div className='col-12'>
        <div className='Item_field row'>
            <div className='col-md-3 col-6'>
            <input className='w-100' name="value_name" value={this.state.name} onChange={(ev)=>this.setState({name:ev.target.value})}/>
            :
            </div>
            <div className='col-md-6 col-6'>
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
            ValueList:[],
            name_test:''
        }
    }
    componentDidMount(){
        let result=this.props.result
        let AllValue=[]
        for(var i=0;i<result.length;i++){
        for(var value in result[i].Items){ 
            this.props.singleItem('labInputs-'+result[i].Test_name+'-'+value, result[i].Items[value])
            AllValue.push(result[i].Items[value])
        }
    }
        this.setState({ValueList:AllValue})
    }
    handelAddItemsLab=(nm)=>{
        const data =[]
        for(let i=0;i<this.state.inputs;i++){
            data.push(<InputAdd onChange={(ev)=>this.props.onChange(ev)} number={i} name={nm} />)
        }
        return data;
    }
    handleChange=(env)=>{
        this.props.singleItem(env.target.name , env.target.value)
        this.setState({IsInput:env.target.value})
    }
    handleShow=(name)=>{
        let AllData=[]
        let count=-1
        let result=this.props.result
        for(var i=0;i<result.length;i++){
        for(var value in result[i].Items){  
            count ++
            if(name===result[i].Test_name) {
            AllData.push(
                <div className='m-2 singleItem row'>
                    <div className='col-md-3 col-6'>
                    <label>{value}</label>:
                    </div>
                    <div className='col-md-6 col-6'>
                    <input className='p-2' value={this.state.IsInput===undefined?this.state.ValueList[count]:null} name={'labInputs-'+result[i].Test_name+'-'+value} onChange={this.handleChange}/>
                    </div>
                    </div>
            )
            }
        }
    }
        return AllData
    }
    render(){
    return(
            <div className='result col-12'>
                <div className='row'>
            {
                this.props.result.map((data,key)=>
                <div className=' col-12'>
                    <div className='lab_detail row m-2 singleItem'>
            <div className='col-md-3 col-6'>
            <label>نام آزمایش</label>
            </div>
            <div className='col-6'>
            <input className='w-100 p-2' value={this.state.Name_test?null:data.Test_name} onChange={(env)=>{this.setState({Name_test:env.target.value});this.props.ChangeTestName('name_test-'+data.Test_name,env.target.value)}}/>
            </div>
            </div>
            <div className='col-12'>
            <label>موارد :</label>
            {this.handleShow(data.Test_name)}
                </div>
                {this.handelAddItemsLab(data.Test_name)}
                <div className='addItems w-100'>
                <button className='p-4 m-2' onClick={()=>this.setState({inputs:this.state.inputs+1})}><i className='fa fa-plus'></i></button>
            </div>
                </div>
                )
            }

            </div>
            </div>
        )   
    }
}
