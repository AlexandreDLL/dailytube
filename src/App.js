import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Main, Footer } from './component';
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

// $(function () {
//   $('.dropdown').on('show.bs.dropdown', function (e) {
//     $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
//   });

//   // ADD SLIDEUP ANIMATION TO DROPDOWN //
//   $('.dropdown').on('hide.bs.dropdown', function (e) {
//     e.preventDefault();
//     $(this).find('.dropdown-menu').first().stop(true, true).slideUp(400, function () {
//       $('.dropdown').removeClass('show');
//       $('.dropdown-menu').removeClass('show');
//       $('.dropdown').find('.dropdown-toggle').attr('aria-expanded', 'false');
//     });
//   });
// });