import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Main, Footer } from './component/index.js';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Header />
        </header>
        <main style={{marginTop: 80}}>
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
