import './index.scss'
import user from '../../pages/Home/seeds'


const UserReview = () =>{

    return(
        <>
            <div className='col-12 col-md-4 p-2  d-flex flex-wrap '>
             {user.map((user) =>(

                <>
                <article className='d-flex flex-wrap p-4  col-12' id="desc-box">
                    <div className='d-flex flex-wrap col-12' id='desc-box-title'>
                        <img  src={user.userPhoto} className='col-1' id='userCommentImg' alt={"avatar image for " + user.userName} ></img>
                        <h1 className='col-4 p-3' id='userName'>{user.userName}</h1>
                        
                    </div>
                    <h2 className='col-12 mt-3 p-1' id="resDesName">{user.name}</h2>
                    <p id="reviewText" className='col-12 mt-1'>" {user.review} "</p>
                </article>
                </>
             ))}                   
            
            </div>
      </>

    );
};



export default UserReview;
