import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
                { email, password }
            );

            localStorage.setItem("token", res.data.token);

            // ✅ Redirect to /tasks page
            router.push("/tasks");
        } catch (err) {
            const message = err.response?.data?.error || "Login failed";
            setError(message);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>Log In</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        background: "#fff"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#0070f3",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },
    error: {
        color: "red"
    }
};
