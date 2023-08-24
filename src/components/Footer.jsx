import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer>
      <div>
        <button className="return-home" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </footer>
  );
}
