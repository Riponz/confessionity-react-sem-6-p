import React from 'react'
import './Home.css'
import Navbar from '../Components/Navbar'

function Home() {
  return (
    <>
    <Navbar/>
    <div className='home'>
      <div className="all-posts">
        <div className="post-info">
          <span className='username'>username</span>
          <span className='time'>09:00</span>
        </div>
        <div className="post-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, esse quibusdam molestias in ratione sequi reprehenderit cupiditate, tempore consectetur architecto, ducimus fuga accusantium sint. Molestias aperiam laudantium sapiente architecto aut tempore quo natus vel eius repellendus corporis porro ipsum inventore earum tempora voluptatem saepe neque, alias excepturi eveniet. Recusandae at eum non consequuntur id sit minus ipsum repellendus assumenda nulla, ipsam incidunt debitis ipsa inventore esse perferendis. Accusamus, porro. Harum consectetur perspiciatis ex ea nemo temporibus quaerat quisquam excepturi neque voluptatibus beatae fugiat recusandae, eum quia rerum, repellat, quidem incidunt. Accusamus corrupti ipsam ad illo deserunt voluptatibus exercitationem atque perspiciatis.
        </div>
      </div>
      <div className="all-posts">
        <div className="post-info">
        <span className='username'>username</span>
          <span className='time'>09:00</span>
        </div>
        <div className="post-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, esse quibusdam molestias in ratione sequi reprehenderit cupiditate
        </div>
      </div>
      <div className="all-posts">
        <div className="post-info">
        <span className='username'>username</span>
          <span className='time'>09:00</span>
        </div>
        <div className="post-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, esse quibusdam molestias in ratione sequi reprehenderit cupiditate, tempore consectetur architecto, ducimus fuga accusantium sint. Molestias aperiam laudantium sapiente architecto aut tempore quo natus vel eius repellendus corporis porro ipsum inventore earum tempora voluptatem saepe neque, alias excepturi eveniet. Recusandae at eum non consequuntur id sit minus ipsum repellendus assumenda nulla, ipsam incidunt debitis ipsa inventore esse perferendis. Accusamus, porro. Harum consectetur perspiciatis ex ea nemo temporibus quaerat quisquam excepturi neque voluptatibus beatae fugiat recusandae, eum quia rerum, repellat, quidem incidunt. Accusamus corrupti ipsam ad illo deserunt voluptatibus exercitationem atque perspiciatis.
        </div>
      </div>
    </div>
    </>
  )
}

export default Home