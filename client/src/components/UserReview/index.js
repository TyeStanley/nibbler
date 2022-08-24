
import './index.scss'
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../utils/mutations'

const UserReview = ({comments, _id, username}) =>{
   console.log(comments)
    const [deleteComment] = useMutation(DELETE_COMMENT);
    
    
    const deleteCommentHandler =(e) =>{
       const commentId = e.target.getAttribute("data-id");
       
       try {
         deleteComment({
          variables: { commentId }
        });
  
        
        
      } catch (err) {
        console.error(err);

      }
      
      window.location.reload(true);


    }

    if(comments.length > 0){
        if(comments && _id && username){
        return(
        <>
        <div id='comment-box-wrapper'>
        {comments.map(({commentText, _id}) =>{ 
            return(
                
             <div className='d-flex  justify-content-start' id='comment-box'  key={commentText}>
                <article className='d-flex flex-wrap p-2' id="desc-box">
                    <div className='d-flex flex-wrap  col-12' id='desc-box-title'>
                        <img  src="https://www.computerhope.com/jargon/g/guest-user.jpg" className='col-3 col-md-1' id='userCommentImg' alt="imga" ></img>
                        <h1 className='col-4 col-md-8 mx-4 my-2' id='userName'>{username}</h1>
                    </div>
                    <p id="reviewText" className='col-12 mt-5 py-1 mx-3'>{commentText}</p>
                    <button data-id={_id} className='btn btn-danger' onClick={deleteCommentHandler}>Delete</button>
                </article>
            </div>
            )
        })}
          </div>
        </>
    
        )}
        console.log(comments)
        return(
            <>
            <div id='comment-box-wrapper'>
            {comments.map(({commentText,user}) =>{ 
        
                return(
                 <div className='d-flex  justify-content-start' id='comment-box'  key={commentText}>
                    <article className='d-flex flex-wrap p-2' id="desc-box">
                        <div className='d-flex flex-wrap col-12' id='desc-box-title'>
                            <img  src="https://www.computerhope.com/jargon/g/guest-user.jpg" className='col-3 col-md-1' id='userCommentImg' alt="imga" ></img>
                            <h1 className='col-4 col-md-8 mx-4 my-2' id='userName'> {user.username}</h1>
                        </div>
                        <p id="reviewText" className='col-12 mt-5 py-1 mx-3'>{commentText}</p>
                    </article>
                </div>
                )
            })}
              </div>
            </>
        
            )}
    
    
    
    
    
}
      
        




export default UserReview;
