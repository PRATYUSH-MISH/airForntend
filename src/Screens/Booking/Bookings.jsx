import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Bookings.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://server-1-z5y0.onrender.com/book/bookings');
                setBookings(response.data);
                console.log('Fetched bookings data:', response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleBookingClick = (booking) => {
        const modifiedBooking = {
            ...booking,
            originAirport: flipped && booking.tripType !== '1' ? booking.destinationAirport : booking.originAirport,
            destinationAirport: flipped && booking.tripType !== '1' ? booking.originAirport : booking.destinationAirport,
            departDate: flipped && booking.tripType !== '1' ? booking.returnDate : booking.departDate,
            returnDate: flipped && booking.tripType !== '1' ? booking.departDate : booking.returnDate
        };
        navigate('/flight', { state: { bookingData: modifiedBooking } });
    };

    const handleFlip = () => {
        setFlipped(!flipped);
    };

   

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div>Error fetching bookings: {error}</div>;
    }

    if (bookings.length === 0) {
        return <div>No bookings available</div>;
    }

    const currentBooking = bookings[currentBookingIndex];

    return (
        <>
            <div className="bookings">
                <h1>My Bookings</h1>
                {bookings.some(booking => booking.tripType !== '1') && (
                    <button className="flip-button" onClick={handleFlip}>
                        Flip Origin and Destination
                    </button>
                )}

                <div className="booking-details">
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Trip Type</th>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Departure Date</th>
                                <th>Return Date</th>
                                <th>Seat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{currentBooking.tripType === '1' ? 'One-way' : 'Round Trip'}</td>
                                <td>{flipped && currentBooking.tripType !== '1' ? `${currentBooking.destinationAirport.city} (${currentBooking.destinationAirport.code})` : `${currentBooking.originAirport.city} (${currentBooking.originAirport.code})`}</td>
                                <td>{flipped && currentBooking.tripType !== '1' ? `${currentBooking.originAirport.city} (${currentBooking.originAirport.code})` : `${currentBooking.destinationAirport.city} (${currentBooking.destinationAirport.code})`}</td>
                                <td>{flipped && currentBooking.tripType !== '1' ? currentBooking.returnDate : currentBooking.departDate}</td>
                                <td>{flipped && currentBooking.tripType !== '1' ? currentBooking.departDate : currentBooking.returnDate || 'N/A'}</td>
                                <td>{currentBooking.seat}</td>
                                <td>
                                    <button onClick={() => handleBookingClick(currentBooking)}>View Flight</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div className="navigation-buttons">
                    <button onClick={handlePreviousBooking} disabled={bookings.length <= 1}>Previous</button>
                    <button onClick={handleNextBooking} disabled={bookings.length <= 1}>Next</button>
                </div> */}
            </div>
        </>
    );
};

export default Bookings;
