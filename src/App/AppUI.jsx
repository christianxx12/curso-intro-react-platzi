import React from "react"
import { TodoContext } from "../TodoContext"
import { TodoCounter } from "../TodoCounter"
import { TodoSearch } from "../TodoSearch"
import { TodoList } from "../TodoList"
import { TodoItem } from "../TodoItem"
import { TodosError } from "../TodosError"
import { TodosLoading } from "../TodosLoading"
import { EmptyTodos } from "../EmptyTodos"
import { TodoForm } from "../TodoForm"
import { CreateTodoButtom } from "../CreateTodoButtom"
import { Modal } from "../Modal"

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext)

  return (
    <>
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error && <TodosError error={error} />}
        {loading && <TodosLoading />}
        {!loading && !searchedTodos.length && <EmptyTodos />}

        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {/* Si openModal es true muestra el Modal */}
      {!!openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <CreateTodoButtom setOpenModal={setOpenModal} />
    </>
  )
}

export { AppUI }
