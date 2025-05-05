import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
        {/* Add more routes here as needed */}
      </Route>
    </Routes>
  );
}

export default App;