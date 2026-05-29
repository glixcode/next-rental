import { createContext, useContext } from "react";

interface Context {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
}
export const TestContext = createContext<Context | undefined>( undefined );

export const useTestContext = () => {
    const state = useContext(TestContext);

    if(state === undefined) {
        throw new Error("useTestContext must be used within a TestContextProvider");
    }

    return state

}