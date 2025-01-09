import style from './Search.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import PostDetail from '../../components/PostsDetail/PostDetail';
import debounce from 'lodash.debounce';

function Search() {
    const [query, setQuery] = useState('');
    const querySearch = useQuery();
    const search = querySearch.get('q');
    const { documents: posts, loading, error } = useFetchDocuments("posts", search);
    const navigate = useNavigate();

    const debouncedNavigate = useCallback(
        debounce((query) => {
            const searchParams = new URLSearchParams({ q: query });
            navigate(`/search?${searchParams.toString()}`);
        }, 300),
        [navigate]
    );

    useEffect(() => {
        if (search) {
            setQuery(search);
        }
    }, [search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            debouncedNavigate(query);
        }
    };

    return (
        <div className={style.content}>
            <h2>Searching...</h2>
            <form onSubmit={handleSubmit} className={style.search_form}>
                <input
                    type='text'
                    placeholder='Search...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label='Search posts'
                />
                <button className='btn' type='submit' aria-label='Submit search'>Search</button>
            </form>
            <div className={posts && posts.length > 0 ? style.box : style.invisible}>
                {posts && posts.map((post, index) => (
                    <div key={post.id} className={index === posts.length - 1 ? style.noShadow : style.postContainer}>
                        <PostDetail post={post} />
                    </div>
                ))}
            </div>
            <div className={style.nopost}>
            {loading && <p>Loading...</p>}
                {error && <p>Error loading posts: {error}</p>}
                {posts && posts.length === 0 && (
                    <>
                        <p>No posts were found within your search...</p>
                        <br/>
                        <br/>
                        <Link className={`btn`} to="/posts/create">Create Post</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;