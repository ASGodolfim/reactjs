import { useEffect, useState } from 'react';
import style from './Login.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError([]);

    const user = {
        email,
        password,
    };

    console.log(user);

    const errors = [];

    if (errors.length > 0) {
        setError(errors);
        return;
    }

    try {
        await login(user);
        setEmail('');
        setPassword('');
    } catch (error) {
        setError([error.message]);
    }
};

  useEffect(() => {
    if (authError) {
      setError([authError]);
    }
  }, [authError]);

  return (
    <div className={style.content}>
      <h2>Log in</h2>
      <p>Log in and share your stories</p>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type='email'
          name="email"
          required
          placeholder='email@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type='password'
          name="password"
          required
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          {!loading && <button type="submit" className='btn'>Log in</button>}
          {loading && <button className='btn' disabled>Loading...</button>}
        </div>
        {error.length > 0 && (
          <ul className='error'>
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Login;