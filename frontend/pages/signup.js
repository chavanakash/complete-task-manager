import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
                email,
                password,
            });
            router.push("/tasks"); // Redirect after successful signup
        } catch (err) {
            alert("Signup failed: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
