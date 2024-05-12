import { useContext } from "react";
import { AuthSessionContext } from "./AuthSessionContext";

export const useAuthSession = () => useContext(AuthSessionContext);
