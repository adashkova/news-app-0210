import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NewsContext } from '../../NewsContext';
import Comments from '../comments/Comments';
import News from '../news/News';
import Navbar from '../layout/Navbar';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #e6e6e6;
`;

function App() {
  const [newsContext, setContext] = useState({
    news: [],
    comments: [],
    error: undefined,
    isLoading: true,
    setShowComments: false,
    hasComments: false,
    idComment: undefined,
    perPage: 20,
    page: 1,
    offset: 0,
  });

  return (
    <NewsContext.Provider value={{ newsContext, setContext }}>
      <Router>
        <Navbar />
        <StyledContainer>
          <Switch>
            <Route exact path="/" component={News} />
            <Route exact path={`/?page=${newsContext.page}`} component={News} />
            <Route exact path="/comments/:id" component={Comments} />
          </Switch>
        </StyledContainer>
      </Router>
    </NewsContext.Provider>
  );
}

export default App;
