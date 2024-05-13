import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
} from "firebase/firestore";
import { Page } from "../utils/types";
import styles from "../utils.module.css";
import { Loader } from "../components/Loader";
import startPageScaffold from "./startPageScaffold.json";

type InjectedProps = {
    initialState: Page;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(
    WrappedComponent: React.ComponentType<
        PropsWithoutInjected<TProps> & InjectedProps
    >
) {
    return (props: PropsWithoutInjected<TProps>) => {
        const match = useMatch("/:slug");
        const pageSlug = match ? match.params.slug : "start";
        const [initialState, setInitialState] = useState<Page | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<Error | undefined>();

        useEffect(() => {
            const auth = getAuth();
            const db = getFirestore();
            setIsLoading(true);

            const fetchInitialState = async (uid: string) => {
                try {
                    const pagesRef = collection(db, "pages");
                    const q = query(
                        pagesRef,
                        where("slug", "==", pageSlug),
                        where("created_by", "==", uid)
                    );
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty && pageSlug === "start") {
                        const startPageRef = doc(collection(db, "pages"));
                        await setDoc(startPageRef, {
                            ...startPageScaffold,
                            slug: "start",
                            created_by: uid,
                        });
                        setInitialState({
                            ...startPageScaffold,
                            slug: "start",
                        });
                    } else {
                        querySnapshot.forEach((doc) => {
                            setInitialState({
                                ...doc.data(),
                                id: doc.id,
                            } as Page);
                        });
                    }
                } catch (e) {
                    setError(e as Error);
                }
                setIsLoading(false);
            };

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    fetchInitialState(user.uid);
                } else {
                    setError(new Error("User is not logged in"));
                    setIsLoading(false);
                }
            });
        }, [pageSlug]);

        if (isLoading) {
            return (
                <div className={styles.centeredFlex}>
                    <Loader />
                </div>
            );
        }

        if (error) {
            return <div>{error.message}</div>;
        }

        if (!initialState) {
            return <div className={styles.centeredFlex}>Page not found</div>;
        }

        return <WrappedComponent {...props} initialState={initialState} />;
    };
}
