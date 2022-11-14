// import './index.scss';
import './userReview.css';
// GraphQL
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../utils/mutations';

export default function UserReview({ comments, _id, username }) {
  const [deleteComment] = useMutation(DELETE_COMMENT);
    
  function deleteCommentHandler(e) {
    const commentId = e.target.getAttribute("data-id");
       
    try {
      deleteComment(
        { variables: { commentId } }
      );  
    } catch (err) {
      console.error(err);
    }
      
    window.location.reload(true);
  }

  if (comments.length > 0) {
    if (comments && _id && username) {
      return (
        <>
          <div>
            {comments.map( ({ commentText, _id }) => { 
              return (
                <div key={commentText}>
                  <article>
                    <div>
                      <img src="https://www.computerhope.com/jargon/g/guest-user.jpg" alt="imga" />
                      <h1>{username}</h1>
                    </div>
                    <p>{commentText}</p>
                    <button
                      data-id={_id}
                      onClick={deleteCommentHandler}
                    >
                      Delete
                    </button>
                  </article>
                </div>
              );
            })}
          </div>
        </>
      );
    }
       
    return (
      <>
        <div>
          {comments.map( ({ commentText, user }) => { 
            return (
              <div key={commentText}>
                <article>
                  <div>
                    <img
                      src="https://www.computerhope.com/jargon/g/guest-user.jpg"
                      alt="imga"
                    />
                    <h1>{user.username}</h1>
                  </div>
                  <p>{commentText}</p>
                </article>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
