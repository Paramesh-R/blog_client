import React, { useState, useEffect } from 'react'
//For Card
import CardPost from '../component/CardPost'
// For Pagination
import SelectLimit from "../component/SelectLimit"
import PaginationComp from '../component/PaginationComp'
// API
import { getPosts, getTotalPostsLength } from '../api/posts'
// import BlogPostCard from '../component/BlogPostCard'



function IndexPage() {
  // Post
  const [posts, setPosts] = useState([])
  // Pagination
  // const [page, setPage] = useState(1);
  // const [pageLimit, setPageLimit] = useState(10);
  // let currPage = 1;

  // let totalPages = Math.ceil(getTotalPostsLength() / pageLimit) || 1 // Find Total No of Pages Needed
  // console.log("totalPages:", totalPages)
  // if (page <= totalPages) { currPage = page; }                  // Set Current Page for pagination according to Pagelimit
  // else { setPage(totalPages); currPage = page; }


  

  // useEffect(() => {
  //   // fetch('http://localhost:5000/posts').then(response => { response.json().then(posts => { setPosts(posts); setFilteredPost(getPosts(currPage, pageLimit)); console.log(posts.length) }) })
  // }, [page, pageLimit]);




  useEffect(() => {


    // console.log(pageLimit);
    // const x = getTotalPostsLength();
    // console.log("Get total posts: ", x);

    // totalPages = Math.ceil(getTotalPostsLength() / pageLimit) || 10 //
    // console.log("UseEffect Total Pages: ", totalPages)
    // getPosts(currPage, pageLimit).then(data => setPosts(data))
    // getPosts(currPage, pageLimit).then(data => setPosts(data))
    fetch('http://localhost:5000/posts/')
      .then(response => {
        response.json()
          .then(result => setPosts(result))
          .catch(err => console.log(err))
      })
      .catch(err => "Error Fetching all post: " + err)

    // totalPages = Math.ceil(posts.length / pageLimit);
    // console.log("Math ceil", Math.ceil(posts.length / pageLimit));
    // console.log("UseEffect Total Pages: ", totalPages)
    // if (page <= totalPages) { currPage = page; }                  // Set Current Page for pagination according to Pagelimit
    // else { setPage(totalPages); currPage = page; }
    // console.log("totalPages: ", totalPages)

    // console.log("currPage: ", currPage)

    // console.log("pageLimit: ", pageLimit)
  }, [])


  
  // PAGINATION Function
  /* function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") { setPage(1) }
    else if (value === "&lsaquo;") { if (page !== 1) { setPage(page - 1) } }
    else if (value === "&rsaquo;") { if (page !== totalPages) { setPage(page + 1) } }
    else if (value === "&raquo;" || value === " ...") { setPage(totalPages) }
    else { setPage(value) }

    //   // console.log("clicked Page in Pagination"+ value)

  } */
  // --------------------------


  return (

    <div className="container">                           {/* <!-- Page Content --> */}
      {/* <button onClick={refreshContent}>Refresh</button> */}
      <header className="py-5 bg-light border-bottom mb-4">   {/* <!-- Page header with logo and tagline--> */}
        <div className="container">
          <div className="text-center my-5">
            <h1 className="fw-bolder">Welcome to Blog Home!</h1>
            <p className="lead mb-0"></p>
          </div>
        </div>
      </header>


      <div className="container">                         {/* 06-03-2023 Index Blog Post */}
        <div className="row">
          {/* POSTS old design */}

          <div className="row">

            {posts.length > 0 && posts.map((post, index) => (<CardPost key={index} {...post} />))}
            {posts.length === 0 && <h2 className="text-center">No Result Found</h2>}
          </div>

          {/* Select Limit + Pagination */}


          <div className='pagination-container'>

            {/* <SelectLimit onLimitChange={setPageLimit} /> */}

            {/*  <PaginationComp
              totalPage={totalPages}
              page={currPage}
              limit={pageLimit}
              sibling={1}
              onPageChange={handlePageChange}
            />
 */}
          </div>
          {/*              
            
           */}


        </div>
      </div>

    </div>

  )
}

export default IndexPage