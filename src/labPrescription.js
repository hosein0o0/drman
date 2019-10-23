import React , {Component} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import DataStatic from './staticData'
import Cookies from 'js-cookie'
import * as moment from 'jalali-moment';
import SideBar from './sidebar'
export default class Lab extends Component{
    constructor(props){
        super(props);
        this.state = {
            Token:Cookies.get("Token"),
            password : Cookies.get('password'),
            username : Cookies.get('username'),
            institute_id:this.props.location.state?this.props.location.state.institute_id:null,
            user_Type_name:this.props.location.state?this.props.location.state.user_Type_name:null,
            listPrescription:[],
            searchList:[],
            search:'',
            notFound:false,
            DateList:[],
            DateListSearched:[],
            loading:true,
            loadingSearch:false,
            error:false,
            showIcon:false
        }           
    }
componentDidMount(){
    if(document.getElementById('root').offsetWidth<797){
        this.setState({showIcon:true})
    }
    axios.get(`${DataStatic.domainIp}/ListPrescription?institute_id=${this.state.institute_id}`,{
        headers: 
            {'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'api_token' : this.state.Token
            }
          })
          .then((response)=>{
              this.setState({loading:false})
              if(response.data===0){
                  alert('نسخه ای یافت نشد')
              }else if(response.data===1){
                  alert('محل یافت نشد')
              }else if(response.data===2){
                  alert('ارتباط برقرار نشد')
              }else if(response.data===3){
                  alert('بیمار وجود ندارد')
              }else {
                  this.setState({listPrescription:response.data})
                  const data=response.data
                  let AllDate=[]
                  for(var j=0;j<data.length;j++){
                  var date=data[j].created_at.split(',')[1].split(' ')
                  let ListDate=[date[3],date[2],date[1]]
                  var mon=ListDate[1]
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
                const list=[ListDate[0],month,ListDate[2]].toString()
                var date=list.replace(/,/g,'/')
                const changeDate =moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                AllDate.push(changeDate)
              }
              this.setState({DateList:AllDate})
              }
          })
          .catch((err)=>{
            this.setState({error:true})
          })
    }
    handleSearch=(env)=>{
        this.setState({[env.target.name]:env.target.value})
        if(env.target.value!==''){
            this.setState({loadingSearch:true})
            axios.get(`${DataStatic.domainIp}/Search_Prescription?national_code=${env.target.value}&institute_id=${this.state.institute_id}`,{
                headers: 
                {'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'api_token' : this.state.Token
                }
            })
            .then((response)=>{
                this.setState({loadingSearch:false})
                if(response.data===0){
                    alert('نسخه ای وجود ندارد')
                }else if(response.data===1){
                    alert('مکان یافت نشد')
                }else if(response.data===2){
                    alert('دسترسی ممکن نیست')
                }else if(response.data===3){
                    this.setState({notFound:true})
                }else{
                    this.setState({searchList:response.data,notFound:false})
                    const data=response.data
                    let AllDateSearched=[]
                    for(var j=0;j<data.length;j++){
                    var date=data[j].created_at.split(',')[1].split(' ')
                    let ListDate=[date[3],date[2],date[1]]
                    var mon=ListDate[1]
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
                  const list=[ListDate[0],month,ListDate[2]].toString()
                  var date=list.replace(/,/g,'/')
                  const changeDate =moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                  AllDateSearched.push(changeDate)
                }
                this.setState({DateListSearched:AllDateSearched})
                }
            })
            .catch((err)=>{
                this.setState({error:true})
            })
            }else{
                this.setState({loadingSearch:false})
                setTimeout(()=>{this.setState({notFound:false})},300);
            }
}
showSearch=()=>{
    if(this.state.loadingSearch){
        return(
        <div className='backgroundSearch' style={{height:'100vh'}}>
        <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
            </div>
        )
    }else{
    if(this.state.notFound){
        return(
            <div className='notfound'>
                <h2>نسخه مورد نظر یافت نشد </h2>
            </div>
        )
    }
        else{
        return(
        this.state.searchList.map((data,key)=>
        <Link to={{pathname:`/singlepr`,state:{managers:data,user_Type_name:this.state.user_Type_name,institute_id:this.state.institute_id}}} >

        <div className="list_prescription w-100 mt-3 mb-3 p-3">
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
                <label>نام مطب :</label>
                <span>{data.clinic_name}</span>
        </div>
        <div className='prField'>
                    <label>تاریخ نسخه :</label>
                    <span>{this.state.DateListSearched[key]}</span>
                </div>
        </div>
        </Link>
        )
            )
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
        console.log(this)
        if(this.props.location.state){
        if(this.state.username&&this.state.password&&this.state.Token){
            if(this.state.user_Type_name==='drlab'||this.state.user_Type_name==='secretarylab'){
            if(this.state.loading){
                return(
        <div className='backgroundSearch'>
        <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
            </div>
                )
            }
            else return(
                <div className='col-12'>
                <div className='row'>
                    <div className="col-md-8 col-12 m-auto">
                    {
                    this.state.error?
                    <div className='error'>
                    <span>ارتباط با سرور برقرار نشد</span>
                    </div>
                    :
                    ''
                    }
                    <header className='head'>
                            <h2>لیست نسخه ها</h2>
                        </header>
            <div className='search'>
                <input placeholder='جستجو' name='search' onChange={this.handleSearch}/>
            </div>
            <div className={`main ${this.state.loadingSearch?'h-100':'h-auto'}`}>
            {
            this.state.search===''?
            this.state.listPrescription.map((data,key)=>
            <Link to={{pathname:`/singlepr`,state:{managers:data,user_Type_name:this.state.user_Type_name,institute_id:this.state.institute_id}}}>
            <div className="list_prescription w-100 mt-3 mb-3 p-3">
    
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
                    <label>نام مطب :</label>
                    <span>{data.clinic_name}</span>
                </div>
                <div className='prField'>
                    <label>تاریخ نسخه :</label>
                    <span>{this.state.DateList[key]}</span>
                </div>
            </div>
            </Link>
            )
            :
            this.showSearch()
        }
        </div>
            </div>
            <div className='col-md-2 col-6'>
                <SideBar showIcon={this.state.showIcon} List={true}/>
            </div>
            </div>
            </div>
               )
        }else return <Redirect to='/' />
    }else{

            return <Redirect to="/"/> 
        }
        
    }else return <Redirect to="/"/> 
}
}