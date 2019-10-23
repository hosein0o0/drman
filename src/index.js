import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Login from './Login/Login';
import SignFirst from './Sign/sign'
import Prescription from './Clinic/MainClinic'
import labPrescription from './labPrescription'
import prescriptionPatients from './prescriptionPatinets'
import SinglePrescription from './Clinic/singlePrescription'
import EditePrescription from './Clinic/EditePrescription'
import EditePrescriptionlab from './EditePrescriptionLab'
import SignDoctor from './Sign/MainDoctor'
import './css/style.css'
import './css/bootstrap.min.css';
import './css/fontawesome.min.css';
import './css/fontawesome.scss'
import './css/app.css'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
const routes = (
<Router>
<Switch>
<Route exact path="/" component={App}/>
 <Route path="/login/" component={Login}/>
<Route path="/CreateUser" component={SignFirst} />
<Route path="/prescription" component={Prescription} />
<Route path="/labPrescription" component={labPrescription} />
<Route path={`/singlepr`} component={prescriptionPatients} />
<Route path='/singlePrescription' component={SinglePrescription} />
<Route path='/EditePrescription' component={EditePrescription} />
<Route path='/EditePrescriptionlab' component={EditePrescriptionlab} />
<Route path='/CreateDr/:name' component={SignDoctor} />
</Switch>
</Router>
)
ReactDOM.render(routes, document.getElementById('root'));
