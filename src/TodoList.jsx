import {FaTrash} from "react-icons/fa"

function ToDoList({ todos, toggleTodo, deleteTodo }) {
    if (todos.length == 0)
        return (
            <div className="empty">
                <h2>nothing to show</h2>
            </div>
        );
    return (
        <ul class="list">
            {todos.map((todo, index) => (
                <li className="list-item" key={index}>
                    <input
                        type="checkbox"
                        className="check"
                        checked={todo.done}
                        onChange={() => toggleTodo(index)}
                        title="Mark as done"
                    />
                    <span
                        className="todo-text"
                        style={{
                            textDecoration: todo.done ? "line-through" : "none"
                        }}
                    >
                        {todo.text}
                    </span>
                    <button className="button" title="delete item" onClick={() => deleteTodo(index)}><FaTrash/></button>
                </li>
            ))}
        </ul>
    );
}

export default ToDoList;
