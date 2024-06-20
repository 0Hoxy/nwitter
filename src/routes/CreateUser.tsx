import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

export default function CreateUser() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); //에러메세지 초기화
    if (isLoading || name === '' || email === '' || password === '') return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, e.message);
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name='name' value={name} placeholder='Name' type='text' required />
        <Input onChange={onChange} name='email' value={email} placeholder='Email' type='email' required />
        <Input onChange={onChange} value={password} name='password' placeholder='Password' type='password' required />
        <Input type='submit' value={isLoading ? 'Loading...' : 'Create Account'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        이미 계정이 있습니까? <Link to='/login'>로그인 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
