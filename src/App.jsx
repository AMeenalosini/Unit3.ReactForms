import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";
import "./App.css";


export default function App() {

  const [token, setToken] = useState(null);

  return (
    <>
           <SignUpForm setToken={setToken} /> 
           <Authenticate token={token} />
    </>
  );
}
