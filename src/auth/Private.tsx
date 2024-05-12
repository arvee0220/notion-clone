import { ReactElement } from "react";
import { useAuthSession } from "./UseContextForAuth";
import { Navigate } from "react-router-dom";

type PrivateProps = {
    component: ReactElement;
};

export const Private = ({ component }: PrivateProps) => {
    const { session, loading } = useAuthSession();

    if (loading) {
        <>Authenticating...</>;
    }

    return session ? component : <Navigate to="/auth" />;
};
