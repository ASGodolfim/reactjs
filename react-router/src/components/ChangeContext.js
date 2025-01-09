import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export const ChangeContext = () => {
    const { counter, setCounter } = useContext(CounterContext);

    return (
        <div>
            <button onClick={() => setCounter(counter + 1)}>Add to Counter</button>
        </div>
    );
};

export default ChangeContext;