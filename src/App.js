import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path='/login'
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path='/projects'
          element={
            <>
              <Projects />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
