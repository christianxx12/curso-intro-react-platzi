import React from "react"
import { useLocalStorage } from "./useLocalStorage"

const TodoContext = React.createContext()

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", [])

  const [searchValue, setSearchValue] = React.useState("")
  const [openModal, setOpenModal] = React.useState(false)

  // Calcula la cantidad de TODOs completados
  const completedTodos = todos.filter((todo) => todo.completed == true).length
  // Calcula la cantidad de TODOs
  const totalTodos = todos.length

  let searchedTodos = []

  if (!(searchValue.length >= 1)) {
    searchedTodos = todos
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase()
      const searchText = searchValue.toLowerCase()
      return todoText.includes(searchText)
    })
  }

  // Función para añadir un TODO
  const addTodo = (text) => {
    const newTodos = [...todos]
    newTodos.push({
      completed: false,
      text,
    })
    saveTodos(newTodos)
  }

  // Funcion para modificar la propiedad completed del TODO
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text)
    const newTodos = [...todos]
    newTodos[todoIndex].completed = true
    saveTodos(newTodos)
  }

  // Funcion para eliminar TODOs
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text)
    const newTodos = [...todos]
    newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  }

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        addTodo,
        deleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  )
}

export { TodoContext, TodoProvider }
