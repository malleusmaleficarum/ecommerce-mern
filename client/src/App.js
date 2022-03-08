import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import { Routes, Route, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Register2 from "./pages/Register2";
import Contact from "./pages/Contact";
import Journals from "./pages/Journals";
import JournalDetail from "./pages/JournalDetail";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/products" element={<ProductList />}>
        <Route path=":category" element={<ProductList />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/journals" element={<Journals />} />
      <Route path="/journal/:id" element={<JournalDetail />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register2 />}
      />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
