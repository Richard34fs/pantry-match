import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Refrigerator from './pages/Refrigerator';
import PrivateRoute from './components/PrivateRoute';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/refrigerator" 
          element={
            <PrivateRoute>
              <Refrigerator />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

