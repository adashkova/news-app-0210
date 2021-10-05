import React from 'react';
import styled from 'styled-components';

const StyledNewsContainer = styled.div`
  display: block;
  min-width: 80vw;
  flex-direction: column;
  padding: 0 20px;
`;
const StyledMain = styled.div`
  display: flex;
  min-width: 80%;
  flex-direction: column;
  border: 1px solid #212121;
  margin: 5px;
  padding: 10px;
  p,
  a,
  button {
    margin-right: 10px;
  }
  button {
    border: none;
    background-color: #e6e6e6;
    cursor: pointer;
  }
`;

const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: #212121;
  cursor: pointer;
  :hover {
  color: #F0A500;

`;

export const Comment = ({ comment }) => {
  const { text, by, time } = comment.data;

  return (
    <StyledNewsContainer>
      <StyledMain>
        <p>{`Comment by ${by}. `}</p>
        <p>{text}</p>
      </StyledMain>
    </StyledNewsContainer>
  );
};

export default Comment;
