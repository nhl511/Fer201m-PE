import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Footer from "./components/Footer";
import YourPost from "./components/YourPost";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import Post from "./components/Post";
import About from "./components/About";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log(user);
  return (
    <div className="App">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Login />}
        ></Route>
        <Route
          path="/createpost"
          element={user ? <CreatePost user={user} /> : <Login />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
