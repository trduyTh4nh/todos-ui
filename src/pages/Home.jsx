
import { useCallback, useEffect, useState } from 'react'
import TypeWriter from '../components/TypeWriter'
// import debounce from 'lodash.debounce'
import '../styles/home.css'
import InputField from '../components/InputField'
import ItemFilter from '../components/ItemFilter'
// import TodoItem from '../components/TodoItem'
import ListTodo from '../components/ListTodo'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const listFliterData = [
    {
        id: 1,
        content: "All",
        isChecked: true
    }, {
        id: 2,
        content: "Completed",
        isChecked: false
    }, {
        id: 3,
        content: "Uncompleted",
        isChecked: false
    }]

const Home = () => {


    // const debouncedSetTodo = useCallback(
    //     debounce((value) => {
    //         setTodo(value);
    //     }, 1000), 
    //     []
    // );

    // const handleTypeTodo = (value) => {
    //     setTodo(value.target.value);
    // };

    const [todo, setTodo] = useState('')
    const [task, setTask] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [priority, setPriority] = useState(1)
    const [listFliter, setListFilter] = useState(listFliterData)

    const handleTypeTodo = useCallback((value) => {
        setTodo(value.target.value);
    }, []);

    const updateLocalStorage = (updateTasks) => {
        localStorage.setItem("todos", JSON.stringify(updateTasks))
        setTask(updateTasks)
    }
    const handleAddToDo = () => {
        if (todo.trim() !== "") {
            const newTask = { id: Date.now(), task: todo, completed: false }
            updateLocalStorage([...task, newTask])
            setTodo("")
        }
    }

    const deleteTodo = (id) => {
        const tasks = task.filter((e) => e.id !== id)
        updateLocalStorage(tasks)
    }

    const updateTodo = (id, event) => {
        const tasks = task.map((e) => {
            if (e.id === id) {
                e.completed = event
            }
            return e
        })
        updateLocalStorage(tasks)
    }
    const handleUpdateTodo = (id, checked) => {
        // console.log(id)
        updateTodo(id, checked)
    }

    const handleDeleteATodo = (id) => {
        deleteTodo(id)
    }

    const handleDeleteAllTodo = () => {
        updateLocalStorage([])
    }

    const handleChangeFliter = (position) => {
        var list = []
        list = listFliterData.map((item) => {
            item.id === position ? item.isChecked = true : item.isChecked = false
            return item
        })
        setListFilter(list)
        setPriority(position)
    }


    useEffect(() => {
        var saveTasks = localStorage.getItem("todos")
        if (saveTasks) {
            setTask(JSON.parse(saveTasks))
        }


    }, [])


    // useEffect(() => {
    //     const inputElement = document.querySelector('.input-main')
    //     if(inputElement){
    //         const handleKeyPress = (e) => {
    //             if(e.key === 'Enter') {
    //                 handleAddToDo()
    //             }
    //         }
    //         inputElement.addEventListener('keypress', handleKeyPress)

    //         return () => {
    //             inputElement.removeEventListener('keypress', handleKeyPress)
    //         }
    //     }
    // }, [handleAddToDo])
    return (<>
        <div className="home">
            <div className="home-wrap_title">
                <TypeWriter text={`What's plan for today?🤔`} delay={100}  ></TypeWriter>
            </div>
            <div className="home-wrap_body">
                <div className="home-wrap_body-header">
                    <div className="home-wrap_body-input">
                        {/* <input type="text" value={todo} onChange={handleTypeTodo} placeholder='Write your todo here!' /> */}
                        <InputField value={todo} onChange={handleTypeTodo}></InputField>
                    </div>
                    <div className="home-wrap_body-button">
                        <input onClick={handleAddToDo} type="button" value="Add todo" />
                    </div>
                </div>

                <div className="home-wrap-filter">
                    {
                        listFliter.map((item) =>
                            (<ItemFilter index={item.id} content={item.content} onChangeFilter={handleChangeFliter} check={item.isChecked}></ItemFilter>)
                        )
                    }
                </div>

                <div className="list-todo">
                    <ListTodo task={task} priority={priority} handleUpdateTodo={handleUpdateTodo} handleDeleteATodo={handleDeleteATodo}></ListTodo>
                </div>
                {/* <div className="home-wrap-todo">
                    {task.map((t) => (<TodoItem item={t} handleCheckTodo={handleUpdateTodo} handleDeleteTodos={handleDeleteATodo}></TodoItem>))}
                </div> */}

                {task.length > 2 ? (
                    <>
                        <TransitionGroup>
                            {showPopup &&
                                <CSSTransition
                                    in={showPopup}
                                    timeout={300}
                                    classNames="popup-animation"
                                >
                                    <div className='popup-container'>
                                        <div className="pop-confirm">
                                            <div className="pop-confirm-title">
                                                Are you sure🥵?
                                            </div>
                                            <div className="pop-confirm-action">
                                                <button className='action-popup-btn' onClick={handleDeleteAllTodo}>Yes</button>
                                                <button className='action-popup-btn-no' onClick={() => setShowPopup(pop => !pop)}>No</button>
                                            </div>
                                        </div>
                                        <div className="triangle-down"></div>
                                    </div>
                                </CSSTransition>
                            }
                        </TransitionGroup>
                        <div className="remove-button" onClick={() => setShowPopup(pop => !pop)} >

                            <button>Remove all</button>
                        </div>
                    </>
                ) : <></>}
            </div>
        </div>

    </>)
}

export default Home