import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

export default function OrganizerHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <img src={logo} alt="Keiju Club" className="h-20 w-auto" />

      <button
        type="button"
        onClick={() => navigate("/organizer/profile")}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary shadow-sm"
        aria-label="Avaa organisaation profiili"
      >
        <Building2 size={21} />
      </button>
    </header>
  );
}
