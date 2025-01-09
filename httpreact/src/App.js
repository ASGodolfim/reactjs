import './App.css';
import { useState, useEffect } from 'react';
import { useFetch } from './hooks/use-fetch';

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([])
  const { data: itens, httpConfig, loading, error } = useFetch(url)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('') 


  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    };

    httpConfig(product, "POST")

    setName('')
    setPrice('')
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && !loading && 
      (<ul>
        {itens && itens.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>)}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type='text'
              value={name} 
              name='name' 
              onChange={(e) => setName(e.target.value)}
            />
            Preço:
            <input 
              type='number' 
              value={price} 
              name='price' 
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {loading && <input type='submit' disabled value={'Aguarde'}/>}
          {!loading && <input type='submit' value={'Criar'}/>}
        </form>
      </div>
    </div>
  );
}

export default App;
