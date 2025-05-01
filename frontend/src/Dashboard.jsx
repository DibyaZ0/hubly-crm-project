import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api/tickets";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [tickets, setTicket] = useState([
    {
      id: '',
      ticketNo: '',
      status: '',
      postedAt: undefined,
      chats: [
        {
          message: '',
          sentAt: '',
          sender: {
            name: '',
            phone: '',
            email: '',
            avatar: '',
          }
        }
      ]
    },
  ]);

  useEffect(() => {
    axios.get(API_BASE_URL)
      .then((res) => setTicket(res.data.tickets))
      .catch((err) => console.error('Failed to load user data:', err));
  }, []);

  const handleOpenTicket = () => {
    navigate('/contactcenter');
  };

  const calculateHoursAgo = (postedAt) => {
    const now = new Date();
    const diffMs = now - new Date(postedAt);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours;
  };

  const filterTickets = () => {
    return tickets
      .filter(ticket => {
        if (activeTab !== 'All') {
          return ticket.status === activeTab;
        }
        return true;
      })
      .filter(ticket => {
        const query = searchQuery.toLowerCase();
        return (
          ticket.ticketNo.toLowerCase().includes(query) ||
          ticket.chats[0]?.message.toLowerCase().includes(query) ||
          ticket.chats[0]?.sender.name.toLowerCase().includes(query)
        );
      });
  };

  return (
    <div className="dashboard-main">
      <div className="search-bar-container">
        <input type="text" placeholder="🔍 Search for ticket" className="search-bar" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'All' ? 'Active' : ''}
          onClick={() => setActiveTab('All')}
        >
          All Tickets
        </button>
        <button
          className={activeTab === 'Resolved' ? 'Active' : ''}
          onClick={() => setActiveTab('Resolved')}
        >
          Resolved
        </button>
        <button
          className={activeTab === 'Unresolved' ? 'Active' : ''}
          onClick={() => setActiveTab('Unresolved')}
        >
          Unresolved
        </button>
      </div>

      <div className="ticket-list">
        {activeTab &&
          filterTickets().map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <div>
                  <span className="ticket-id">
                    {ticket.status === 'Unresolved' ? '🟡' : '🟢'} Ticket# {ticket.ticketNo}
                  </span>
                  <p className="ticket-message">{ticket.chats[0].message}</p>
                </div>
                <div className="ticket-time">
                  <p>Posted at {ticket.postedAt}</p>
                  <h2>{ticket.chats[0].sentAt}</h2>
                </div>
              </div>

              <div className="ticket-footer">
                <div className="sender-info">
                  <img src={ticket.chats[0].sender.avatar} alt="avatar" />
                  <div>
                    <p className="sender-name">{ticket.chats[0].sender.name}</p>
                    <p className="sender-phone">{ticket.chats[0].sender.phone}</p>
                    <p className="sender-email">{ticket.chats[0].sender.email}</p>
                  </div>
                </div>
                <div className="open-ticket-link">
                  <button onClick={handleOpenTicket}>Open Ticket</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
