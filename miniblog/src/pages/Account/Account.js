import { useAuthValue } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

import style from './Account.module.css';

function Account() {
  const { user } = useAuthValue();
  const uid = user.uid;
  
  const { deleteDocument } = useDeleteDocument('posts')
  const { documents: posts, loading, error } = useFetchDocuments('posts', null, uid);

  let userPosts = []
  const userPostsFiller = () => {
    posts.map((post) => {if (post.uid === user.uid) {
      userPosts.push(post);
    }})
    return userPosts;
  }

  userPostsFiller()

  return (
    <div className={style.content}>
      <h2>Hello {user.displayName}</h2>
      <p>Manage your Posts</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userPosts && userPosts.length === 0 ? (
        <div className={style.noposts}>
          <p>You don't have posts yet</p>
          <Link to='/posts/create' className={`btn`}>Create your first post</Link>
        </div>
      ) : (
        <>
            <div className={`${style.postHeader} ${style.shadow}`}>
              <span>Title</span>
              <span>Actions</span>
            </div>
            {userPosts.map((post, index) => (
              <div className={`${style.postContainer} ${style.shadow}`}>
                <div key={post.id}>
                  <span>{post.title}</span>
                </div>
                <div className={style.post}>
                    <Link to={`/posts/${post.id}`} className={`btn btn-outline`}>Read</Link>
                    <Link to={`/posts/edit/${post.id}`} className={`btn btn-outline`}>Edit</Link>
                    <button className={`btn btn-outline btn-danger`} onClick={() => deleteDocument(post.id)}>Delete</button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>

  );
}

export default Account;