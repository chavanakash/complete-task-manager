import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Redirect to login if token is missing
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            fetchTasks(token);
        }
    }, []);

    const fetchTasks = async (token) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(res.data);
        } catch (err) {
            setError("Could not fetch tasks");
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!title.trim()) return;

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`,
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTitle("");
            fetchTasks(token); // Refresh task list
        } catch (err) {
            setError("Failed to add task");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Your Task Manager</h2>

            <form onSubmit={handleAddTask} style={styles.form}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Task</button>
            </form>

            {error && <p style={styles.error}>{error}</p>}

            <ul style={styles.list}>
                {tasks.map((task) => (
                    <li key={task._id} style={styles.listItem}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center"
    },
    form: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px"
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#0070f3",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },
    error: {
        color: "red"
    },
    list: {
        listStyle: "none",
        padding: 0
    },
    listItem: {
        backgroundColor: "#f5f5f5",
        margin: "5px 0",
        padding: "10px",
        borderRadius: "5px"
    }
};
