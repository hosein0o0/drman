import React ,{Component} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import * as moment from 'jalali-moment';
import Cookies from 'js-cookie'
import DeletePrescription from './DeletePrescription'
import SideBar from './sidebar'
export default class List_patients extends Component{
    constructor(props){
        super(props);
        this.state={
            DetailPrescription:this.props.location.state===undefined?'':this.props.location.state.managers,
            changeDate:'',
            form:{
                created_at:'',
                lab_take_at:'',
                lab_result_at:''
            },
            Token:Cookies.get('Token'),
            password:Cookies.get('password'),
            username:Cookies.get('username'),
            user_Type_name:this.props.location.state?this.props.location.state.user_Type_name:null,
            institute_id:this.props.location.state?this.props.location.state.institute_id:null,
            Delete:false,
            showIcon:false,
        }
    }
    componentDidMount(){
        if(document.getElementById('root').offsetWidth<797){
            this.setState({showIcon:true})
        }
        var test=[]
        var name=[]
        if(this.state.DetailPrescription.lab_result_at===null&&this.state.DetailPrescription.lab_take_at===null){
            test=[this.state.DetailPrescription.created_at]
            name=['created_at']
        }else if(this.state.DetailPrescription.lab_result_at===null){
            test=[this.state.DetailPrescription.created_at,this.state.DetailPrescription.lab_take_at]
            name=['created_at','lab_take_at']
        }else if(this.state.DetailPrescription.lab_take_at===null){
            test=[this.state.DetailPrescription.created_at,this.state.DetailPrescription.lab_result_at]
            name=['created_at','lab_result_at']
        }else {
            test=[this.state.DetailPrescription.created_at,this.state.DetailPrescription.lab_take_at,this.state.DetailPrescription.lab_result_at]
            name=['created_at','lab_take_at','lab_result_at']
        }
        for(var i=0;i<test.length;i++){
            if(test[i]===undefined){
                null
            }else{
            var list=test[i].split(',')
            list=list[1].split(' ')
            list=[list[1],list[2],list[3]]
            var mon=list[1]
            var month=null
        const data=this.state.form
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
          data[name[i]]=changeDate
          this.setState({form:data})
            }
      }
    }
    showResult=(name)=>{
        var Alldata=[]
        var listResult=this.state.DetailPrescription.result
            if(listResult!=null){
                for(var j=0;j<listResult.length;j++){
                    for(var w in listResult[j].Items){
                        if(name===listResult[j].Tets_name){
                            Alldata.push(
                            <div className='result'>
                            <label>{w} :</label>
                            <span>{listResult[j].Items[w]}</span>
                        </div>
                            )
                    }
                }
                }
            }
        return Alldata
    }
showItem=(name)=>{
    let AllData=[]
    const data=this.state.DetailPrescription.body
    for(var i=0;i<data.length;i++){
        if(name===data[i].Test_name){
        AllData.push(
            <div>
                <div>
                <label>موارد</label>
                </div>
                {   
                    data[i].Items?
                    data[i].Items.map((data,key)=>
                    <div>
                    <span>{data}</span>
                    </div>
                    )
                    :
                    ''
                }
            </div>
        )
        }
    }
    return AllData
    }
HandleDelete=(env)=>{
    this.setState({Delete:env})
}
LogOut=()=>{
    Cookies.remove('Token')
    Cookies.remove('password')
    Cookies.remove('username')
    window.location.reload(true)
        }
render(){
    if(this.state.Token&&this.state.username&&this.state.password){
    if(this.props.location.state===undefined){
        return <Redirect to='/prescription'/>
    }
    else
    {
    const data =this.state.DetailPrescription
     return(
         this.state.Delete?
         <DeletePrescription HandleDelete={this.HandleDelete} patient_name={data.patient_name} user_Type_name={this.state.user_Type_name} id={data.id}/>
        :
        <div className='col-12'>

            <div className='row'>

            <div className='col-md-8 col-12 mr-auto ml-auto mt-5'>
            <div className="list_prescription w-100 p-3">
            
             <div className='prField'>
                <label>نام بیمار :</label>
                <span>{data.patient_name}</span>
            </div>
            <div className='prField'>
                <label>سن بیمار :</label>
                <span>{data.patient_age}</span>
            </div>
            <div className='prField'>
                <label>کد ملی بیمار :</label>
                <span>{data.patient_national_code}</span>
            </div>
            <div className='prField'>
                <label>تاریخ نسخه :</label>
                <span>{this.state.form.created_at}</span>
            </div>
            <div className="prField">
                <label>تلفن بیمار : </label>
                <span>{data.patient_tel}</span>
            </div>
            <div className='prField'>
                <label>پزشک معالج :</label>
                <span>{data.drclinic_name} {data.drclinic_family}</span>
            </div>
            <div className='prField'>
                <label>نام آزمایشگاه :</label>
                <span>{data.lab_name}</span>
            </div>
            <div className='prField'>
                <label>پزشک آزمایشگاه :</label>
                <span>{data.drlab_name} {data.drlab_family}</span>
            </div>
            <div className='prField'>
                <label>تاریخ پذیرش :</label>
                <span>{this.state.form.lab_take_at}</span>
            </div>
            <div className='prField'>
                <label>تاریخ جواب دهی :</label>
                <span>{this.state.form.lab_result_at}</span>
            </div>
            <div className='prField col-12'>
                <h5 className='p-3'>آزمایشات :</h5>
                <div className='row'>
                {
                    data.result===null?
                    data.body.map((pr,id)=>
                    <div className='tests col-md-4 col-12'>
                    <div className='col-12'>
                    <div>
                        <label>نام آزمایش :</label>
                        <span>{pr.Test_name}</span>
                    </div>
                    {this.showItem(pr.Test_name)}
                    </div>
                    </div>
                    )
                    :
                    null
                    }
            </div>
            </div>

        <div className='prField col-12'>
                <h5 className='p-3 m-3'>نتیجه آزمایش </h5>
            <div className='row pr-5 pt-0'>
                {data.result===null?'در انتظار'
                :
                data.result.map((data,key)=>
                data.Tets_name!==undefined?
                <div className='col-12 col-md-4'>
                    <div className='name_lab'>
                 <label>نام آزمایش:</label> 
                <span>{data.Tets_name}</span>
                </div>
                 <label>موارد</label> 
                 <div className='result_lab'>
                 {this.showResult(data.Tets_name)}
                 </div>
                 </div>
                :
                null
                )
                }
            </div> 
            </div>

            <div className='prField'>
        <label> مورد تایید پزشک است؟</label>
        <span>{data.agree===false?'در انتظار':'بله'}</span>    
        </div>
        <div className='prField d-block'>
                <label>توضیحات :</label>
                <span>{data.description===null?' ':data.description}</span>
            </div>
                {this.state.user_Type_name==='drclinic'?
                data.lab_take_at===null&&data.lab_result_at===null&&data.result===null&&data.description===null&&data.agree===false?
                <div className='EditAndDelete p-3 m-3 d-flex justify-content-center'>
                <Link to={{pathname:`/EditePrescription`,state:{managers:data,user_Type_name:this.state.user_Type_name,institute_id:this.state.institute_id,showIcon:this.state.showIcon}}} >
                    <button style={{backgroundColor:'rgb(44, 255, 0)'}}>ویرایش</button>
                </Link>
                    <button onClick={()=>this.setState({Delete:true})} style={{backgroundColor:'rgb(245, 60, 60)'}}>حذف</button>
                </div>
                :''
                :
                ''
                }
                </div>

                </div>
                <div className='col-md-2 col-6'>
                <SideBar showIcon={this.state.showIcon} user_Type_name={this.props.location.state.user_Type_name} institute_id={this.props.location.state.institute_id} back={true}/>
                </div>
            </div>
        </div>







        )
            }
        }else return <Redirect to='/' />
}
}