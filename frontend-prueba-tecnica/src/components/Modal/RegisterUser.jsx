import React, { useState } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axiosInstance from '../../../api/axiosInstance';
import './RegisterUser.css'

Modal.setAppElement('#root');
const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  roleId: yup.number().required('Role is required').oneOf([1, 2, 3], 'Invalid role selected'),
});

const RegisterUser = ({ isOpen, onRequestClose, onUserRegistered }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      dateOfBirth: '',
      roleId: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance.post(`/Users`, values);
        onUserRegistered();
        onRequestClose();
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <h2>Register User</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
        </div>
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
        <button className='btn-add' type="submit">Register</button>
      </form>
    </Modal>
  );
};

export default RegisterUser;