import './Home.css';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useContext } from 'react';
import { CounterContext } from '../context/CounterContext';
import ChangeContext from '../components/ChangeContext';
import { useTitleColorContext } from '../hooks/useTitleColorContext';

const Home = () => {
    const { counter } = useContext(CounterContext);
    const url = 'http://localhost:3000/products';
    const { data: itens, loading, error } = useFetch(url);
    const { color, dispatch } = useTitleColorContext();
    const setTitleColor = (color) => {
        dispatch({ type: color })
    }

    return (
        <div>
            <h1 style={{ color: color }}>Home</h1>
            <h2>Produtos</h2>
            {error && <p>{error}</p>}
            {!loading && Array.isArray(itens) && (
                <ul className='products'>
                    {itens.map(item => (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>R$: {item.price}</p>
                            <Link to={`/products/${item.id}`}>Details</Link>
                        </li>
                    ))}
                </ul>
            )}
            <p>Counter {counter}</p>
            <ChangeContext />
            <div>
                <button onClick={() => setTitleColor("RED")}>Red</button>
                <button onClick={() => setTitleColor("BLUE")}>Blue</button>
                <button onClick={() => setTitleColor("GREEN")}>Green</button>
            </div>
        </div>
    );
};

export default Home;