import React from 'react'
import { formatISO9075 } from "date-fns";
import { Link } from 'react-router-dom';

function CardPost(props) {
    return (<>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-20">
                <Link to={`/view/${props._id}`}>

                    <img src="https://via.placeholder.com/700x400" alt="" className="card-img-top" />
                    {/* <img src="https://loremflickr.com/700/400/nature" alt="" className="card-img-top" /> */}
                    
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




                    <div className="d-flex flex-row bd-highlight mb-3 small">
                        <div className="p-2 bd-highlight"><i className="bi bi-person"></i> {props.author}</div>
                        <div className="p-2 bd-highlight"><i className="bi bi-clock"></i> {formatISO9075(new Date(props.createdAt), { representation: 'date' })}</div>
                        <div className="p-2 bd-highlight"><i className="bi bi-chat-dots"></i> {props.comments.length}</div>
                        <div className="p-2 bd-highlight"><i className="bi bi-eye"></i> {props.viewCount}</div>
                    </div>

                    <hr />
                    <Link className="text-decoration-none text-dark" to={`/view/${props._id}`}>
                        <h2 className="card-title text-decoration-none h5 ">{props.title}</h2>
                    </Link>
                    <p className="card-text small">{props.summary}</p>

                    {/* <div className="small">
                        {props.tags.length > 0 && props.tags.map((tag, index) => (<a key={index} className="badge bg-secondary text-decoration-none link-light me-2" href="#!">{tag}</a>))}
                        {props.mentions.length > 0 && props.mentions.map((ment, index) => (<a key={index} className="badge bg-secondary text-decoration-none link-light me-2" href="#!">{ment}</a>))}
                    </div> */}
                    <hr />
                    <Link className="btn btn-primary" to={`/view/${props._id}`}>Read more →</Link>
                    <br />

                </div>
                {/* <div >
                    <a className="text-link" href="blog-post.html">Read more &rarr;</a>
                </div> */}
            </div>
        </div>
    </>)
}

export default CardPost
