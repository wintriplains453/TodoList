import { FC, useEffect, useState } from "react";
import dataOptions from "./data";
import { ITodoData } from "./interface";

import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";
import './todo.scss'

const TodoComponent: FC = () => {
  const [todoOptions, setTodoOptions] = useState<ITodoData[]>(dataOptions)
  const [todoOptionsCopy, setTodoOptionsCopy] = useState<ITodoData[]>(dataOptions)
  const [todoItemLeft, setTodoItemLeft] = useState<number>(0)
  const [is_options, setIsOptions] = useState<boolean>(false)
  const [buttonState, setButtonState] = useState<string>("All")

  useEffect(() => {
    const count = todoOptions.filter(item => item.active !== true).length
    setTodoItemLeft(count)
  }, [todoOptions])

  const switchActive = (id: number) => {
    const newTodoOptions = todoOptions.map(item => {
      if (item.id === id) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setTodoOptions(newTodoOptions);
    setTodoOptionsCopy(newTodoOptions);
  }

  const filterAllTodo = () => {
    setTodoOptionsCopy(todoOptions)
    setButtonState("All")
  }
  const filterActiveTodo = () => {
    setTodoOptionsCopy(todoOptions.filter(item => item.active !== true))
    setButtonState("Active")
  }

  const filterComplitedTodo = () => {
    const newFilterData = todoOptions.filter(item => item.active !== false)
    if(newFilterData.length === 0) return
    
    setTodoOptionsCopy(newFilterData)
    setButtonState("Complited")
  }

  const clearTodo = () => {
    setTodoOptions(dataOptions)
    setTodoOptionsCopy(dataOptions)
    setButtonState("All")
  }
    
  return (
    <div className="wrapperTodo">
      <div 
        className="headerTodo" 
        onClick={() => setIsOptions(!is_options)}
        data-testid="test-header"
      >
        {is_options ? <i><IoIosArrowDown /></i> : <i><IoIosArrowUp /></i> }
        <p className="headerTodoPlaceholder">What needs to be done</p>
      </div>
      {is_options ?
        <div data-testid="test-checked-switch">
          {todoOptionsCopy.map(item => (
            <div 
              key={item.id} 
              className="todoItem"
              onClick={() => switchActive(item.id)}
            >
              <input 
                type="checkbox" 
                id={item.id.toString()}
                onChange={() => switchActive(item.id)}
                checked={item.active} 
              />
              <label htmlFor={item.active.toString()} />
              <p className={item.active ? "todoItemNotActive": "none"}>{item.text}</p>
            </div>
          ))
          }
          <div className="wrapperPanel">
            <p>{todoItemLeft} item left</p>
            <div>
              <button 
                className="btn" 
                onClick={filterAllTodo}
                style={{border: buttonState === "All" ? '1px solid #EECACA': ''}}
              >All</button>
              <button 
                className="btn" 
                onClick={filterActiveTodo}
                style={{border: buttonState === "Active" ? '1px solid #EECACA': ''}}
              >Active</button>
              <button 
                className="btn" 
                onClick={filterComplitedTodo}
                style={{border: buttonState === "Complited" ? '1px solid #EECACA': ''}}
              >Complited</button>            
            </div>
            <div>
              <button 
                className="btn" 
                name="Clear" 
                onClick={clearTodo}
              >Clear complited</button>              
            </div>
          </div>
        </div> : null
      }
    </div>
  );
}

export default TodoComponent;