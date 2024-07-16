import RouteLayout from "./routes/RouteLayout"
import { BrowserRouter } from "react-router-dom"

// ! Configuration For Toaster 
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

function App() {

  return (
    <>
      <BrowserRouter>
        <RouteLayout />
      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
