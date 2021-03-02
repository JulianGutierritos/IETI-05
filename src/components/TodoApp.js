import React, {Component} from 'react';
import './TodoApp.css';
import {TodoList} from "./TodoList";
import Box from '@material-ui/core/Box';
import { MyDrawer } from './Drawer';
import Todos from './Data';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import { history } from './../App';
import TransitionsModal from './Modals';


export class TodoApp extends Component {

    constructor(props) {
        super(props);
        if (localStorage.items === undefined){
            localStorage.items = JSON.stringify(Todos);
        }
        this.state = {items: JSON.parse(localStorage.items),  filter : null};
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    render() {
        return (
            <Box className="todos">
                <MyDrawer handleLogOut={this.handleLogOut}/>
                <TransitionsModal changeFilter={this.handleChangeFilter}/>
                <br/>
                <br/>
                <div>
                <Typography variant="h2" >TODOS</Typography>
                <TodoList todoList={this.state.items} filter={this.state.filter}/>
                </div>
                <IconButton style={{position:'fixed', left:'90%', top:'90%'}} onClick={() => { this.handleRedirect() }}>
                    <AddBoxIcon style={{color:'green', fontSize:'50px'}}>
                    </AddBoxIcon>
                </IconButton>
            </Box>
        );
    }

    handleChangeFilter(item) {
        this.setState({filter: item});
    }

    handleLogOut(){
        localStorage.isLoggedIn = "false";
        history.push({pathname: "/login"});
    }

    handleRedirect(){
        history.push({pathname: "/addTodo"});
    }

}
