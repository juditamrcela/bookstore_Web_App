import React from 'react';

function Home() {
    window.onunload = function () {
        localStorage.removeItem('prijavljeniKorisnik');  
      }
    return (
        <div className='Home'>
            <div className='home__para'>
                    <h1>Online Knjiznica</h1>
                </div>
            {/* <div className='home__body'>
                    <img className="home__image"
                    src='https://sites.psu.edu/connorzimmerman/wp-content/uploads/sites/4939/2014/01/movie-reel.png'
                    alt='splash'
                    />
            </div> */}

                
        </div>
    )
}

export default Home