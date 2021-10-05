import React, { useContext } from 'react';
import Comment from '../comment/Comment';
import { Context } from '../../Context';
import Spinner from '../spinner/Spinner';
import styled from 'styled-components';

const StyledNewsContainer = styled.div`
  display: block;
  min-width: 80vw;
  padding: 0 20px;
`;

const Comments = () => {
  const { context } = useContext(Context);

  if (context.isLoading) return <Spinner />;

  return (
    <StyledNewsContainer>
      comments
      {context.comments &&
        context.comments.map(comment => {
          return <Comment key={comment.id} comment={comment} />;
        })}
    </StyledNewsContainer>
  );
};

export default Comments;
