import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NewsContext } from '../../NewsContext';
import Fetcher from '../../fetcher';
import styled from 'styled-components';

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

const StyledParagraph = styled.p`
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

export const Story = ({ news, idx }) => {
  const { newsContext, setContext } = useContext(NewsContext);

  const fetcher = Fetcher;

  const { url, title, by, score, kids, id } = news;

  const handleShowComments = id => {
    setContext({
      ...newsContext,
      hasComments: false,
    });
    fetcher.fetchItems(id).then(res => {
      return Promise.all(res.kids.map(kid => fetcher.fetchItems(kid))).then(
        comments => {
          setContext({
            ...newsContext,
            comments: comments,
            hasComments: true,
          });
        }
      );
    });
  };

  const onClick = id => {
    handleShowComments(id);
  };

  return (
    <StyledNewsContainer>
      <StyledMain>
        <p>{newsContext.news.findIndex(item => item === news) + 1}.</p>
        <StyledLink href={url} target="_blank">
          {` ${title} (by ${by ? by.toUpperCase() : '-'})`}
        </StyledLink>
      </StyledMain>
      <StyledMain>
        <StyledParagraph>{score} points</StyledParagraph>
        <StyledLink2 to={`/comments/${id}`} onClick={() => onClick(id)}>
          |{` ${kids === undefined ? '0 ' : kids.length} Comments `}
        </StyledLink2>
      </StyledMain>
    </StyledNewsContainer>
  );
};
export default Story;
