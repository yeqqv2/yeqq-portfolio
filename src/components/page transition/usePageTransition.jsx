import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTransition() {
    const location = useLocation();
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        setTrigger(true);

        const timeout = setTimeout(() => setTrigger(false), 1500);
        return () => clearTimeout(timeout);
    }, [location.pathname]);

    return trigger;
}
