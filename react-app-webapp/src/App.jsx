import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { getUserData } from "./utils/auth";
import Login from './containers/LoginContainer'
import Register from './containers/RegisterContainer';
import Chat from './containers/ChatContainer';
import './app.css';

function App() {
  const userData = getUserData();

  const isAuthenticated = userData && userData.token;

  return (
    <>
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<Navigate to="/chat" />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  )
}

export default App
