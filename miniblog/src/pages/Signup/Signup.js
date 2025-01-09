import React, { useEffect, useState } from 'react';
import style from './Signup.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError([]);

    const user = {
        displayName,
        email,
        age,
        password,
        confirmPassword
    };

    const errors = [];

    if (password.length < 6) {
        errors.push("Password must have at least 6 characters");
    }
    if (password !== confirmPassword) {
        errors.push("Both passwords must match");
    }

    if (age < 18) {
        errors.push("Must be over 18 to sign up");
    }

    if (errors.length > 0) {
        setError(errors);
        return;
    }

    const res = await createUser(user);

    if (res) {
        setDisplayName('');
        setEmail('');
        setAge('');
        setPassword('');
        setConfirmPassword('');
    }
};

  useEffect(() => {
    if (authError) {
      setError([authError]);
    }
  }, [authError]);

  return (
    <div className={style.content}>
      <h2>Sign Up</h2>
      <p>Sign up to share your stories</p>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type='text'
          name="displayName"
          required
          placeholder='Name'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label>E-Mail:</label>
        <input
          type='email'
          name="email"
          required
          placeholder='email@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Age:</label>
        <input
          type='number'
          name="age"
          required
          placeholder='18+'
          value={age}
          onChange={(e) => setAge(e.target.value)}
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
        <label>Confirm Password:</label>
        <input
          type='password'
          name="confirmPassword"
          required
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          {!loading && <button onClick={handleSubmit} className='btn'>Sign up</button>}
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

export default Register;