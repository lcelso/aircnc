import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import sockeio from "socket.io-client";
import api from "../../services/api";

import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');

  const socket = useMemo(() => sockeio('http://your-ip:3333', {
    query: { user_id }
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', booking => {
      setRequests([...requests, booking])
    })
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id))
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id))
  }

  async function deleteSpot(spot_id) {
    setSpots(spots.filter(spot => spot._id !== spot_id));
    await api.delete(`/spots/${spot_id}`);
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
              <p><strong>{request.user.email}</strong> está solicitando 
              uma reserva em <strong> {request.spot.company}</strong> para a data: <strong>{request.date}</strong></p>
              <button className="accept" onClick={() => handleAccept(request._id)}>Aceitar</button>
              <button className="reject" onClick={() => handleReject(request._id)}>Rejeitar</button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ 
              backgroundImage: `url(${spot.thumbnail_url})`,
              backgroundPosition: 0
            }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}` : "Gratuito"}</span>

            <button
              className="btn"
              onChange={event => setSpots(spots)}
              onClick={() => deleteSpot(spot._id)}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
