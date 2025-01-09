import style from './Edit.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

function Edit() {
  const { id } = useParams(); // Get postId from URL
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState([]);

  const { document: post, loading, error } = useFetchDocument('posts', id);
  const { updateDocument, response } = useUpdateDocument('posts');
  const { user } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      setTags(post.tags.join(' '));
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError([]);

    try {
      new URL(image);
    } catch (error) {
      setFormError(prev => [...prev, "Image must be a URL"]);
    }

    const tagsArray = tags.split(' ').map(tag => tag.trim().toLowerCase());

    if (formError.length > 0) {
      return;
    }

    updateDocument(id, {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    navigate('/account');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (post && post.uid !== user.uid) {
    navigate('/');
    return null;
  }

  const combinedErrors = [...(Array.isArray(response.error) ? response.error : []), ...(Array.isArray(formError) ? formError : [])];

  return (
    <div className={style.content}>
      <h2>Edit Post '{post.title}'</h2>
      <p>Rearrange your stories with the world</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            required
            placeholder='A title for your post'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="image"
            required
            placeholder='An image that represents your post'
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <div className={style.image}>
            <p>Current Image:</p>
            <img src={post.image} alt={post.title}/>
        </div>
        
        <label>
          <span>Content:</span>
          <textarea
            name="body"
            required
            placeholder='Your post'
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder='use space to split tags'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        <div>
          {!response.loading && <button type="submit" className='btn'>Update Post</button>}
          {response.loading && <button className='btn' disabled>Loading...</button>}
        </div>
        {combinedErrors.length > 0 && (
          <ul className='error'>
            {combinedErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default Edit;