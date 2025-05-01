// TeamContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './Config';



export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios.get(API_BASE_URL +'/api/user')
      .then((res) => setTeamMembers(res.data))
      .catch((err) => console.error('Failed to load user data:', err));
  }, []);

  const addMember = (newMember) => {
    setTeamMembers((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) : 0;
      const memberWithId = { 
        ...newMember, 
        id: maxId + 1,
        avatar: newMember.avatar?.trim() || '/avatar.png' 
      };
      return [...prev, memberWithId];
    });
  };

  const updateMember = (updatedMember) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) =>
        member._id === updatedMember._id ? updatedMember : member
      )
    );
  };

  const deleteMember = (id) => {
    setTeamMembers((prev) => prev.filter((member) => member._id !== id));
  };

  return (
    <TeamContext.Provider value={{ teamMembers, setTeamMembers, addMember, updateMember, deleteMember }}>
      {children}
    </TeamContext.Provider>
  );
};