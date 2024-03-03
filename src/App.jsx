import { useState, useEffect } from "react";
import ToDoForm from "./ToDoForm";
import ToDoList from "./TodoList";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";

function App() {
    const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const [todos, setTodos] = useState(initialTodos);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    const addTodo = text => {
        setTodos([{ text, done: false }, ...todos]);
    };
    const toggleTodo = index => {
        const newTodos = [...todos];
        newTodos[index].done = !newTodos[index].done;
        setTodos(newTodos);
    };
    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const options = [
        {
            icon: <FaSun />,
            text: "light"
        },
        {
            icon: <FaMoon />,
            text: "dark"
        },
        {
            icon: <FaDesktop />,
            text: "system"
        }
    ];

    function onWindowMatch() {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && darkQuery.matches)
        ) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark");
        }
    }
    onWindowMatch();

    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add("dark");
                localStorage.setItem("theme", "dark");
                break;
            case "light":
                element.classList.remove("dark");
                localStorage.setItem("theme", "light");
                break;
            default:
                localStorage.removeItem("theme");
                onWindowMatch();
                break;
        }
    }, [theme]);

    darkQuery.addEventListener("change", e => {
        if (!("theme" in localStorage)) {
            if (e.matches) {
                element.classList.add("dark");
            } else {
                element.classList.remove("dark");
            }
        }
    });
    return (
        <div className="App">
            <div className="theme">
                {options?.map(opt => (
                    <button
                        key={opt.text}
                        title={opt.text}
                        onClick={() => setTheme(opt.text)}
                        className={`theme-icon button ${
                            theme === opt.text && "active"
                        }`}
                    >
                        {opt.icon}
                    </button>
                ))}
            </div>
            <h1>To-Do List</h1>
            <ToDoForm addTodo={addTodo} />
            <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        </div>
    );
}
export default App;
