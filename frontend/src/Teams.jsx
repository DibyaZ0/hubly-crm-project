import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamContext } from './Teamcontext';
import axios from 'axios';
import './Teams.css';

const API_BASE_URL = 'http://localhost:3000/api/user';

const Teams = () => {
  const { teamMembers, setTeamMembers, addMember, updateMember, deleteMember } = useContext(TeamContext);
  const [showForm, setShowForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: '',
    phone: '',
    email: '',
    designation: 'Member',
    avatar: '',
  });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const navigate = useNavigate();

  const handleAddMemberClick = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const newMember = {
      name: addFormData.name,
      phone: addFormData.phone,
      email: addFormData.email,
      designation: addFormData.designation,
      avatar: addFormData.avatar,
    };

    try {
      setShowForm(false);
      const response = await axios.post(API_BASE_URL, newMember);
      addMember(response.data.user)
      setShowForm(false);
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('Failed to add team member. Please try again.');
    }
  };

  const handleDeleteClick = (id) => {
    setMemberToDelete(id);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/delete', {
        action: 'delete',
        id: memberToDelete,
      });
  
      if (response.status === 200) {
        deleteMember(memberToDelete); // now update frontend state
        setShowConfirmPopup(false);
        setMemberToDelete(null);
      } else {
        alert('Failed to delete team member.');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member.');
    }
  };
  

  const handleCancelDelete = () => {
    setShowConfirmPopup(false);
    setMemberToDelete(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setAddFormData({ name: '', phone: '', email: '', designation: 'Member', avatar: '' });
  };

  const handleEditClick = (member) => {
    navigate('/settings', { state: { member } });
  };

  return (
    <div className="teams-container">
      <div className="teams-header">
        <h2>Team</h2>
      </div>

      <div className="teams-table-container">
        {showForm ? (
          <div className="form-container">
            <div className="form-header">
              <h2>Add Team members</h2>
              <h5>Talk with colleagues in a group chat. Messages are only visible to participants. New teammates may only be invited by administrators.</h5>
            </div>

            <input type="text" name="name" placeholder="Full Name" value={addFormData.name} onChange={handleFormChange} />
            <input type="text" name="phone" placeholder="Phone" value={addFormData.phone} onChange={handleFormChange} />
            <input type="email" name="email" placeholder="Email" value={addFormData.email} onChange={handleFormChange} />
            <select name="designation" value={addFormData.designation} onChange={handleFormChange}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <input type="text" name="avatar" placeholder="Avatar URL (Optional)" value={addFormData.avatar} onChange={handleFormChange} />

            <div className="form-buttons">
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          </div>
        ) : (
          <>
            <table className="teams-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(member => (
                  <tr key={member._id}>
                    <td className="member-info">
                      {<img src={member.avatar ? member.avatar : '/avatar.png'} alt="avatar" className="avatar" />}
                      {member.name}
                    </td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td>{member.designation}</td>
                    {member.designation != 'Admin' ?
                      (<td>
                        <button className="delete-btn" onClick={() => handleEditClick(member)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDeleteClick(member._id)}>🗑️</button>
                      </td>)
                    : (<td></td>)}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="add-member-button">
              <button onClick={handleAddMemberClick}>➕ Add Team members</button>
            </div>
          </>
        )}
      </div>

      {showConfirmPopup && (
        <div className="confirm-popup-overlay">
          <div className="confirm-popup">
            <p>This teammate will be deleted.</p>
            <div className="confirm-buttons">
              <button className="cancel-btn" onClick={handleCancelDelete}>Cancel</button>
              <button className="confirm-btn" onClick={handleConfirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
