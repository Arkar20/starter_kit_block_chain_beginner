import Identicon from 'react-identicons';

import React from "react";
const Card = ({ post }) => {
  return (  
    <>
      <div className="card m-2" style={{maxWidth: '30rem'}}>
          <div className="card-body">
            <div className="card-title ">
          <div className="float -left justify-content-center flex-wrap">
              <Identicon string="randomness" size="50"/>
          </div>
            <div className='m-2'>{post.author}</div>

          </div>
      
          <p className="card-text">{post.content}</p>
          
          <form action="">
            <button className="btn btn-primary">Go somewhere</button>
          </form>
          </div>
</div>
    </>
  );
  
}
export default Card;