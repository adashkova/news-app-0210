import React, { useContext } from 'react';
import Comment from './Comment';
import { Context } from '../../Context';
import Spinner from '../spinner/Spinner';

const Comments = () => {
  const [context, setContext] = useContext(Context);

  if (context.isLoading) return <Spinner />;
  console.log(context.comments);
  return (
    <div>
      {context.comments &&
        context.comments.map(comment => {
          return (
            <Comment
              key={comment.data.parent + comment.id}
              comment={comment}
            />
          );
        })}
    </div>
  );
};

export default Comments;
