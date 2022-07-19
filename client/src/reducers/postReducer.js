import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      // fill the posts
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        // makes a copy of current posts, add new post to payload
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        // return all posts except the one that matches the payload id (the one that is deleted)
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case GET_POST:
      return{
        ...state,
        post: payload,
        loading:false
      }
    case POST_ERROR:
      // fill the error with payload
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // if post id matches, return post state with likes updated, else, return regular post
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
