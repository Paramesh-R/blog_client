import { formatRFC7231 } from 'date-fns'
import React from 'react'
import { useParams } from 'react-router-dom'
import UpdateComment from './UpdateComment';

function CommentsView(props) {
    const { id } = useParams();
    const deleteComment = async (blog_id, comment_id) => {
        console.log(blog_id, comment_id)
        const response = await fetch(`http://localhost:5000/comment/${comment_id}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blog_id: blog_id, comment_id: comment_id }),
                mode: "cors",
                credentials: 'include',
            })
            .catch(err => console.log(`Error while Deleting Post ${err}`))

        if (response.ok) {
            console.log(response)
            // alert("Comment Deleted Successfully")
        } else {
            console.log("Response not okay while Deleting Post");
        }
        window.location.reload(true);
    }
    return (
        <>
            <h4 className="mb-3">Recent comments</h4>
            {/* <!-- Comment with nested comments--> */}

            {props.comments && props.comments.reverse().map((comm, index) => (
                <span key={comm._id}>

                    <div className="d-flex flex-start">
                        <img className="rounded-circle shadow-1-strong me-3"
                            src="https://dummyimage.com/50x50/ced4da/6c757d.jpgv" alt="avatar" width="60"
                            height="60" />
                        <div>
                            <h6 className="fw-bold mb-1">{comm.postedBy}</h6>
                            <div className="d-flex align-items-center mb-3">
                                <p className="mb-0 muted small text-secondary">   {formatRFC7231(new Date(comm.created))}  </p>

                            </div>
                            <p className="mb-0">
                                {comm.comment}
                            </p>
                            <UpdateComment
                                comm={comm}
                                id={id}
                            />

                            <span className="btn btn-danger btn-sm rounded mx-1" onClick={() => deleteComment(id, comm._id)}><i className="fa fa-trash" /></span>
                        </div>
                    </div>
                    <hr className="my-3" />

                </span>))}



        </>
    )
}

export default CommentsView