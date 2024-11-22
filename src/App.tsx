import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/authContext";
import httpClient from "./axios";

function AppContent() {
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <Header />
      <div className="flex-grow-1 min-vh-100">
        <AppRoutes />
      </div>
      <div className="align-self-end w-100">
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const warmUpServer = async () => {
    try {
      await httpClient.get(`/health`);
      console.log("Server warmed up");
    } catch (error) {
      console.error("Failed to warm up server:", error);
    }
  };

  warmUpServer();

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
