import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Story from '../story/Story';
import Spinner from '../spinner/Spinner';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { Context } from '../../Context';
import axios from 'axios';
import { useQuery } from '../../hooks/useQuery';
import { Alert } from 'antd';

const News = () => {
  const { context, setContext } = useContext(Context);
  const history = useHistory();
  let query = useQuery();

  const fetchAllData = async query => {
    try {
      const baseUrl = `https://hacker-news.firebaseio.com/v0`;
      const res = await axios.get(`${baseUrl}/${query}`);
      return res;
    } catch (error) {
      setContext({
        ...context,
        error: error,
      });
    }
  };

  // Get all news

  const fetchNews = async pageSize => {
    try {
      let storedNews = [];
      const res = await fetchAllData('topstories.json?print=pretty');

      // Get items per page
      let page = +query.get('page');
      if (page === 0) {
        page = 1;
      }
      setContext({
        ...context,
        page: page,
      });

      let perPage = 20;
      if (pageSize) {
        perPage = pageSize;
      }

      let offset = +perPage * page;
      let from = offset - +perPage;

      let newsItems = res.data.slice(from, offset);

      newsItems.forEach(async item => {
        const news = await fetchAllData(
          `/item/${item}.json?print=pretty`
        );

        storedNews = [
          ...storedNews,
          {
            id: news.data.id,
            score: news.data.score,
            url: news.data.url,
            by: news.data.by,
            title: news.data.title,
            kids: news.data.kids,
          },
        ];

        // Store news in state
        setContext({
          ...context,
          news: res,
          isLoading: false,
          visibleNews: storedNews,
        });
      });
    } catch (error) {
      setContext({
        ...context,
        error: error,
      });
    }
  };

  // Fetch comments

  const fetchComments = async id => {
    setContext({ ...context, comments: [], isloading: true });
    let comments = [];
    const res = await fetchAllData(`item/${id}.json?print=pretty`);
    res.data.kids.forEach(async kid => {
      const comment = await fetchAllData(
        `/item/${kid}.json?print=pretty`
      );
      comments = [...comments, comment];
    });

    setContext({
      ...context,
      comments: comments,
      isLoading: false,
    });
  };

  const onClick = id => {
    history.push(`/comments`);
    fetchComments(id);
  };

  const onChange = (page, pageSize) => {
    history.push(`?page=${page}`);

    fetchNews(pageSize);
    setContext({
      ...context,
      perPage: pageSize,
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (context.isLoading) return <Spinner />;
  if (context.error !== undefined) return <Alert />;

  return (
    <>
      {context.visibleNews &&
        context.visibleNews.map((news, idx) => (
          <Story
            key={news.id}
            news={news}
            idx={idx}
            onClick={onClick}
            offset={context.offset}
            page={query.get('page') ? query.get('page') : 0}
            size={
              context.visibleNews.length
                ? context.visibleNews.length
                : context.perPage
            }
          />
        ))}
      <Pagination
        defaultCurrent={query.get('page') ? query.get('page') : 1}
        total={context.news.data.length}
        defaultPageSize={context.perPage}
        onChange={(page, pageSize) => onChange(page, pageSize)}
      />
    </>
  );
};

export default News;
