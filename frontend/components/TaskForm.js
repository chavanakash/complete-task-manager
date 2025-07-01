import { useState } from "react";
import axios from "axios";

export default function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTitle("");
            onTaskCreated();
        } catch (err) {
            console.error("Task creation failed:", err.response?.data || err.message);
            alert("Please log in to add tasks.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a new task..."
            />
            <button type="submit">Add</button>
        </form>
    );
}
