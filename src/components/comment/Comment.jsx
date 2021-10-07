import styled from 'styled-components';

const StyledNewsContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 80vw;
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  border: 1px solid #b2b1b9;
  border-radius: 3px;
  word-break: break-all;
  margin: 5px 0;
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
  ,
  p {
    width: 95%;
  }
`;

export const Comment = ({ comment }) => {
  const { text, by: athor } = comment;

  return (
    <StyledNewsContainer>
      <StyledMain>
        <h4>
          {athor &&
            `Comment by ${athor.charAt(0).toUpperCase()}${athor.slice(
              1
            )}. `}
        </h4>
        <p>{text}</p>
      </StyledMain>
    </StyledNewsContainer>
  );
};

export default Comment;
