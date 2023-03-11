import { convertToRaw, EditorState } from 'draft-js'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ViewPostPage from '../pages/ViewPostPage'
import { UserContext } from '../UserContext'
import CommentsView from './CommentsView'
import DraftEditor from './DraftEditor'

function CommentComp(props) {
  const postInfo = props.postInfo;
  const setPostInfo = props.setPostInfo;

  const { userInfo } = useContext(UserContext)
  const username = userInfo?.username
  const { id } = useParams();
  // STATES
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const commentRef = useRef()
  // Comments State
  // console.log("Comments Username: ", username)
  const [reader, setReader] = useState(username || "");

  useEffect(() => {
    setReader(username)


  }, [username])


  const addComments = async (ev) => {
    ev.preventDefault();

    if (!editorState.getCurrentContent().hasText()) { alert("Enter Comments") /* commentRef.current.focus(); */ }
    else {

      // const content = editorState.getCurrentContent().getPlainText('\u000A') // plaintext from draft old method

      // Get Plain Text From Editor
      const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
      const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
      console.log(reader, value, id);

      const response = await fetch(`http://localhost:5000/posts/${id}/comment`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "comment": value,
            "postedBy": reader
          })
        }).catch(err => console.log('Error creating Comment: ', err));

      if (response.ok) {
        console.log(response)
        setPostInfo(response.json())
        alert("Comment Added Successfully")
        window.location.reload(true);
      } else {
        console.log("Response not okay while creating comment");
      }
    }

  }
  return (
    <>
      {/*  <---------- Comment Section (Start) ---------->*/}
      {/* <div className="h1 fw-light">Comment Section - TEST</div> */}
      <div className="container px-0 my-3">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card border-0 rounded-3 shadow-lg">
              <div className="card-body p-4">
                <div className="text-left">
                  <div className="h1 fw-light">Comment</div>
                </div>


                <form onSubmit={addComments}>
                  <input
                    className='form-control w-25 mb-3'
                    type="text"
                    disabled={username ? true : false}
                    placeholder="Name"
                    value={reader}
                    onChange={(ev) => { setReader(ev.target.value) }}
                    required
                    maxLength="20"
                  />

                  {/* <!-- Name Input --> */}
                  {/* <div className="form-floating mb-1">

                    <input className="form-control" id="name" type="text" disabled={username ? true : false} placeholder="Name" value={reader} onChange={(ev) => { setReader(ev.target.value) }} data-sb-validations="required" />
                  </div> */}


                  {/* <!-- Message Input --> */}
                  <div className="form-floating mb-5">
                    {/* <textarea className="form-control" id="message" type="text" placeholder="Message" style={{ "height": "20rem" }} data-sb-validations="required"></textarea> */}
                    <DraftEditor
                      editorState={editorState}
                      setEditorState={setEditorState}
                      placeholder={"Enter your comments here..."}
                      toolbarHidden={true}

                      wrapperClassName={"comments-wrapper-class"}
                      editorClassName={"comments-editor-class"}
                      toolbarClassName={"comments-toolbar-class"}
                      max_char_length={250}
                      className="form-control pb-2"
                      required
                    // ref={commentRef}
                    />
                  </div>
                  <button className="btn btn-primary btn-md float-end me-4">Submit Comments</button>

                  {/* <!-- Submit button --> */}
                  {/* <div className="d-grid"><button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button>                  </div> */}
                </form>
                {/* <!-- End of contact form --> */}

              </div>
              <hr />
              <div className="mx-3">
                <CommentsView comments={postInfo.comments} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  <---------- Comment Section (End) ---------->*/}

      {/* <!-- Comments section--> */}
      <section className="mb-5">

      </section>
    </>
  )
}

export default CommentComp