import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([
    {
      data: undefined,
      pieData: undefined,
      averageReplyTime: '3',
      totalChats: '122'
    }
  ]);

  useEffect(() => {
    setAnalyticsData(
      {
        data: [
          { week: 'Week 1', chats: 14 },
          { week: 'Week 2', chats: 8 },
          { week: 'Week 3', chats: 14 },
          { week: 'Week 4', chats: 8 },
          { week: 'Week 5', chats: 6 },
          { week: 'Week 6', chats: 13 },
          { week: 'Week 7', chats: 3 },
          { week: 'Week 8', chats: 9 },
          { week: 'Week 9', chats: 16 },
          { week: 'Week 10', chats: 18 },
        ],
        pieData: 80,
        averageReplyTime: '3',
        totalChats: '122'
      }
    );
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>

      
      <div className="missed-chats">
        <h3>Missed Chats</h3>
        <ResponsiveContainer width="98%" height={300}>
          <LineChart data={analyticsData.data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="chats" stroke="#00cc00" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
      <div className="average-reply">
        <h3>Average Reply Time</h3>
        <div className="reply-info">
          <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses help earn customers' trust and make more sales.</p>
          <span className="time">{analyticsData.averageReplyTime} secs</span>
        </div>
      </div>

      
      <div className="resolved-tickets">
        <h3>Resolved Tickets</h3>
        <div className="ticket-info">
          <p>A callback system on a website, as well as proactive invitations, helps to attract even more customers. A small animation helps to motivate more customers to make calls.</p>
          <div>
            <div class="progress-ring">
              <svg class="progress-circle" width="100" height="100">
                <circle class="background" cx="50" cy="50" r="40" />
                <circle class="progress" cx="50" cy="50" r="40" />
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central">{analyticsData.pieData}%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      
      <div className="total-chats">
        <h3>Total Chats</h3>
        <div className="chat-info">
          <p>This metric shows the total number of chats for all channels for the selected period.</p>
          <span className="total-number">{analyticsData.totalChats} Chats</span> 
        </div>
      </div>
    </div>
  );
};

export default Analytics;
