import React, { useState, useContext, useEffect } from 'react';
import { TeamContext } from './Teamcontext';
import { Link } from 'react-router-dom';
import './Contactcenter.css';

const ticketStatusOptions = ['Resolved', 'Unresolved'];

const Contactcenter = () => {
  const { teamMembers } = useContext(TeamContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [newTeammate, setNewTeammate] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [chatClosed, setChatClosed] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (teamMembers.length > 0) {
      handleChatClick(teamMembers[0]);
    }
  }, [teamMembers]);

  const handleChatClick = (member) => {
    setSelectedChat({
      id: member.id,
      name: member.name,
      avatar: member.avatar, // Include avatar
      messages: [
        { sender: member.name, text: 'Start chatting...' }
      ],
      user: {
        name: member.name,
        phone: member.phone,
        email: member.email,
        teammate: member.name,
      },
      status: 'Unresolved'
    });
    setChatClosed(false);
    setMessageInput('');
  };

  const handleTeammateChange = (e) => {
    const selectedTeammate = e.target.value;
    setNewTeammate(selectedTeammate);
    setPopupType('teammate');
    setShowPopup(true);
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setNewStatus(selectedStatus);
    setPopupType('status');
    setShowPopup(true);
  };

  const confirmPopupAction = () => {
    if (popupType === 'teammate') {
      setSelectedChat((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          teammate: newTeammate
        }
      }));
    } else if (popupType === 'status') {
      if (newStatus === 'Resolved') {
        setChatClosed(true);
      } else {
        setChatClosed(false);
      }
      setSelectedChat((prev) => ({
        ...prev,
        status: newStatus
      }));
    }
    setShowPopup(false);
    setNewTeammate('');
    setNewStatus('');
    setPopupType('');
  };

  const cancelPopupAction = () => {
    setShowPopup(false);
    setNewTeammate('');
    setNewStatus('');
    setPopupType('');
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    if (!selectedChat) return;

    const newMessage = { sender: 'You', text: messageInput };

    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    setMessageInput('');
  };

  return (
    <div className="contactcenter-container">
      {/* Chats List */}
      <div className="chat-list">
        <h2 className="contactcenter-title">Contact Center</h2>
        <h3>Chats</h3>
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className={`chat-item ${selectedChat?.id === member.id ? 'active' : ''}`}
            onClick={() => handleChatClick(member)}
          >
            <div>{member.name}</div>
            <small>{member.email}</small>
          </div>
        ))}
      </div>

      {/* Chat Content */}
      <div className="chat-content">
        {selectedChat ? (
          chatClosed ? (
            <div className="chat-closed-message">
              <h2>The chat has been resolved.</h2>
            </div>
          ) : (
            <>
              <h4>Ticket# 2025-00{selectedChat.id}</h4>
              <div className="messages">
                {selectedChat.messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                    <strong>{msg.sender}:</strong>
                    <p>{msg.text}</p>
                  </div>
                ))}

                {/* Show chatbot link only after user sends at least one message */}
                {selectedChat.messages.length > 1 && selectedChat.status === 'Unresolved' && (
                  <div className="message chatbot-link">
                    <p>If you want to continue the conversation, <Link to="/chatbot">click here to go to the chatbot</Link>.</p>
                  </div>
                )}
              </div>

              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type here"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button className="chart-send-btn" onClick={handleSendMessage}>{'>'}</button>
              </div>
            </>
          )
        ) : (
          <p>Select a chat to view conversation</p>
        )}
      </div>

      {/* Details Section */}
      <div className="details-section">
        {selectedChat ? (
          <div className="dropdown-container">
            {/* Avatar and Chat Heading */}
            <div className="chat-info">
              <img src={selectedChat.avatar} alt="avatar" className="avatar-image" />
            </div>

            <h4>Details</h4>
            <input type="text" value={selectedChat.user.name} readOnly />
            <input type="text" value={selectedChat.user.phone} readOnly />
            <input type="email" value={selectedChat.user.email} readOnly />

            <h4>Teammates</h4>
            <select value={selectedChat.user.teammate} onChange={handleTeammateChange}>
              {teamMembers.map((team, index) => (
                <option key={index} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>

            {showPopup && popupType === 'teammate' && (
              <div className="small-popup">
                <p>Chat would be assigned to a different team member</p>
                <div className="popup-buttons">
                  <button className="choose-cancel-btn" onClick={cancelPopupAction}>Cancel</button>
                  <button className="choose-confirm-btn" onClick={confirmPopupAction}>Confirm</button>
                </div>
              </div>
            )}

            <h4>Ticket Status</h4>
            <select value={selectedChat.status} onChange={handleStatusChange}>
              {ticketStatusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {showPopup && popupType === 'status' && (
              <div className="small-popup">
                <p>Chat will be closed</p>
                <div className="popup-buttons">
                  <button className="ticket-cancel-btn1" onClick={cancelPopupAction}>Cancel</button>
                  <button className="ticket-confirm-btn1" onClick={confirmPopupAction}>Confirm</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Click on a chat to see details</p>
        )}
      </div>
    </div>
  );
};

export default Contactcenter;
