import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  addLike,
  deletePost,
  removeLike,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on {formatDate(date)} 
      </p>
      {/* if showActions is true, show the buttons */}
      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up'></i>{' '}
            <span>{likes.length > 0 && <span> {likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down'> </i>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion {/* make sure there is a comment */}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {/* make sure post user and logged in user match, if they do, show delete button */}
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions : true
}

PostItem.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
