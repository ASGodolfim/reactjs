import style from './Home.module.css';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostsDetail/PostDetail';
import debounce from 'lodash.debounce';

function Home() {
  const [query, setQuery] = useState('');
  const { documents: posts, loading, error } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const debouncedNavigate = useCallback(
    debounce((query) => {
      const searchParams = new URLSearchParams({ q: query });
      navigate(`/search?${searchParams.toString().toLowerCase()}`);
    }, 300),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      debouncedNavigate(query);
    }
  };

  return (
    <div className={style.content}>
      <h2>Most Recent</h2>
      <form onSubmit={handleSubmit} className={style.search_form}>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='btn'>Search</button>
      </form>
      <div className={style.box}>
        {loading && <p className={style.loading}>Loading...</p>}
        {error && <p className={style.error}>Error loading posts</p>}
        {posts && posts.map((post, index) => (
          <div className={index === posts.length - 1 ? style.noShadow : style.postContainer}>
              <PostDetail key={post.id} post={post} />
          </div>
         ))}
        {posts && posts.length === 0 && (
          <div className={style.noposts}>
            <p>No Posts were found</p>
            <Link to='/posts/create' className={`btn`}>Create the first post</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;