import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Story from './Story';
import Spinner from '../spinner/Spinner';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { Context } from '../../Context';
import axios from 'axios';
import { Content } from 'antd/lib/layout/layout';
import { useQuery } from '../../hooks/useQuery';

const News = () => {
  const [context, setContext] = useContext(Context);
  const history = useHistory();
  let query = useQuery();

  const fetchAllData = async query => {
    try {
      const baseUrl = `https://hacker-news.firebaseio.com/v0`;
      const res = await axios.get(`${baseUrl}/${query}`);
      return res;
    } catch (error) {
      alert(error);
    }
  };

  // Get all news

  const fetchNews = async () => {
    try {
      const storedNews = [];
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

      let offset = context.perPage * page;
      let from = offset - context.perPage;

      let newsItems = res.data.slice(from, offset);

      newsItems.forEach(async item => {
        const news = await fetchAllData(
          `/item/${item}.json?print=pretty`
        );

        storedNews.push({
          id: news.data.id,
          score: news.data.score,
          url: news.data.url,
          by: news.data.by,
          title: news.data.title,
          kids: news.data.kids,
        });
        // Store news in state
        setContext({
          ...context,
          news: res,
          isLoading: false,
          visibleNews: storedNews,
        });
      });
    } catch (error) {
      alert(error);
    }
  };

  // Fetch comments

  const fetchComments = async id => {
    setContext({ ...context, comments: [], isloading: true });
    const comments = [];
    const res = await fetchAllData(`item/${id}.json?print=pretty`);
    res.data.kids.forEach(async kid => {
      const comment = await fetchAllData(
        `/item/${kid}.json?print=pretty`
      );
      comments.push(comment);
    });

    setContext({
      ...context,
      comments: comments,
      isLoading: false,
    });
  };

  const onClick = id => {
    fetchComments(id);
  };

  const onChange = page => {
    history.push(`?page=${page}`);
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (context.isLoading) return <Spinner />;

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
            allNews={context.news.data}
          />
        ))}
      <Pagination
        defaultCurrent={query.get('page')}
        total={context.news.data.length}
        defaultPageSize={20}
        onChange={(page, pageSize) => onChange(page)}
      />
    </>
  );
};

export default News;
