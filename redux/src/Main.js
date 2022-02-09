import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { middleWare } from './redux/modules/movie';
import styled from 'styled-components';
import axios from 'axios';

const Main = () => {
  const dispatch = useDispatch();
  const BASE_URL = 'https://image.tmdb.org/t/p/original/';

  const [mongodbData, setMongodbData] = useState([]);

  const popularMovie = useSelector((state) => state.movie.popularList);
  const topRankMoive = useSelector((state) => state.movie.topRankList);

  const [poupularToggle, setPoupularToggle] = useState('');
  const [rankToggle, setRankToggle] = useState('');
  const [mongDbToggle, setMongodbToggle] = useState('');

  const getPopularMovie = () => {
    dispatch(middleWare.getPopularMovieToAxios());
    setPoupularToggle(true);
    setRankToggle(false);
    setMongodbToggle(false);
  };
  const getTopRankMovie = () => {
    dispatch(middleWare.getTopRankMovieToAxios());
    setRankToggle(true);
    setPoupularToggle(false);
    setMongodbToggle(false);
  };

  const openMongodbData = () => {
    setMongodbToggle(true);
    setRankToggle(false);
    setPoupularToggle(false);
  };

  // 몽고db데이터 axios
  useEffect(() => {
    axios
      .get('/api/goods')
      .then((res) => {
        setMongodbData(res.data.goods);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container>
        <Title>영화데이터</Title>
        <Box>
          <Button onClick={getPopularMovie} margin='0 15px 0 0'>
            유명 영화 데이터
          </Button>
          <Button onClick={getTopRankMovie} margin='0 15px 0 0'>
            영화 랭킹 데이터
          </Button>
          <Button onClick={openMongodbData}>MongoDB 데이터</Button>
        </Box>
      </Container>

      {poupularToggle ? (
        <MovieListContiner>
          {popularMovie.map((content) => {
            return (
              <MovieListBox key={content.id}>
                <Img src={`${BASE_URL}${content.poster_path}`} />
                <TextBox>
                  <P>제목 : {content.title}</P>
                  <P>개봉일 : {content.release_date}</P>
                  <P>평점 : {content.vote_average} </P>
                  <P margin='0 0 10px 0'>개요</P>
                  <P margin='0 0 30px 0'>{content.overview}</P>
                </TextBox>
              </MovieListBox>
            );
          })}
        </MovieListContiner>
      ) : (
        ''
      )}

      {rankToggle ? (
        <MovieListContiner>
          {topRankMoive.map((content) => {
            return (
              <MovieListBox key={content.id}>
                <Img src={`${BASE_URL}${content.poster_path}`} />
                <TextBox>
                  <P>제목 : {content.title}</P>
                  <P>개봉일 : {content.release_date}</P>
                  <P>평점 : {content.vote_average} </P>
                  <P margin='0 0 10px 0'>개요</P>
                  <P margin='0 0 30px 0'>{content.overview}</P>
                </TextBox>
              </MovieListBox>
            );
          })}
        </MovieListContiner>
      ) : (
        ''
      )}

      {mongDbToggle ? (
        <MovieListContiner>
          {mongodbData.map((content) => {
            return (
              <MovieListBox key={content.goodsId}>
                <Img src={content.thumbnailUrl} />
                <TextBox>
                  <P>카테고리 : {content.category}</P>
                  <P>상품이름 : {content.name}</P>
                  <P>가격 : {content.price} </P>
                </TextBox>
              </MovieListBox>
            );
          })}
        </MovieListContiner>
      ) : (
        ''
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 40px;
`;

const Box = styled.div`
  display: flex;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  margin: ${(props) => props.margin};
  cursor: pointer;
  font-weight: bold;
`;

const MovieListContiner = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 0 60px;
`;

const MovieListBox = styled.div`
  margin: 50px 30px 0 0;
  width: 315px;
  border: 1px solid black;
`;

const TextBox = styled.div`
  padding: 0 15px;
`;

const Img = styled.img`
  width: 315px;
  height: 300px;
  object-fit: center;
`;

const P = styled.p`
  font-weight: bold;
  line-height: 20px;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default Main;
