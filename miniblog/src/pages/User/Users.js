import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Link } from 'react-router-dom';
import style from './Users.module.css';

function Users() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { documents: posts, error, loading } = useFetchDocuments('posts', null, uid);

  console.log(posts)

  useEffect(() => {
    const fetchUser = async () => {
      const db = getFirestore();
      const userDoc = doc(db, 'users', uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setUser(userSnapshot.data());
      } else {
        console.log('No such user!');
      }
    };

    fetchUser();
  }, [uid]);

  useEffect(() => {
    if (posts) {
      const filteredPosts = posts.filter(post => post.uid === uid);
      setUserPosts(filteredPosts);
    }
  }, [posts, uid]);

  if (!user) return (
    <div className={style.post}>
      <h2>404 No User Found</h2>
      <p>No user was found!</p>
      <Link to={`/`} className='btn'>Return</Link>
    </div>
  );

  return (
    <div className={style.content}>
      <h2>This is {user.displayName}'s Page</h2>
      <p>Here you can read his/her Posts</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userPosts && userPosts.length === 0 ? (
        <div className={style.noposts}>
          <p>He/She doesn't have posts yet</p>
        </div>
      ) : (
        <>
          <div className={`${style.postHeader} ${style.shadow}`}>
            <span>Title</span>
            <span>Actions</span>
          </div>
          {userPosts.map((post, index) => (
            <div 
              key={post.id} 
              className={`${style.postContainer} ${index !== userPosts.length - 1 ? style.shadow : ''}`}
            >
              <div>
                <span>{post.title}</span>
              </div>
              <div className={style.post}>
                <Link to={`/posts/${post.id}`} className={`btn btn-outline`}>Read</Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Users;