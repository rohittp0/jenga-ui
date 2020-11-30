import getSessionData from 'api/getSessionData';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext, UserSessionData } from '.';

const AuthContext = createContext<AuthContext | Record<string, unknown>>({});

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserSessionData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUserSession = async (): Promise<void> => {
            try {
                const userDetails = await getSessionData();
                setUser(userDetails);
                if (userDetails.memberShipID) {
                    router.push('/exist');
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                router.replace('/');
            }
        };
        checkUserSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setSessionData = (sessionDetails: UserSessionData): void => {
        setUser(sessionDetails);
    };

    const removeSessionData = (): void => {
        setUser(null);
    };

    /**
     * Context value to access glabally from anywhere
     * Memo to optimize at best
     */
    const value = useMemo(
        () => ({
            number: user?.number,
            memberID: user?.memberShipID,
            setSessionData,
            removeSessionData,
            loading,
        }),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user?.memberShipID, user?.number]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContext | Record<string, unknown> => useContext(AuthContext);
