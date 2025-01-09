import style from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument('posts');
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError([]);

    try{
        new URL(image);
    } catch (error) {
        formError.push("Image must be a URL")
    }

    const tagsArray = tags.split(' ').map(tag => tag.trim().toLowerCase());

    if (formError.length > 0) {
        setFormError(formError);
        return;
    }

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    navigate('/');
    
  };

  const combinedErrors = [...(Array.isArray(response.error) ? response.error : []), ...(Array.isArray(formError) ? formError : [])];

    return (
        <div className={style.content}>
            <h2>Create New Post</h2>
            <p>Share your stories with the world</p>
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
                    {!response.loading && <button type="submit" className='btn'>Create Post</button>}
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

export default CreatePost;