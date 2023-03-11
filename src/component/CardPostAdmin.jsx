import React from 'react'
import { formatISO9075 } from "date-fns";
import { Link, Navigate } from 'react-router-dom';


function CardPostAdmin(props) {

    const deletePost = async (_id) => {
        console.log('Delete button clicked' + _id)
        const response = await fetch(`http://localhost:5000/posts/${_id}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            .catch(err => console.log(`Error while Deleting Post ${err}`))

        if (response.ok) {
            console.log(response)
            alert("Post Deleted Successfully")
        } else {
            console.log("Response not okay while Deleting Post");
        }
        window.location.reload(true);
        <Navigate to={'/mypost'} />


    }
    return (<>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-20">
                <Link to={`/view/${props._id}`}>

                    <img src="https://via.placeholder.com/700x400" alt="" className="card-img-top" />
                </Link>
                <div className="card-body">
                    {/* <h4 className="card-title mb-3"><a href="javascript(void)" > {props.title}</a></h4> */}
                    {/* <div><small className="text-medium-emphasis text-muted">Last updated 3 mins ago</small></div> */}
                    {/* <div className="meta mb-1">
                        <span className="date">Published 2 days ago</span>
                        <span className="time">5 min read</span>
                        <span className="comment"><a className="text-link" href="javascript(void)">8 comments</a></span></div>

                    <br />
                    <p className="card-text ">{props.content}</p>
 */}
                    {/* <div className="small text-muted">Published on {formatISO9075(new Date(props.createdAt), { representation: 'date' })} by {props.author}</div> */}
                    <div class="d-flex flex-row bd-highlight mb-3 small">
                        <div class="p-2 bd-highlight"><i class="bi bi-person"></i> {props.author}</div>
                        <div class="p-2 bd-highlight"><i class="bi bi-clock"></i> {formatISO9075(new Date(props.createdAt), { representation: 'date' })}</div>
                        <div class="p-2 bd-highlight"><i class="bi bi-chat-dots"></i> {props.comments.length}</div>
                        <div className="p-2 bd-highlight"><i className="bi bi-eye"></i> {props.viewCount}</div>
                    </div>

                    <hr />
                    <Link className="text-decoration-none text-dark" to={`/view/${props._id}`}>
                        <h2 className="card-title text-decoration-none h5 ">{props.title}</h2>
                    </Link>
                    <p className="card-text small">{props.summary}</p>

                    <hr />
                    <Link className="btn btn-primary me-4" to={`/view/${props._id}`}>Read more →</Link>
                    <Link className="btn btn-warning btn-sm rounded mx-1" to={`/edit/${props._id}`}><i className="fa fa-edit" /></Link>
                    <span className="btn btn-danger btn-sm rounded mx-1" onClick={() => deletePost(props._id)}><i className="fa fa-trash" /></span>
                    <br />

                    {/* <li className="list-inline-item">
                        <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></button>
                    </li>
                    <li className="list-inline-item">
                        <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                    </li> */}
                </div>
                {/* <div >
                    <a className="text-link" href="blog-post.html">Read more &rarr;</a>
                </div> */}
            </div>
        </div>
    </>)
}

export default CardPostAdmin