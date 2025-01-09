import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const url = "http://localhost:3000/products";
    
    const { data: items, loading, error } = useFetch(url);

    console.log("Search Params:", searchParams.toString());
    console.log("Fetched Items:", items);

    // Filtrar os itens com base no parâmetro de busca
    const filteredItems = items?.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h1>Search Results</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {filteredItems && filteredItems.map((item) => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>R$: {item.price}</p>
                        <Link to={`/products/${item.id}`}>Read more...</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;