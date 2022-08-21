import './index.scss'



const UserReview = ({comments}) =>{


    
        return(
        <>
        {comments.map(({commentText}) =>{ if(commentText){
    
            return(
             <div className='d-flex flex-wrap justify-content-start' id='comment-box'  key={commentText}>
                <article className='d-flex flex-wrap p-2' id="desc-box">
                    <div className='d-flex flex-wrap col-12' id='desc-box-title'>
                        <img  src="https://www.computerhope.com/jargon/g/guest-user.jpg" className='col-3 col-md-1' id='userCommentImg' alt="imga" ></img>
                        <h1 className='col-8 mx-4 my-2' id='userName'> Username</h1>
                    </div>
                    <p id="reviewText" className='col-12 mt-5 py-1 mx-3'>{commentText}</p>
                </article>
            </div>
            )
        }})}
          
        </>
    
       )
  
};



export default UserReview;
