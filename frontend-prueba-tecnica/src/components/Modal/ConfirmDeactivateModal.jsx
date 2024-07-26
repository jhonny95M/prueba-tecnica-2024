import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './ConfirmDeactivateModal.css';

Modal.setAppElement('#root');

const ConfirmDeactivateModal = ({ isOpen, onRequestClose, userId, onUserDeactivated }) => {
  const handleDeactivate = async () => {
    try {
      await axios.delete(`http://localhost:7163/api/Users/${userId}`);
      onUserDeactivated();
      onRequestClose();
    } catch (err) {
      console.error('Error deactivating user:', err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      contentLabel="Confirm Deactivation"
    >
      <h2>Confirm Deactivation</h2>
      <p>Are you sure you want to deactivate this user?</p>
      <button onClick={handleDeactivate}>Yes, Deactivate</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default ConfirmDeactivateModal;