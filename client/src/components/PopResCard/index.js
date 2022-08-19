import './index.scss'

const PopResCard = ({imgLinks,name}) => {
    return(
        <>  
        <div className id='pop-res-container'>

             
             <img src={imgLinks} alt={name} id='pop-res-img'>

            </img>
            <h2 id='pop-res-h2'>{name}</h2> 

        </div>
        </>
    );

};

export default PopResCard;