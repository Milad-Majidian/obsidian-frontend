
import { useState } from "react";

export function useAuthMode(initial: "login" | "register" = "login") {
    const [mode, setMode] = useState<"login" | "register">(initial);
    const toggleMode = () => {
        setMode((prev) => (prev === "login" ? "register" : "login"));
    }
    return { mode, setMode, toggleMode };
}