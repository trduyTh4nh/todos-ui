import '../styles/todo.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TodoItem = ({ item, handleDeleteTodos, handleCheckTodo }) => {
    return <>
       <CSSTransition
            in={item.completed}
            timeout={300}
            classNames="animation-check"
        >
            <div className="todo-item">
                <div className={item.completed ? "todo-item_wrap-checked" : "todo-item_wrap"}>
                    <div className="item_wrap-right">
                        <div className="item_wrap-checkbox">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={(e) => handleCheckTodo(item.id, e.target.checked)}
                            />
                        </div>
                        <div className="item_wrap-content">
                            <p>{item.task}</p>
                        </div>
                    </div>
                    <div className="item_wrap-delete" onClick={() => handleDeleteTodos(item.id)}>
                        <IoIosCloseCircleOutline className='icon-delete' size={34}></IoIosCloseCircleOutline>
                    </div>
                </div>
            </div>
        </CSSTransition>
    </>
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        task: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired
    }),
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
}

export default TodoItem 