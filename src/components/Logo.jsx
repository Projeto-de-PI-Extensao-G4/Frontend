import "../styles/Logo.css";
import logo from "../assets/logo.png";

export default function Logo() {
  return (
    <div className="logo-box">
      <img src={logo} alt="Logo" />
    </div>
  );
}