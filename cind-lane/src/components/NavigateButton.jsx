import { useNavigate } from "react-router-dom";

function NavigateButton({ to, text }) {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(to)} 
      className="px-10 py-6 bg-accent text-primary rounded transition-transform transform hover:scale-110 hover:ring-2 ring-accent"
    >
      {text}
    </button>
  );
}

export default NavigateButton;
