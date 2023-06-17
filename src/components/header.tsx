import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ColorModeToggle from 'features/color-mode/toggle';
import { LanguageSelect } from 'features/i18n';
import { paths } from 'pages/paths';



const Header = () => {
  const navigate = useNavigate();
  return (
    <Root>
      <div onClick={() => navigate(paths.home(), { replace: true })}>
        <svg color="var(--text-color)" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
        </svg>
      </div>
      <ContentRight>
        <ColorModeToggle />
        <LanguageSelect />
      </ContentRight>
    </Root>
  )
}

export default Header;


const ContentRight = styled.div`
  display: flex;
  > :first-child {
    margin-right: 0.5rem;
  }
  padding-right: 0.5rem;
`;

const Root = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`
