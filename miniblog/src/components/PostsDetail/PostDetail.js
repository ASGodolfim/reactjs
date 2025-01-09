import style from './PostDetail.module.css';
import { Link } from 'react-router-dom';

const PostDetail = ({ post }) => {
  return (
    <div className={style.content}>
      <img src={post.image} className={style.postImage} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={style.createdBy}><Link to={`/user/${post.uid}`}>{post.createdBy}</Link></p>
      <div className={style.tags}>
        {post.tags.map((tag) => (
          <p key={tag} className={style.tag}>
            <Link to={`/search?q=${tag.toLowerCase()}`}><span>#</span>{tag}</Link>
          </p>
        ))}
      </div>
      <div className={style.postButton}>
        <Link to={`/posts/${post.id}`} className={`btn btn-outline`}>Read more</Link>
      </div>
    </div>
  );
}

export default PostDetail;