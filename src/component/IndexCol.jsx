import React from 'react'

function IndexCol() {
    return (
        <div>

            <div className="col-lg-8">                      {/* Column Blog entries  */}
            </div>

            <div className="col-lg-4">                      {/* Column - Search and Tags */}
                <div className="card mb-4">                         {/* <!-- Search widget--> */}
                    <div className="card-header">Search</div>
                    <div className="card-body">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Enter search term..." value={search} onChange={ev => setSearch(ev.target.value)} aria-label="Enter search term..." aria-describedby="button-search" />
                            <button className="btn btn-primary" id="button-search" type="button" onClick={searchPosts}>Go!</button>
                        </div>
                    </div>
                </div>


                <div className="card mb-4">                         {/* <!-- Categories widget--> */}
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
                </div>


                {/*  <div className="card mb-4">                       <!-- Side widget Template--> 
                       {/*  <div className="card-header">Side Widget</div>
                        <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                    </div> */}
            </div>

        </div>
    )
}

export default IndexCol