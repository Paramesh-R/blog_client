import React, { useContext, useEffect, useState } from 'react'
import { getPosts } from '../api/posts';
import CardPostAdmin from '../component/CardPostAdmin';
import { UserContext } from '../UserContext';

function MyPostPage() {
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  console.log("My Post Page Starts: ", username)
  const [myPosts, setMyPosts] = useState([]);


 
  useEffect(() => {
    console.log("My Post UseEffect", username);
    getPosts(1, 50).then(response => {
      console.log("My Post UseEffect", response);
      setMyPosts(response.filter(post => (post.author === username)))

    })



  }, [username])

  return (
    <>
      <div className="container">                           {     /* <!-- Page Content --> */}
        {/* <button onClick={refreshContent}>Refresh</button> */} {/* TESTING Purpose */}
        <header className="py-5 bg-light border-bottom mb-4">     {/* <!-- Page header with logo and tagline--> */}
          <div className="container">
            <div className="text-center my-1">
              <h1 className="fw-bolder">My Dashboard</h1>
              <p className="lead mb-0"></p>
            </div>
          </div>
        </header>
        <div className="container">                               {/* 06-03-2023 Index Blog Post */}
          <div className="row">
            {/* POSTS old design */}

            <div className="row">
              {myPosts.length > 0 && myPosts.map((post, index) => (<CardPostAdmin key={index} {...post} setMyPosts />))}
              {myPosts.length === 0 && <h2 className="text-center">No Result Found</h2>}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default MyPostPage