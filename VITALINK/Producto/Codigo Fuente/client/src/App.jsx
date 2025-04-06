import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Router from "./router/Router";

function App() {
  return (
    <div id="root">
      <NavBar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
