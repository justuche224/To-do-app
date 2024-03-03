import { useState } from "react";

function ToDoForm({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Add to-do"
            />
            <button className="buttton submit" type="submit">
                add
            </button>
        </form>
    );
}

export default ToDoForm;
