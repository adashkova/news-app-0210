import styled from 'styled-components';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Context } from './Context';
import Comments from './components/comments/Comments';
import News from './components/news/News';
import Navbar from './components/layout/Navbar';

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
    page: 1,
    visibleNews: [],
  });

  return (
    <Context.Provider value={{ context, setContext }}>
      <Router>
        <Navbar />
        <StyledContainer>
          <Switch>
            <Route exact path='/' component={News} />
            <Route exact path='/comments' component={Comments} />
          </Switch>
        </StyledContainer>
      </Router>
    </Context.Provider>
  );
}

export default App;
