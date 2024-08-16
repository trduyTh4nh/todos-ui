import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const ListTodo = ({ priority, task, handleUpdateTodo, handleDeleteATodo }) => {
    const [currentTask, setCurrentTask] = useState([])

    useEffect(() => {
        if (task) {
            let filteredTasks = task;
            switch (priority) {
                case 2: filteredTasks = task.filter((e) => e.completed === true); break
                case 3: filteredTasks = task.filter((e) => e.completed === false); break
                default: filteredTasks = task
            }

            setCurrentTask(filteredTasks)
        }
    }, [priority, task])

    return (<>
        <div className="home-wrap-todo">
        <TransitionGroup className={"home-wrap-todo"}>
                {currentTask.map((t) => (
                    <CSSTransition
                        key={t.id}
                        timeout={300}
                        classNames="todo-item" 
                    >
                        <TodoItem
                            item={t}
                            handleCheckTodo={(id, checked) => handleUpdateTodo(id, checked)}
                            handleDeleteTodos={(id) => handleDeleteATodo(id)}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    </>)
}
 
export default ListTodo