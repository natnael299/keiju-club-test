import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";
import bg from "@/assets/bg.png";
import { login as loginRequest } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { type Language, useLanguageStore } from "@/store/languageStore";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { language, setLanguage } = useLanguageStore();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const languages: Language[] = ["fi", "sv", "en"];

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await loginRequest(email, password);

      login(response.token, response.user);

      if (response.user.role === "organizer") {
        navigate("/organizer/dashboard");
        return;
      }

      navigate("/app/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ??
            "Login failed. Please check your email and password.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8 font-sans">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/95 via-background/70 to-transparent" />

      <section className="relative w-full max-w-[360px] rounded-[24px] bg-card px-6 py-5 shadow-[0_12px_40px_rgba(23,53,43,0.18)]">
        <div className="mb-2 flex justify-center">
          <img src={logo} alt="Keiju Club" className="h-10 w-auto" />
        </div>

        <div className="mb-4 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            {t("login.welcome")}
          </h2>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              {t("login.email")}
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("login.emailPlaceholder")}
              autoComplete="email"
              required
              className="h-13 w-full rounded-[14px] border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              {t("login.password")}
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t("login.passwordPlaceholder")}
                autoComplete="current-password"
                required
                className="h-13 w-full rounded-[14px] border border-border bg-white px-4 pr-12 text-base font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword
                    ? t("login.hidePassword")
                    : t("login.showPassword")
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-13 w-full rounded-full bg-primary text-[15px] font-semibold text-primary-foreground shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : t("login.signIn")}
          </button>
        </form>

        <button
          type="button"
          className="mt-6 w-full text-center text-sm font-medium text-primary underline underline-offset-4"
        >
          {t("login.forgotPassword")}
        </button>

        <div className="mt-7 flex justify-center gap-4 text-sm font-medium text-muted-foreground">
          {languages.map((item, index) => (
            <span key={item} className="flex gap-4">
              <button
                type="button"
                onClick={() => setLanguage(item)}
                className={
                  item === language
                    ? "text-primary underline underline-offset-4"
                    : ""
                }
              >
                {t(`language.${item}`)}
              </button>

              {index < languages.length - 1 && <span>|</span>}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Login;
