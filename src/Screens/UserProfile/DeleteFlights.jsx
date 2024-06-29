import React, { useState } from 'react';
import axios from 'axios';

const DeleteBookedFlight = ({ bookingId, onDelete }) => {
    const [error, setError] = useState('');

    const handleDeleteFlight = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        try {
            const response = await axios.delete(`https://server-1-z5y0.onrender.com/profile/bookedflights/${bookingId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                onDelete(bookingId);
                setError('');
            } else {
                setError('Failed to delete booked flight');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <button onClick={handleDeleteFlight}>Delete</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default DeleteBookedFlight;
