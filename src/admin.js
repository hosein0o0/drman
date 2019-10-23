import React , {Component} from 'react'
import CreateClinic from './CreateClinic'
import CreateLab from './CreateLab'
export default class Admin extends Component{
    constructor(props){
        super(props);
        this.state={
            handle:false
        }
    }
changeHandle=(env)=>{
    this.setState({handle:env})
}
    render(){
        return(
            <div className='col-12'>
                <div className='row'>
                    <div className='container'>
                        <div className='form col-md-8 col-12 mt-5 mr-auto ml-auto'>
                            {
                                this.state.handle?
                                <CreateClinic changeHandle={this.changeHandle}/>
                                :
                                <CreateLab  changeHandle={this.changeHandle}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}