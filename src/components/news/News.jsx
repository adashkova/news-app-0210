import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'antd';
import { NewsContext } from '../../NewsContext';
import { useQuery } from '../../hooks/useQuery';
import { Alert } from 'antd';
import Story from '../story/Story';
import Spinner from '../spinner/Spinner';
import Fetcher from '../../fetcher';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const StyledMargin = styled.div`
  margin-bottom: 20px;
`;

const News = () => {
  const { newsContext, setContext } = useContext(NewsContext);
  const history = useHistory();
  let query = useQuery();

  const fetcher = Fetcher;

  const onChange = (page, pageSize) => {
    let offset = 0;
    if (page === 1) {
      offset = 0;
    } else {
      offset = page * pageSize - pageSize;
    }

    setContext({
      ...newsContext,
      page: page,
      perPage: pageSize,
      offset: offset,
    });
    history.push(`?page=${page}`);
  };

  useEffect(() => {
    setContext({
      ...newsContext,
      isLoading: true,
    });
    fetcher
      .fetchNews('topstories.json?print=pretty')
      .then(res => {
        return Promise.all(res.map(item => fetcher.fetchItems(item)));
      })
      .then(news => {
        let offset = 0;
        let page = 1;
        if (+query.get('page') === 1 || +query.get('page') === 0) {
          offset = 0;
          page = 1;
        } else {
          offset = +query.get('page') * 20 - newsContext.perPage;
          page = +query.get('page');
        }
        setContext({
          ...newsContext,
          news: news,
          page: page,
          isLoading: false,
          offset: offset,
        });
      });
  }, []);

  const { page, perPage, offset, news, isLoading, error } = newsContext;

  if (isLoading) return <Spinner />;
  if (error !== undefined) return <Alert />;

  return (
    <>
      {news &&
        news
          .slice(offset, offset + perPage)
          .map((news, idx) => (
            <Story
              key={news.id}
              news={news}
              idx={idx}
              offset={offset}
            />
          ))}
      <Pagination
        defaultCurrent={page || page !== 0 ? page : 1}
        total={500}
        defaultPageSize={perPage}
        onChange={(page, pageSize) => onChange(page, pageSize)}
      />
      <StyledMargin />
    </>
  );
};

export default News;
