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
    <header className="mb-8 overflow-hidden rounded-[28px] border border-primary/5 bg-gradient-to-r from-[#f5faf4] via-[#eef7ec] to-[#e6f2e3] shadow-[0_8px_30px_rgba(41,78,60,0.06)]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-7">
        <img
          src={logo}
          alt="Keiju"
          className="h-12 w-auto object-contain sm:h-14"
        />

        <button
          type="button"
          onClick={() => navigate("/app/profile")}
          aria-label={t("header.openProfile")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-primary/10 text-sm font-extrabold text-primary transition hover:bg-primary/15 active:scale-95"
        >
          {getInitials(selectedOwner?.fullName)}
        </button>
      </div>
    </header>
  );
}
