import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';
import CreateUser from './routes/CreateUser';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/Loading-screen';
import { auth } from './firebase';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateUser />,
  },
]);

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
  box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
  `;
  return (
    <>
      <Wrapper>
        <GlobalStyle />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  );
}

export default App;
