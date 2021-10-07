import React, { useContext, useEffect } from 'react';
import Comment from '../comment/Comment';
import { NewsContext } from '../../NewsContext';
import Spinner from '../spinner/Spinner';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const StyledNewsContainer = styled.div`
  display: block;
  min-width: 80vw;
  padding: 0 20px;
  hieght: 100vh;
`;

const Comments = () => {
  const { id } = useParams();

  const { newsContext } = useContext(NewsContext);

  const { comments, hasComments } = newsContext;

  if (!hasComments) return <Spinner />;
  return (
    <StyledNewsContainer>
      {comments &&
        comments.map(comment => {
          return <Comment key={comment.id} comment={comment} />;
        })}
    </StyledNewsContainer>
  );
};

export default Comments;
