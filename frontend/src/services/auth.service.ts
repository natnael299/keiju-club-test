import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: "caretaker" | "organizationRep";
    fullName: string;
    ownerIds?: string[];
    organizationId?: string;
  };
};

export const login = async (email: string, password: string) => {
  const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
    email,
    password,
  });

  return data;
};
