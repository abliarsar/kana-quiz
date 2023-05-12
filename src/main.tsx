import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import styled from 'styled-components';

import { router } from './pages/routes'
import './styles/index.css'
import { getDefaultColorMode } from 'features/color-mode/toggle';

const Container = styled.main`
  margin: 0 auto;
  padding: 0.5rem;
  max-width: 1200px;
`;

getDefaultColorMode();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Container>
    <RouterProvider router={router} />
  </Container>
);


