import './index.scss'

const PopResCard = ({imgLinks,name}) => {
    return(
        <>  
        <div className id='pop-res-container'>

        
             <img src={imgLinks} alt={name} id='pop-res-img'>

            </img>
            
            <h2 id='pop-res-h2'>{name}</h2> 
            <div className id='pop-res-bottom'> <i id='heart-svg' className="fa-solid fa-heart p-1 mx-2"></i><span id='heart-span'>34000</span></div>


        </div>
        </>
    );

};

export default PopResCard;