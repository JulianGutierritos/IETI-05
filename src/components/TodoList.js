import React from 'react';
import {Todo} from './Todo';
import Box from '@material-ui/core/Box';

export class TodoList extends React.Component {
    constructor(props){
        super(props);
        console.log("entro todo list");
        console.log(this.props.item);
        if (this.props.item != null){
            alert("holaaaa");
            console.log(this.props.item);
        }
    }


    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} description={todo.description} status={todo.status} dueDate={todo.dueDate} 
                responsible={todo.responsible}/>
            );
        });

        return (

            <Box component="span" display="block" p={1} m={1} >
                {todoList}
            </Box>
            
          
        );
    }

}
