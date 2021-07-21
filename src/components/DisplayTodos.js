import React, {useState} from 'react';
import {connect} from "react-redux";
import {addTodos, completeTodos, removeTodos, updateTodos} from "../redux/reducer";
import TodoItem from "./TodoItem";
import {motion} from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (obj) => dispatch(completeTodos(obj)),
  }
}

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        {props.todos.length > 0 && "active" === sort ?
          props.todos.map((item) => {
            return (
              false === item.completed &&
              <TodoItem
                key={item.id}
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
              />
            )
          }) :
        null}
        {/*for completed items*/}
        {props.todos.length > 0 && "completed" === sort ?
          props.todos.map((item) => {
            return (
              true === item.completed &&
              <TodoItem
                key={item.id}
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
              />
            )
          }) :
        null}
        {/* for all items */}
        {props.todos.length > 0 && "all" === sort ?
          props.todos.map((item) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
              />
            )
          }) :
        null}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
