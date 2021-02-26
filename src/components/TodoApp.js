import React, {Component} from 'react';
import './TodoApp.css';
import {TodoList} from "./TodoList";
import moment from "moment";
import Box from '@material-ui/core/Box';
import { MyDrawer } from './Drawer';
import Todos from './Data';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import { history } from './../App';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import  DateFnsUtils  from "@date-io/date-fns";
import TransitionsModal from './Modals'


export class TodoApp extends Component {

    constructor(props) {
        super(props);
        if (localStorage.items === undefined){
            localStorage.items = JSON.stringify(Todos);
        }
        this.state = {items: JSON.parse(localStorage.items), description : "",
                    status: "In Progress", dueDate: null, responsibleName: '', responsibleEmail : '', open : false, item : null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleResponsibleNameChange = this.handleResponsibleNameChange.bind(this);
        this.handleResponsibleEmailChange = this.handleResponsibleEmailChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(){
        this.setState({open: true});
    }

    handleClose(){
        this.setState({open: false});
    }

    render() {
        const formato = (<form onSubmit={this.handleSubmit} className="todo-form" >
                        <Card>
                            <CardContent>
                            <h3>Filter Task</h3>
                            <label htmlFor="description" className="right-margin">
                                Description:
                            </label>

                            <Input
                                id="description"
                                type="String"
                                onChange={this.handleDescriptionChange}
                                value={this.state.description}>
                            </Input>

                            <br/>
                            <br/>
                            <label htmlFor="status" className="right-margin">
                                Status:
                            </label>

                            <Select
                                id="status"
                                type="string"
                                onChange={this.handleStatusChange}
                                value={this.state.status}>
                                
                                <MenuItem value={"In Progress"}>In Proggress</MenuItem>
                                <MenuItem value={"Ready"}>Ready</MenuItem>
                            </Select>

                            <br/>
                            <br/>
                            <label htmlFor="date" className="right-margin">
                                Due Date:
                            </label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                id="due-date"
                                value={this.state.dueDate}
                                onChange={this.handleDateChange}>
                            </DatePicker>
                            </MuiPickersUtilsProvider>

                            <h3>Responsible</h3>

                            <label htmlFor="ResponsibleName" className="right-margin">
                                Name:
                            </label>

                            <Input
                                id="ResponsibleName"
                                onChange={this.handleResponsibleNameChange}
                                value={this.state.responsibleName}>
                            </Input>

                            <br/>
                            <br/>

                            <label htmlFor="email" className="right-margin">
                                Email:
                            </label>

                            <Input
                                id="ResponsibleEmail"
                                autoComplete="email" 
                                autoFocus
                                onChange={this.handleResponsibleEmailChange}
                                value={this.state.responsibleEmail}>
                            </Input>
                            </CardContent>
                            <Button type='submit' onClick={() => { this.props.close() }} >
                                Add
                            </Button>
                        </Card>
                        </form>);
        return (
            <Box className="todos">
                <MyDrawer handleLogOut={this.handleLogOut}/>
                <TransitionsModal component={formato}/>
                <div>
                <Typography variant="h2" >TODOS</Typography>
                <TodoList todoList={this.state.items} filtro={this.state.item}/>
                </div>
                <IconButton style={{position:'fixed', left:'90%', top:'90%'}} onClick={() => { this.handleRedirect() }}>
                    <AddBoxIcon style={{color:'green', fontSize:'50px'}}>
                    </AddBoxIcon>
                </IconButton>
            </Box>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        const newItem = {
            description: this.state.description,
            status: this.state.status,
            dueDate: this.state.dueDate,
            responsibleEmail : this.state.responsibleEmail,
            responsibleName : this.state.responsibleName
        };
        this.setState({item: newItem});
    }

    handleClear(){
        const newItem = {
            description: "",
            status: "",
            dueDate: moment(),
            responsibleEmail : "",
            responsibleName : ""
        };
        this.setState({item: newItem});

    }

    handleLogOut(){
        localStorage.isLoggedIn = "false";
        history.push({pathname: "/login"});
    }

    handleRedirect(){
        history.push({pathname: "/addTodo"});
    }

    handleResponsibleEmailChange(e){
        this.setState({
            responsibleEmail : e.target.value
        });
    }

    handleResponsibleNameChange(e){
        this.setState({
            responsibleName : e.target.value
        });
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: moment ( e )
        });
    }

}
