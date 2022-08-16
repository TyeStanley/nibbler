import './index.scss';
import images from './seeds'


const Home = () =>{

    return(
        <>
        <section  className ="p-5 bg-primary text-white text-center" id="hero-section"></section>

         <section className ="text-center pt-3" id='intro-statement'>
            <div className='intro-titles'>
                <div className='intro-div'><h1 className> Welcome to "PlaceHolder"</h1></div>
                <h2 className= 'pt-2 pb-3'> Save your favorite spots | Share them with friends | Find something new</h2>
            </div>
            <h3 className='p-3'> Recent Uploads </h3>
         </section>

         <section  className='intro-restaurants' id="intro-restaurants">

            <div className='top-five-recent container-fluid text-center  d-flex flex-wrap'>
                {images.map(({name, link}) =>(
                    
                        <div className='restPhotosDiv col-sm-12 col-md-3'>
                            <div className='p-1'>
                                <h4 className='col-12'>{name}</h4>
                                <img src={link} className='col-12' alt={name}></img>
                            </div>
                        </div>



                ))}
                
              

            </div>
            
            

         </section>

      </>

    );
};



export default Home;
