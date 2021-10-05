import styled from 'styled-components';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Context } from './Context';
import Header from './components/layout/Header';
import Comments from './components/comments/Comments';
import News from './components/news/News';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #e6e6e6;
`;

function App() {
  const [context, setContext] = useState({
    news: [],
    comments: [],
    error: undefined,
    isLoading: true,
    perPage: 20,
    visibleNews: [],
  });

  return (
    <Context.Provider value={[context, setContext]}>
      <Router>
        <StyledContainer>
          <Header />
          <Switch>
            <Route exact path='/' component={News} />
            <Route path='/comments' component={Comments} />
          </Switch>
        </StyledContainer>
      </Router>
    </Context.Provider>
  );
}

export default App;
