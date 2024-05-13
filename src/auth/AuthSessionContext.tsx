import { auth } from "../firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useState, useEffect } from "react";

type AuthSessionContextValue = {
    user: User | null;
    loading: boolean;
};

export const AuthSessionContext = createContext<AuthSessionContextValue>(
    {} as AuthSessionContextValue
);

type AuthSessionProviderProps = {
    children: ReactNode;
};

export const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthSessionContext.Provider value={{ user, loading }}>
            {children}
        </AuthSessionContext.Provider>
    );
};
