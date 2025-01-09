import './About.css';
import { ChangeContext } from '../components/ChangeContext';
import { useCounterContext } from '../hooks/useCounterContext';
import { useTitleColorContext } from '../hooks/useTitleColorContext';

function About() {
    const { counter } = useCounterContext();
    const { color, dispatch } = useTitleColorContext();
    const setTitleColor = (color) => {
        dispatch({ type: color })
    }
    return (
        <div>
            <h1 style={{ color: color }}>About</h1>
            <p>Counter {counter}</p>
            <ChangeContext />
            <div>
                <button onClick={() => setTitleColor("RED")}>Red</button>
                <button onClick={() => setTitleColor("BLUE")}>Blue</button>
                <button onClick={() => setTitleColor("GREEN")}>Green</button>
            </div>
        </div>
    );
}

export default About;