import React, { useState } from 'react';
export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginURL = 'https://localhost:7286/api/Auth/login';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { Username: username, Password: password };

        try {
            const response = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                onLogin(data.token);
            } else {
                alert("Login failed!");
            }
        } catch (err) {
            alert("Error: " + err);
        }
    };
    return (
        <div style={{ border: '1px solid #ccc', padding: '40px', width: '300px', margin: '50px auto', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px' }}>Lego Login</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text" placeholder="User"
                    value={username} onChange={e => setUsername(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />

                <input
                    type="password" placeholder="Pass"
                    value={password} onChange={e => setPassword(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />

                <button
                    type="submit"
                    style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#f5f5f5', border: '1px solid #ccc', borderRadius: '5px', fontWeight: 'bold' }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}