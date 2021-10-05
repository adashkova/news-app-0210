import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';
import { Layout } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Header } = Layout;

const StyledLink = styled(Link)`
  padding: 0;
  margin: 0;
  outline: none;
  text-decoration: none;
  list-style-type: none;
  :hover {
    color: #cdfeaa;das
  }
`;

const Navbar = () => {
  const { context, setContext } = useContext(Context);

  const history = useHistory();

  const onClick = () => {
    history.push(`/?page=1`);
    setContext({
      ...context,
      page: 1,
    });
  };

  return (
    <Header>
      <h2>
        <StyledLink to='/?page=1' onClick={() => onClick()}>
          <i className='fas fa-newspaper'></i> News
        </StyledLink>
      </h2>
    </Header>
  );
};

export default Navbar;
