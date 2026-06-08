import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderCompletePage } from "./pages/OrderCompletePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { UserPage } from "./pages/UserPage";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route 
               path="/"
               element={<HomePage />}
            />
            <Route
               path="/about"
               // element={<AboutPage />}
            />
            <Route
               path="/checkout"
               element={<CheckoutPage />}
            />
            <Route
               path="/success"
               element={<OrderCompletePage />}
            />
            <Route
               path="/login"
               element={<LoginPage />}
            />
            <Route
               path="/signup"
               element={<SignupPage />}
            />
            <Route
               path="/user"
               element={<UserPage />}
            />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
