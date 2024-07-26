
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterUser from '../Modal/RegisterUser';
import UpdateUser from '../Modal/UpdateUser';
import ConfirmDeactivateModal from '../Modal/ConfirmDeactivateModal';
export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7163/api/Users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    const handleUserRegistered = () => {
      fetchUsers();
    };
    const handleUserUpdated = () => {
      fetchUsers();
    };
    const handleUserDeactivated = () => {
      fetchUsers();
    };
    if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
return (
    <>
    <h1>User List</h1>
    <button onClick={() => setIsModalOpen(true)}>New User</button>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">User</th>
      <th scope="col">Email</th>
      <th scope="col">Birth Day</th>
      <th scope="col">Role</th>
      <th scope="col">Active</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
    users.map(item=>(
        <tr key={item.id}>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.dateOfBirth}</td>
        <td>{item.roleName}</td>
        <td>{item.isActive?'Activo':'Inactivo'}</td>
        <td><button onClick={() => {
              setSelectedUserId(item.id);
              setIsUpdateModalOpen(true);
            }}>Update</button>
             <button onClick={() => {
              setSelectedUserId(item.id);
              setIsDeactivateModalOpen(true);
            }}>Deactivate</button>
          </td>
    </tr>
    ))
}   
  </tbody>
</table>
<RegisterUser
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onUserRegistered={handleUserRegistered}
      />
      <UpdateUser
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        userId={selectedUserId}
        onUserUpdated={handleUserUpdated}
      />
      <ConfirmDeactivateModal
        isOpen={isDeactivateModalOpen}
        onRequestClose={() => setIsDeactivateModalOpen(false)}
        userId={selectedUserId}
        onUserDeactivated={handleUserDeactivated}
      />
</>
)

}