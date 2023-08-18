import React, { useState, useEffect } from 'react'
import CardPost from '../component/CardPost'
import PaginationComp from '../component/PaginationComp'
// import { UserContext } from '../UserContext'



function IndexPage(props) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    fetch(`https://draftjs-blog-server.onrender.com/posts?page=${page}`)
      .then(response => {
        response.json()
          // .then(result => setPosts(result))      ---> Before Pagination
          .then(data => {
            setPosts(data.items);
            setTotalPages(data.pageCount);
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log("Error Fetching all post: " + err))
  }, [page])



  // PAGINATION Function
  function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") { setPage(1) }
    else if (value === "&lsaquo;") { if (page !== 1) { setPage(page - 1) } }
    else if (value === "&rsaquo;") { if (page !== totalPages) { setPage(page + 1) } }
    else if (value === "&raquo;" || value === " ...") { setPage(totalPages) }
    else { setPage(value) }
  }
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
          {/* <div className="col-lg-8"> */}
          {/* Contents */}
          <div className="row">

            {posts.length > 0 && posts.map((post, index) => (<CardPost key={index} {...post} />))}
            {posts.length === 0 && <h2 className="text-center">No Result Found</h2>}
          </div>
          {/* Select Limit + Pagination */}
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

          {/* </div> */}

          {/* Column - Search */}                      {/* Column - Search and Tags */}{/* <!-- Search widget--> */}
          {/* <div className="col-lg-2">
            <div className="card mb-4">                         
              <div className="card-header">Search</div>
              <div className="card-body">
                <div className="input-group">
                  <input className="form-control" type="text" placeholder="Enter search term..." value={search} onChange={ev => setSearch(ev.target.value)} aria-label="Enter search term..." aria-describedby="button-search" />
                   */}{/* <button className="btn btn-primary" id="button-search" type="button" onClick={searchPosts}>Go!</button> */}
          {/*  </div>
              </div>
            </div>
          </div> */}
          {/* <!-- Categories widget--> */}
          {/*  <div className="card mb-4">                         
              <div className="card-header">Categories</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      <li><a href="#!">Web Design</a></li>
                      <li><a href="#!">HTML</a></li>
                      <li><a href="#!">Freebies</a></li>
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      <li><a href="#!">JavaScript</a></li>
                      <li><a href="#!">CSS</a></li>
                      <li><a href="#!">Tutorials</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}


          {/*  <div className="card mb-4">                       <!-- Side widget Template--> 
                       {/*  <div className="card-header">Side Widget</div>
                        <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                    </div> */}

        </div>
      </div>

    </div>

  )
}

export default IndexPage