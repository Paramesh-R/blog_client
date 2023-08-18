import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import CardPostAdmin from '../component/CardPostAdmin';
import PaginationComp from '../component/PaginationComp';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../component/LoadingSpinner/LoadingSpinner';

function Dashboard() {
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const [myPosts, setMyPosts] = useState([]);
  const [isloading, setIsloading] = useState(true)

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    console.log("My Post UseEffect", username);


    fetch(`http://localhost:5000/posts?page=${page}&author=${username || ""}`)
      .then(response => {
        response.json()
          // .then(result => setPosts(result))      ---> Before Pagination
          .then(data => {
            setMyPosts(data.items);
            setTotalPages(data.pageCount);
            console.log(data)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log("Error Fetching all post: " + err))
    setIsloading(false)
  }, [page, username])


  // PAGINATION Function
  function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") { setPage(1) }
    else if (value === "&lsaquo;") { if (page !== 1) { setPage(page - 1) } }
    else if (value === "&rsaquo;") { if (page !== totalPages) { setPage(page + 1) } }
    else if (value === "&raquo;" || value === " ...") { setPage(totalPages) }
    else { setPage(value) }

    //   // console.log("clicked Page in Pagination"+ value)

  }

  return (
    <>
      {
        isloading
          ? (<LoadingSpinner />)
          : (
            <>
              {username &&
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
                      <div className='pagination-container'>

                        {/* <SelectLimit onLimitChange={setPageLimit} /> */}

                        <PaginationComp
                          totalPage={totalPages}
                          page={page}
                          limit={5}
                          sibling={1}
                          onPageChange={handlePageChange}
                        />

                      </div>
                    </div>
                  </div>

                </div>}

              <>
                {!username && <Navigate to="/" />}
              </>
            </>
          )

      }
    </>
  )
}

export default Dashboard