import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 20px;
`;
const StyledMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
const StyledParagraf = styled.p`
    margin: 0 0 0 20px;
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
const StyledLink2 = styled(Link)`
display: flex;
flex-direction: row;
align-items: center;
text-decoration: none;
color: #212121;
cursor: pointer;
:hover {
color: #F0A500;

`;

export const Story = ({ news, idx, onClick }) => {
  const { url, title, by, score, kids, id } = news;

  return (
    <StyledNewsContainer>
      <StyledMain>
        <p>{`${idx + 1}. `}</p>

        <StyledLink
          href={
            url
          }>{` ${title} (by ${by.toUpperCase()})`}</StyledLink>
      </StyledMain>

      <StyledMain>
        <StyledParagraf>{` ${score} points`}</StyledParagraf>
        <StyledLink2 to={`/comments`} onClick={() => onClick(id)}>
          |{` ${kids === undefined ? '0 ' : kids.length} Comments `}
        </StyledLink2>
      </StyledMain>
    </StyledNewsContainer>
  );
};
export default Story;
