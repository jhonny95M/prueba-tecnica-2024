
import React, { useEffect, useState } from 'react';
import RegisterUser from '../Modal/RegisterUser';
import UpdateUser from '../Modal/UpdateUser';
import ConfirmDeactivateModal from '../Modal/ConfirmDeactivateModal';
import axiosInstance from '../../../api/axiosInstance';
import './Users.css'
export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    username: '',
    email: '',
    dateOfBirth: '',
    isActive: '',
    roleName: '',
  });
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/Users');
        setUsers(response.data);
        setFilteredUsers(response.data);
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
    const applyFilters = () => {
      let filtered = users.filter(user => {
        return (
          (filters.username ? user.username.toLowerCase().includes(filters.username.toLowerCase()) : true) &&
          (filters.email ? user.email.toLowerCase().includes(filters.email.toLowerCase()) : true) &&
          (filters.dateOfBirth ? user.dateOfBirth.includes(filters.dateOfBirth) : true) &&
          (filters.isActive ? (user.isActive.toString() === filters.isActive) : true) &&
          (filters.roleName ? user.roleName.toLowerCase().includes(filters.roleName.toLowerCase()) : true)
        );
      });
      setFilteredUsers(filtered);
    };
    if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
return (
    <>
    <h1>User List</h1>    
    <button className='btn-list-add' onClick={() => setIsModalOpen(true)}>New User</button>
    <div className="filters">
        <input
          type="text"
          placeholder="Username"
          value={filters.username}
          onChange={(e) => setFilters({ ...filters, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={filters.dateOfBirth}
          onChange={(e) => setFilters({ ...filters, dateOfBirth: e.target.value })}
        />
        <select
          value={filters.isActive}
          onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
        >
          <option value="">Select Active Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <input
          type="text"
          placeholder="Role Name"
          value={filters.roleName}
          onChange={(e) => setFilters({ ...filters, roleName: e.target.value })}
        />
        <button onClick={applyFilters}>Apply Filters</button>
        </div>
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
    filteredUsers.map(item=>(
        <tr key={item.id}>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.dateOfBirth}</td>
        <td>{item.roleName}</td>
        <td>{item.isActive?'Activo':'Inactivo'}</td>
        <td><button className='btn-list-update' onClick={() => {
              setSelectedUserId(item.id);
              setIsUpdateModalOpen(true);
            }}>Update</button>
             <button className='btn-list-delete' onClick={() => {
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