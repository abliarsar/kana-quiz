import React from 'react';
import { RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import { router } from './pages/routes'
import './styles/index.css'

const Container = styled.main`
  margin: 0 auto;
  padding: 0.5rem;
  max-width: 1200px;
`;

const App = () => {

  return (
    <I18nProvider i18n={i18n}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </I18nProvider>
  )
}

export default App;


