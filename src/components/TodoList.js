import React from 'react';
import {Todo} from './Todo';
import Box from '@material-ui/core/Box';

export class TodoList extends React.Component {
 
 
    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            if (this.props.filter !== null){
                if (this.props.filter.dueDate !== null){
                    let fechaIgual = this.props.filter.dueDate.isSame(todo.dueDate, "day");
                    if ((todo.responsible.name.includes(this.props.filter.responsible)) &&  (todo.status.includes(this.props.filter.status)) && (fechaIgual) ){
                        return (
                            <Todo key={i} description={todo.description} status={todo.status} dueDate={todo.dueDate} 
                            responsible={todo.responsible}/>
                        );
                    }
                }
                else{
                    if ((todo.responsible.name.includes(this.props.filter.responsible)) &&  (todo.status.includes(this.props.filter.status))){
                        return (
                            <Todo key={i} description={todo.description} status={todo.status} dueDate={todo.dueDate} 
                            responsible={todo.responsible}/>
                        );
                    }
                }
            }
            else{
                return (
                    <Todo key={i} description={todo.description} status={todo.status} dueDate={todo.dueDate} 
                    responsible={todo.responsible}/>
                );
            }
        });

        return (

            <Box component="span" display="block" p={1} m={1} >
                {todoList}
            </Box>
            
          
        );
    }

}
