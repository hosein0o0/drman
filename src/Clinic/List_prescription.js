import React ,{Component} from 'react'
import axios from 'axios';
import { Link ,Redirect} from 'react-router-dom';
import DataStatic from '../staticData'
import Cookies from 'js-cookie'
import * as moment from 'jalali-moment';
export default class list_prescription extends Component{
    constructor(props){
        super(props);
        this.state={
            username :Cookies.get('username'),
            password : Cookies.get('password'),
            Token:Cookies.get("Token"),
            institute_id:this.props.data.institute_id,
            user_Type_name:this.props.data.user_Type_name,
            ListPrescription:[],
            search:'',
            searchList:[],
            notFound:false,
            checkResult:'',
            DateList:[],
            DateListSearched:[],
            loading:true,
            loadingSearch:false,
            error:false,
        }
    }
    componentDidMount(){
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
                this.setState({ListPrescription:response.data})
                let AllDate=[]
                const data=response.data
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
            this.setState({error:true,loading:false})
        })
    }
handleSearch=(env)=>{
    this.setState({loadingSearch:true})
    this.setState({
        [env.target.name]:env.target.value
    })
    if(env.target.value!==''){
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
            let AllDateSearched=[]
            const data=response.data
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
        this.setState({error:true,loadingSearch:false})
    })
    }else{
        setTimeout(()=>{this.setState({notFound:false})},300);
    }
}
showSearch=()=>{
    if(this.state.loadingSearch){
        return(
            <div className='backgroundSearch'>
            <div class="lds-roller">
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
        <Link to={{pathname:`/singlePrescription`,state:{managers:data,user_Type_name:this.state.user_Type_name,institute_id:this.state.institute_id}}} >
        <div className="list_prescription w-100 mt-3 mb-3 p-3">

<div className='prField'>
    <label>نام بیمار :</label>
    <span>{data.patient_name}</span>
</div>
<div className='prField'>
    <label>کد ملی بیمار :</label>
    <span>{data.patient_national_code}</span>
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
render(){
    let mabain=this.state.ListPrescription.length*2*7.653846153846154
    let length=this.state.ListPrescription.length
    window.addEventListener('scroll', function() {
        console.log(document.getElementById('MyDiv').offsetHeight*length=== window.pageYOffset+mabain)
        // if(document.getElementById('MyDiv').offsetHeight=== window.pageYOffset){
            // this.setState({suggestSkip:this.state.suggestLimit+1 ,suggestLimit:this.status.suggestLimit+10,isLoading:true})
            // axios.get(`${DataStatic.domainIp}/public/api/v1/home?api_token=${this.state.dataUser[1]}&userPostSkip=${this.state.suggestSkip}&userPostLimit=${this.state.suggestLimit}&clubPostSkip=${this.state.suggestSkip}&clubPostLimit=${this.state.suggestLimit}`)
            // .then((response)=> {
            //  this.setState({data: response.data ,
            //   club_posts : response.data.club_posts, 
            //   tickets : response.data.tickets ,
            //   posts :response.data.posts,
            //   isLoading:false})
              
            // })
            // .catch( (err)=> {
            //   //   alert("something went Wrong",err);
            //   this.setState({isLoading:false,errorserver:true})
            // });
        // }
        // document.getElementById('myID').innerHTML = window.pageYOffset + 'px';
    });
    if(this.state.error){
    setTimeout(()=>this.setState({error:false}),5000)
    }
    if(this.state.username&&this.state.password&&this.state.Token){
        if(this.state.user_Type_name==='drclinic'||this.state.user_Type_name==='secretaryclinic'){
        if(this.state.loading){
            return(
                <div className='backgroundSearch col-10' style={{height:'100vh'}}>
                <div className="lds-roller">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    </div>
            )
        }else {
         return(
                <div className="col-md-6 col-12 mr-auto mt-3 ml-auto">
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
            <input placeholder=' جستجو بر اساس کد ملی بیمار' name='search' onChange={this.handleSearch}/>
        </div>
        <div className={`main position-relative ${this.state.loadingSearch?'h-100':'h-auto'}`}>
        {
        this.state.search===''?    
        this.state.ListPrescription.map((data,key)=>
        <Link to={{pathname:`/singlePrescription`,state:{managers:data,user_Type_name:this.state.user_Type_name,institute_id:this.state.institute_id}}} >
        <div className="list_prescription w-100 mt-3 mb-3 p-3" id='MyDiv'>

            <div className='prField'>
                <label>نام بیمار :</label>
                <span>{data.patient_name}</span>
            </div>
            <div className='prField'>
                <label>کد ملی بیمار :</label>
                <span>{data.patient_national_code}</span>
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
    )
        }
        }else return <Redirect to='/' />
    }else return <Redirect to='/' />
}
}