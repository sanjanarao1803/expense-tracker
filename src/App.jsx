import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Auth} from "./pages/auth/index.jsx";
import {ExpenseTracker} from "./pages/expense-tracker/index.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return(
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" exact element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App