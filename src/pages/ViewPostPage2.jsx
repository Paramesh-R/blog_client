import React, { useEffect, useState } from 'react'
import CommentComp from '../component/CommentComp'
import DraftEditor from '../component/DraftEditor'
import { convertFromRaw, EditorState } from 'draft-js';
import { useParams } from 'react-router-dom';
import { formatISO9075 } from "date-fns";
import { Badge } from 'react-bootstrap';
import draftToHtml from 'draftjs-to-html';

function ViewPostPage(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())//createWithContent(""))

  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  console.log("View: ", id)


  useEffect(() => {
    console.log("View POST UseEffect")
    try {
      fetch(`http://localhost:5000/posts/${id}`)
        .then(response => {
          response.json()
            .then(postData => {
              setPostInfo(postData); console.log("PostData: " + postData);

            })
            .catch(err => console.log("Error while getting Result: " + err))
        })
        .catch(err => console.log("Error in response catch: " + err))
    } catch (error) {
      console.log("Error in fetch" + error)
    }


  }, [])
  if (!postInfo) return '';
  /*   const state = postInfo.content
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(postInfo.content)))
      : EditorState.createEmpty();
    setEditorState(state); */
  console.log(postInfo)
  return (
    <>

      <div className="h1 fw-light">View Post Section</div>
      {/* Page Content */}
      <div className="container">
        <div className="card border-0 shadow my-5">
          <div className="card-body p-5">
            {/*  
            <h1 className="fw-light">Fixed Full Page Background Image</h1>
            <p className="lead">In this snippet, the background image is fixed to the body element. Content on the page will
              scroll, but the image will remain in a fixed position!</p>
            <p className="lead">Scroll down...</p>
            <div style={{ "height": "100%" }}></div>
            <p className="lead mb-0">You've reached the end!</p>
            */}
            {/* <CommentComp /> */}
            {/* <!-- Post content--> */}
            <article>
              {/* <!-- Post header--> */}
              <header className="mb-4">
                {/* <!-- Post title--> */}
                <h1 className="fw-bolder mb-1">{postInfo.title}</h1>
                {/* <!-- Post meta content--> */}
                <div className="text-muted fst-italic mb-2">Posted on {formatISO9075(new Date(postInfo.createdAt), { representation: 'date' })} by {postInfo.author}</div>
                {/* <!-- Post TAG categories--> */}
                {postInfo.tags.length > 0 && postInfo.tags.map((tag, index) => (<a key={index} className="badge bg-primary text-decoration-none link-light me-2" href="#!">{tag}</a>))}
                {postInfo.mentions.length > 0 && postInfo.mentions.map((ment, index) => (<a key={index} className="badge bg-secondary text-decoration-none link-light me-2" href="#!">{ment}</a>))}
                

              </header>
              {/* <!-- Preview image figure--> */}
              <figure className="mb-4"><img className="img-fluid rounded" src={postInfo.coverImage} alt="..." /></figure>
              {/* <!-- Post content--> */}
              {/*  <section className="mb-5">
                <p className="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind. Because it transforms who we are, how we live, and it gives us an understanding of our place in the universe.</p>
                <p className="fs-5 mb-4">The universe is large and old, and the ingredients for life as we know it are everywhere, so there's no reason to think that Earth would be unique in that regard. Whether of not the life became intelligent is a different question, and we'll see if we find that.</p>
                <p className="fs-5 mb-4">If you get asteroids about a kilometer in size, those are large enough and carry enough energy into our system to disrupt transportation, communication, the food chains, and that can be a really bad day on Earth.</p>
                <h2 className="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                <p className="fs-5 mb-4">For me, the most fascinating interface is Twitter. I have odd cosmic thoughts every day and I realized I could hold them to myself or share them with people who might be interested.</p>
                <p className="fs-5 mb-4">Venus has a runaway greenhouse effect. I kind of want to know what happened there because we're twirling knobs here on Earth without knowing the consequences of it. Mars once had running water. It's bone dry today. Something bad happened there as well.</p>
              </section> */}
              <textarea  cols="30" rows="10" value={draftToHtml(convertFromRaw(postInfo.content))}/>
              <section>
                <DraftEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                  toolbarHidden={true}
                  placeholder={" "}
                  content={postInfo.content}
                  wrapperClassName="view-wrapper-class"
                  editorClassName="view-editor-class"
                  toolbarClassName="view-toolbar-class"
                />
              </section>
            </article>
            <br /><br />
            <CommentComp />


          </div>
        </div>
      </div>

      {/* TESTSETSETSET */}
      <div className="code-view">
        {/* <p>draftToHtml(View)  - convertToRaw(JSON) - editorState</p>

                <textarea
                    style={{ 'width': '1000px', 'height': "500px" }}
                    className="text-area"
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
        <hr />
        {/* <p>convertToRaw (JSON)- editorState</p>
                <textarea
                    style={{ 'width': '1000px', 'height': "50px" }}
                    className="text-area"
                    disabled
                    value={convertToRaw(editorState.getCurrentContent())}
                />
                <p>convertToRaw (JSON)- editorState</p>
                <textarea
                    style={{ 'width': '1000px', 'height': "500px" }}
                    className="text-area"
                    disabled
                    value={editorState.getCurrentContent()}
                /> */}
        {/*    <Editor
          editorState={EditorState.createWithContent(convertFromRaw(convertToRaw(editorState.getCurrentContent())))}
          readOnly={true}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          // onEditorStateChange={setEditorState}
          // placeholder="Enter your content here..."
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"

          // Max Char
          handleBeforeInput={__handleBeforeInput}
          handlePastedText={__handlePastedText}
        /> */}

      </div>


    </>)
}

export default ViewPostPage