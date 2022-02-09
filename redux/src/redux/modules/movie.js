import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../lib/axios';

//액션
const GET_TOP_RANK_MOVIE = 'GET_TOP_RANK_MOVIE';
const GET_POPULAR_MOVIE = 'GET_POPULAR_MOVIE';

//액션 생성함수
const moviesRank = createAction(GET_TOP_RANK_MOVIE, (data) => ({ data }));
const popularMovies = createAction(GET_POPULAR_MOVIE, (data) => ({ data }));

//미들웨어
const getTopRankMovieToAxios = () => {
  return (dispatch) => {
    apis
      .getTopRankMovie()
      .then((res) => {
        dispatch(moviesRank(res.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getPopularMovieToAxios = () => {
  return (dispatch) => {
    apis
      .getPopularMovie()
      .then((res) => {
        dispatch(popularMovies(res.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 초기값
const initialState = {
  topRankList: [],
  popularList: [],
};

//리듀서
export default handleActions(
  {
    [GET_TOP_RANK_MOVIE]: (state, action) =>
      produce(state, (draft) => {
        draft.topRankList = action.payload.data;
      }),

    [GET_POPULAR_MOVIE]: (state, action) =>
      produce(state, (draft) => {
        draft.popularList = action.payload.data;
      }),
  },
  initialState,
);

const middleWare = {
  getTopRankMovieToAxios,
  getPopularMovieToAxios,
};

export { middleWare };
