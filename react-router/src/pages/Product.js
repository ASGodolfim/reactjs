import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useTitleColorContext } from "../hooks/useTitleColorContext";
import { useCounterContext } from "../hooks/useCounterContext";
import ChangeContext from "../components/ChangeContext";

function Product() {
    const { id } = useParams();
    const url = "http://localhost:3000/products/" + id;
    const { data: product, loading, error } = useFetch(url);
    const { counter } = useCounterContext()
    const { color, dispatch } = useTitleColorContext();
    const setTitleColor = (color) => {
        dispatch({ type: color })
    }
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {product ? (
                <div>
                    <h1 style={{ color: color }}>{product.name}</h1>
                    <h2>{product.price}</h2>
                    <h2>{product.description}</h2>
                    <Link>Buy Now!</Link><p></p>
                    <Link to={`info`}>Know More...</Link>
                </div>
            ) : (
                <div><h1 style={{ color: color }}>Product not found</h1></div>
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
}

export default Product;