import React, { useState, useEffect } from 'react';

export default function LegoList({ token }) {
    const [legoSets, setLegoSets] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const legoURL = 'https://localhost:7286/api/Lego';

    const getAuthHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(legoURL, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                if (response.ok) {
                    const data = await response.json();
                    setLegoSets(data);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, [token]);

    const handleAdd = async () => {
        const newItem = {
            name: newName,
            price: Number(newPrice)
        };

        try {
            const response = await fetch(legoURL, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newItem)
            });

            console.log(response)

            if (response.ok) {
                const data = await response.json();
                setLegoSets([...legoSets, data]);
                setNewName('');
                setNewPrice('');
            }
        } catch (error) {
            console.error("Error adding item", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${legoURL}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                setLegoSets(legoSets.filter(set => set.id !== id));
            }
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    return (
        <div>
            <h3>My Collection</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <input
                    placeholder="Name"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    placeholder="Price"
                    type="number"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleAdd}
                    style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid black', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Add Set
                </button>
            </div>
            <ul>
                {legoSets.map(set => (
                    <li key={set.id}>
                        {set.name} - ${set.price}
                        <button onClick={() => handleDelete(set.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}