import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f0a500;
  list-style: none;
  padding: 0 20px;
  margin-bottom: 10px;
`;
const StyledLink = styled(Link)`
  outline: none;
  text-decoration: none;
  list-style-type: none;
  :hover {
    color: #cdfeaa;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <h2>
        <StyledLink to='/?page=1'>
          <i className='fas fa-newspaper'></i> News
        </StyledLink>
      </h2>
    </StyledHeader>
  );
};

export default Header;
