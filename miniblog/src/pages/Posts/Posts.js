import style from './Posts.module.css';
import { useParams, Link } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { format } from 'date-fns';

function Posts() {
    const { id } = useParams();
    const { document: post, loading, error } = useFetchDocument("posts", id);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading post: {error}</p>;
    }

    if (!post) {
        return (
            <div className={style.post}>
                    <h2>404 no Post Found</h2>
                    <p>No posts were found!</p>
                    <Link to={`/`} className='btn'>Return</Link>
            </div>
        );
    }

    const createdAtDate = post.createdAt.toDate();

    return (
        <div className={style.post}>
            {post && (
                <>
                    <h2>{post.title}</h2>
                    {post.image && <img src={post.image} alt={post.title} />}
                    <p className={style.body}>{post.body}</p>
                    <br/>
                    <br/>
                    <div className={style.tags}>
                        {post.tags.map((tag) => (
                            <p key={tag} className={style.tag}>
                                <Link to={`/search?q=${tag.toLowerCase()}`}><span>#</span>{tag}</Link>
                            </p>
                        ))}
                    </div>
                    <p className={style.createdBy}><Link to={`/user/${post.uid}`}>{post.createdBy}</Link></p>
                    <p className={style.createdAt}>{format(createdAtDate, 'PPP')}</p>
                </>
            )}
        </div>
    );
}

export default Posts;