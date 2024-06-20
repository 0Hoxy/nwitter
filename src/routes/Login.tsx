import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components';
import GithubButton from '../components/GithubButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || email === '' || password === '') return;
    try {
      setLoading(true);
      //파이어베이스 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Login 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name='email' value={email} placeholder='Email' type='email' required />
        <Input onChange={onChange} value={password} name='password' placeholder='Password' type='password' required />
        <Input type='submit' value={isLoading ? 'Loading...' : 'Log in'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요? <Link to='/create-account'>가입하기 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
