// import { formatRFC7231 } from 'date-fns'
import { convertFromRaw, EditorState } from 'draft-js'
import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useParams } from 'react-router-dom'
import CommentComp from '../component/CommentComp'
import DraftEditor from '../component/DraftEditor'
import '../component/DraftEditor.css'

function ViewPostPage(props) {

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({
    "title": "",
    "content": "",
    "tags": [],
    "mentions": [],
    "author": "",
    "summary": "...",
    "createdAt": Date.now(),
    "comments": "",
    // "coverimage":""
  })





  useEffect(() => {
    // console.log("view POST - UseEffect: " + id)
    async function getData() {
      const response = await fetch(`https://draftjs-blog-server.onrender.com/posts/${id}`);
      const postData = await response.json()
      return postData;
    }

    getData().then(postData => {
      setPostInfo(postData)
      // console.log("GETDATAINFO", postInfo, postInfo.comments[0].comment)
      // console.log(postInfo.comments)
      const rawEditorData = JSON.parse(postData.content)
      if (rawEditorData !== null) {
        const contentState = convertFromRaw(rawEditorData);
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
    )
  }, [id])



  return (
    <>
      <div className="container">
        <div className="card border-0 shadow my-5">
          <div className="card-body p-5">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{postInfo.title}</h1>
                <div className="d-flex flex-row bd-highlight mb-0">
                  <div className="p-2 bd-highlight"><i className="bi bi-person"></i> {postInfo.author}</div>
                  {/* <div className="p-2 bd-highlight"><i className="bi bi-clock"></i> {formatRFC7231(new Date(postInfo.createdAt))}</div> */}
                  <div className="p-2 bd-highlight"><i className="bi bi-clock"></i> {new Date(postInfo.createdAt).toDateString()} - {new Date(postInfo.createdAt).toLocaleTimeString()}</div>
                  <div className="p-2 bd-highlight"><i className="bi bi-chat-dots"></i> {postInfo.comments.length}</div>
                  <div className="p-2 bd-highlight"><i className="bi bi-eye"></i> {postInfo.viewCount}</div>
                </div>
                <div className="d-flex flex-row bd-highlight mb-3">
                </div>


                {postInfo.tags.length > 0 && postInfo.tags.map((tag, index) => (<a key={index} className="badge bg-primary text-decoration-none link-light me-2" href="#!">{tag}</a>))}
                {postInfo.mentions.length > 0 && postInfo.mentions.map((ment, index) => (<a key={index} className="badge bg-secondary text-decoration-none link-light me-2" href="#!">{ment}</a>))}
              </header>
              {/* <figure className="mb-4"><img className="img-fluid rounded" src={postInfo.coverImage} alt="..." /></figure> */}
              <div className="card border-0 rounded-3 shadow-lg">
                <div className="card-body p-4">
                  <section>
                    <DraftEditor
                      editorState={editorState}
                      setEditorState={setEditorState}
                      toolbarHidden={true}
                      placeholder={" "}
                      readOnly={true}
                      // content={postInfo.content}
                      wrapperClassName="view-wrapper-class"
                      editorClassName="view-editor-class"
                      toolbarClassName="view-toolbar-class"
                    />

                    {/* <div className="p-2 bd-highlight">last modified:  {formatRFC7231(new Date(postInfo.lastmodifiedAt))}</div> */}
                    {/*  <p className="p-2 bd-highlight text-right">Last modified:  {new Date(postInfo.lastmodifiedAt).toDateString()} - {new Date(postInfo.lastmodifiedAt).toLocaleTimeString()}</p> */}
                    <div className="d-flex flex-row-reverse bd-highlight">
                      <div className="p-2 mt-3 bd-highlight small">Last modified:  {new Date(postInfo.lastmodifiedAt).toDateString()} - {new Date(postInfo.lastmodifiedAt).toLocaleTimeString()}</div>

                    </div>
                  </section>
                </div>
              </div>
            </article>
            <br />
            {/* Enter Comments Section */}
            <CommentComp
              postInfo={postInfo}
              setPostInfo={setPostInfo}
              id={id}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewPostPage