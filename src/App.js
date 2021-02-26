import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import './components/TodoApp.css';
import {TodoApp} from './components/TodoApp';
import {AddTodo} from './components/AddTodo';
import {Login} from './components/Login';
import {Registration} from './components/Registration';
import {BrowserRouter as Link, Route, Switch, BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({forceRefresh:true});

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn === true
          ? <Component {...props} />
          : <Redirect to='/login' />
    )} />
)

const PrivateRoute2 = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn === false
          ? <Component {...props} />
          : <Redirect to='/todoApp' />
    )} />
)




export class App extends Component {
	constructor(props) {
        super(props);
        if (localStorage.isLoggedIn === "true"){
            this.state = { isLoggedIn : true };
        }
        else{
            this.state = { isLoggedIn : false };
        }
		this.handleChangeIsLoggedIn = this.handleChangeIsLoggedIn.bind(this);
        this.handleChangeIsLoggedOut = this.handleChangeIsLoggedOut.bind(this);
		this.TodoAppView = () => (<TodoApp />);
		this.LoginView = () => (<Login handleChangeIsLoggedIn = {this.handleChangeIsLoggedIn}/>);
        this.AddTodo = () => (<AddTodo />); 
    }
	
    render() {
        return (
            <BrowserRouter history={history}>
                <Switch>
                <Redirect exact from='/' to='/login' />
				<PrivateRoute2 path={"/login"} isLoggedIn={this.state.isLoggedIn} component={this.LoginView}/>
                <Route path={"/registration"} isLoggedIn={this.state.isLoggedIn} component={Registration}/>
				<PrivateRoute path={"/todoApp"} isLoggedIn={this.state.isLoggedIn} component={TodoApp}/>
				<PrivateRoute path={"/addTodo"} isLoggedIn={this.state.isLoggedIn} component={AddTodo}/>
				</Switch>
            </BrowserRouter>
		);
	}
	handleChangeIsLoggedIn(e){
        this.setState({ 
			isLoggedIn  : true
        }); 
	}
    handleChangeIsLoggedOut(e){
        this.setState({ 
			isLoggedIn  : false
        }); 
	}
}



