import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './Pages/Home';
import './style.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
}

export default App;