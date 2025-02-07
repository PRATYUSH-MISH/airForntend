import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddPassengers.css';
import axios from 'axios';

const AddPassengers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, bookingId, bookingData } = location.state || {};
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState(''); // Add state for email

  const [gender, setGender] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !gender || !email) {
      setError('All fields are required.');
      return;
    }
    const passengerData = { name, age, gender, bookingId, email };

    try {
      const response = await axios.post('https://server-1-z5y0.onrender.com/passengers/add', passengerData);
      setPassengers([...passengers, passengerData]);
      setMessage(response.data.message);
      setError('');
      setName('');
      setAge('');
      setGender('');
      setEmail('');
    } catch (error) {
      setError('Error adding passenger: ' + error.message);
      setMessage('');
    }
  };





  const handlePayment = () => {
    navigate('/payment', {
      state: {
        bookingId,
        passengers,
        totalFare,
        flight: {
          flight_no: flight.flight_no,
          airline: flight.airline,
          depart_time: flight.depart_time,
          arrival_time: flight.arrival_time,
          departDate: bookingData.departDate,
          fare: flight[`${bookingData.seat}_fare`]
        },
        origin: bookingData.originAirport,         // Include origin here
        destination: bookingData.destinationAirport
      }
    });
  };

  const totalFare = passengers.length * flight[`${bookingData.seat}_fare`];

  return (
    <>

      <div className="add-passenger">
        <h2>Add Passenger</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <div>
          <h3>Flight Details</h3>
          <p><strong>Flight No:</strong> {flight.flight_no}</p>
          <p><strong>Airline:</strong> {flight.airline}</p>
          <p><strong>Origin:</strong> {bookingData.originAirport.city} ({bookingData.originAirport.code})</p>
          <p><strong>Departure Time:</strong> {flight.depart_time}</p>
          <p><strong>Destination:</strong> {bookingData.destinationAirport.city} ({bookingData.destinationAirport.code})</p>
          <p><strong>Arrival Time:</strong> {flight.arrival_time}</p>
          <p><strong>Duration:</strong> {flight.duration} Hours</p>
          <p><strong>Fare:</strong> {flight[`${bookingData.seat}_fare`]}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Email: (Registered Email Only)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Passenger</button>
        </form>
        <div className="passenger-list">
          <h3>Added Passengers</h3>
          <ul>
            {passengers.map((p, index) => (
              <li key={index}>
                {p.name}, {p.age} years old, {p.gender}, {p.email}
              </li>
            ))}
          </ul>
          <p>Total Passengers: {passengers.length}</p>
          <p>Total Fare: {totalFare}</p>
          {passengers.length > 0 && (
            <button className="proceed-button" onClick={handlePayment}>Proceed to Payment</button>
          )}
        </div>
      </div></>
  );
};

export default AddPassengers;