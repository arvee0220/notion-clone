import { ReactElement } from "react";
import { useAuthSession } from "./UseContextForAuth";
import { Navigate } from "react-router-dom";

type PrivateProps = {
    component: ReactElement;
};

export const Private = ({ component }: PrivateProps) => {
    const { user, loading } = useAuthSession();

    if (loading) {
        <div>Authenticating...</div>;
    }

    return user ? component : <Navigate to="/auth" />;
};
