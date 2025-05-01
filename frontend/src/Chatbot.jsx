import React, { useState, useEffect } from 'react';
import { fetchChatMessages, sendMessageToBot } from './chatbotApi';
import './Chatbot.css';

const colorOptions = ['#33475B', '#000000', '#FFFFFF'];
const bgColorOptions = ['#EEEEEE', '#000000', '#FFFFFF'];

const Chatbot = () => {
  const [headerColor, setHeaderColor] = useState('#33475B');
  const [backgroundColor, setBackgroundColor] = useState('#EEEEEE');
  const [customMessages, setCustomMessages] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [userIntro, setUserIntro] = useState({ name: '', phone: '', email: '' });
  const [showIntroForm, setShowIntroForm] = useState(false);
  const [missedTimer, setMissedTimer] = useState(10);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchChatMessages();
      setCustomMessages(data.customMessages);
      setWelcomeMessage(data.welcomeMessage);
      setChat(data.customMessages.map(msg => ({ sender: 'bot', text: msg })));
    };
    loadMessages();
  }, []);

  const handleSendMessage = async (text) => {
    setChat(prev => [...prev, { sender: 'user', text }]);
    const botReply = await sendMessageToBot(text);
    setTimeout(() => {
      setChat(prev => [...prev, { sender: 'bot', text: botReply }]);
      setShowIntroForm(true);
    }, 500);
  };

  const handleIntroSubmit = (e) => {
    e.preventDefault();
    setShowIntroForm(false);
  };

  const handleTimerChange = (e) => {
    setMissedTimer(Number(e.target.value));
  };

  return (
    <div className="chatbot-page">
      
      <div className="chatbot-title">Chat Bot</div>

      <div className="chatbot-container">

        {/* Chat Window */}
        <div className="chat-window" style={{ backgroundColor }}>
          <div className="chat-header" style={{ backgroundColor: headerColor }}>
            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712038.png" alt="Bot" className="bot-avatar" />
            <span>Hubly</span>
          </div>

          <div className="chat-body">
            {chat.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {showIntroForm && (
              <form className="intro-form" onSubmit={handleIntroSubmit}>
                <h4>Introduce Yourself</h4>
                <input type="text" placeholder="Your name" value={userIntro.name} onChange={e => setUserIntro({ ...userIntro, name: e.target.value })} required />
                <input type="text" placeholder="Your phone" value={userIntro.phone} onChange={e => setUserIntro({ ...userIntro, phone: e.target.value })} required />
                <input type="email" placeholder="Your email" value={userIntro.email} onChange={e => setUserIntro({ ...userIntro, email: e.target.value })} required />
                <button type="submit">Thank You!</button>
              </form>
            )}
          </div>

          {!showIntroForm && (
            <div className="chat-input">
              <input type="text" placeholder="Write a message" onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(e.target.value);
                  e.target.value = '';
                }
              }} />
            </div>
          )}
        </div>

        <div className="random">
        <img className="introduction"  src="./src/images/initial message.png"  />
        </div>

        <div className="settings-panel">
          <div className="setting">
            <h4>Header Color</h4>
            <div className="color-options">
              {colorOptions.map((color, idx) => (
                <div key={idx}
                  className="color-box"
                  style={{ backgroundColor: color }}
                  onClick={() => setHeaderColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="setting">
            <h4>Custom Background Color</h4>
            <div className="color-options">
              {bgColorOptions.map((color, idx) => (
                <div key={idx}
                  className="color-box"
                  style={{ backgroundColor: color }}
                  onClick={() => setBackgroundColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="setting">
            <h4>Customize Message</h4>
            {customMessages.map((msg, idx) => (
              <input key={idx} value={msg} onChange={(e) => {
                const updated = [...customMessages];
                updated[idx] = e.target.value;
                setCustomMessages(updated);
              }} />
            ))}
          </div>

          <div className="setting">
            <h4>Welcome Message</h4>
            <textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} />
          </div>

          <div className="setting">
            <h4>Introduction form</h4>
            <form >
                <input type="text" placeholder="Your name"  disabled />
                <input type="text" placeholder="(+1)00 000 000"  disabled />
                <input type="email" placeholder="example@gmail.com"  disabled />
                <button type="submit">Thank You!</button>
              </form>
          </div>

          <div className="setting">
            <h4>Missed Chat Timer </h4>
            <div className="timer-container">
            <select value={Math.floor(missedTimer / 3600)} onChange={(e) => setMissedTimer((prev) => (parseInt(e.target.value) * 3600) + (prev % 3600))}>
            {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
             ))}
            </select>
            <span>:</span>
            <select value={Math.floor((missedTimer % 3600) / 60)} onChange={(e) => setMissedTimer((prev) => (Math.floor(prev / 3600) * 3600) + (parseInt(e.target.value) * 60) + (prev % 60))}>
            {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
            ))}
            </select>
            <span>:</span>
            <select value={missedTimer % 60} onChange={(e) => setMissedTimer((prev) => (Math.floor(prev / 60) * 60) + parseInt(e.target.value))}>
            {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
            ))}
            </select>
            </div>
            <button className="save-button" onClick={() => alert(`Timer set to ${Math.floor(missedTimer/3600)}h:${Math.floor((missedTimer%3600)/60)}m:${missedTimer%60}s`)}>
            Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
