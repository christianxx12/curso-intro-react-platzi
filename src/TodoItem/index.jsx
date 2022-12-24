import React from "react"
import "./TodoItem.css"
import { AiOutlineCheck } from "react-icons/ai"
import { AiOutlineClose } from "react-icons/ai"

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${props.completed && "Icon-check--active"}`}
        onClick={props.onComplete}
      >
        <AiOutlineCheck />
      </span>
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      <span className="Icon Icon-delete" onClick={props.onDelete}>
        <AiOutlineClose />
      </span>
    </li>
  )
}

export { TodoItem }
