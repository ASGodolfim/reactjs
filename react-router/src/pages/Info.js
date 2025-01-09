import { useFetch } from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';

function Info() {
    const { id } = useParams();
    const url = "http://localhost:3000/products/" + id;
    const { data: product, loading, error } = useFetch(url);

    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.name}</h1>
                    <h2>{product.info}</h2>
                    <Link>Buy Now!</Link>
                </div>
            ) : (
            <div>Product not found</div>
            )}
        </div>
    )
}

export default Info
