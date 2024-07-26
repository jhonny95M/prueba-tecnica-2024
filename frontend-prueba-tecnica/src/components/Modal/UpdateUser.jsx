import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './UpdateUser.css';

Modal.setAppElement('#root');

const validationSchema = yup.object({
  password: yup.string().min(4, 'Password must be at least 4 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  roleId: yup.number().required('Role is required').oneOf([1, 2, 3], 'Invalid role selected'),
  isActive: yup.boolean().required('Active status is required'),
});
const UpdateUser = ({ isOpen, onRequestClose, userId, onUserUpdated }) => {
  const [initialValues, setInitialValues] = useState({
    id: '',
    password: '',
    email: '',
    dateOfBirth: '',
    roleId: 1,
    isActive: true,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Users/${userId}`);
        setInitialValues({
          id: response.data.id,
          password: '',
          email: response.data.email,
          dateOfBirth: response.data.dateOfBirth.split('T')[0], // Format date for input
          roleId: response.data.roleId,
          isActive: response.data.isActive,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/Users/${userId}`, values);
        onUserUpdated();
        onRequestClose();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <h2>Update User</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <div className="error">{formik.errors.dateOfBirth}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="roleId">Role</label>
          <select
            id="roleId"
            name="roleId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.roleId}
          >
            <option value={1}>User</option>
            <option value={2}>Admin</option>
            <option value={3}>Superadmin</option>
          </select>
          {formik.touched.roleId && formik.errors.roleId ? <div className="error">{formik.errors.roleId}</div> : null}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formik.values.isActive}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            Active
          </label>
          {formik.touched.isActive && formik.errors.isActive ? <div className="error">{formik.errors.isActive}</div> : null}
        </div>
        <button type="submit">Update</button>
      </form>
    </Modal>
  );
};

export default UpdateUser;