import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'
import PrivateRoute from './PrivateRoute';
import './App.css'

import UserList from './components/Users/UsersList'
import Layout from './Layout';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element=
          {
            <PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="users" element={<UserList />} />
          <Route path="" element={<Welcome />
          }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
