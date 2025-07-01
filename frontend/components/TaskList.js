import axios from "axios";

export default function TaskList({ tasks, onTaskUpdate }) {
    const handleToggle = async (task) => {
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task._id}`, {
            completed: !task.completed,
        });
        onTaskUpdate();
    };

    const handleDelete = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`);
        onTaskUpdate();
    };

    if (tasks.length === 0) return <p>No tasks yet!</p>;

    return (
        <div>
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className={`task ${task.completed ? "completed" : ""}`}
                >
                    <span onClick={() => handleToggle(task)}>{task.title}</span>
                    <button onClick={() => handleDelete(task._id)}>✕</button>
                </div>
            ))}
        </div>
    );
}
