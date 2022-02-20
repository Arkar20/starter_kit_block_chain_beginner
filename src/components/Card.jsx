import Identicon from 'react-identicons';

import React from "react";
const Card = ({ post, tipPost }) => {
  
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
          
          <div  className='card-footer'>
            <p className="card-link   ">Curent Tip Amount - {window.web3.utils.fromWei(post.tipAmount.toString(),'Ether')} </p>
            <button className="btn btn-primary card-link" onClick={()=>tipPost(post.id)}>Tip ETH 1</button>
          </div>
          </div>
</div>
    </>
  );
  
}
export default Card;