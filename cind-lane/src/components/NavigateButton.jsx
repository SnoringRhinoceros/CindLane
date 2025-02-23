import { useNavigate } from "react-router-dom";

function NavigateButton({ to, text }) {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(to)} 
      className="px-10 py-6 bg-accent text-primary rounded transition-transform transform hover:scale-105"
    >
      {text}
    </button>
  );
}

export default NavigateButton;
