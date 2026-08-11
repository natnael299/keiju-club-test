import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "@/assets/logo.png";
import { useOwnerStore } from "@/store/owner.store";

function getInitials(name?: string) {
  if (!name) return "?";

  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const selectedOwner = useOwnerStore((state) => state.getSelectedOwner());

  return (
    <header className="flex items-center justify-between">
      <img src={logo} alt="Keiju Club" className="h-10 w-auto" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/app/profile")}
          aria-label={t("header.openProfile")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-primary shadow-sm"
        >
          {getInitials(selectedOwner?.fullName)}
        </button>
      </div>
    </header>
  );
}
