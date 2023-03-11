import React, { useEffect, useState, useContext } from 'react'
import DraftEditor from '../component/DraftEditor'

// Draft JS SETUP
import { Navigate, useParams } from 'react-router-dom'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { formatISO9075 } from 'date-fns'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../component/DraftEditor.css'
import CommentComp from '../component/CommentComp'


import { UserContext } from '../UserContext';
import { Badge } from 'react-bootstrap'

function EditPost(props) {
  const { userInfo } = useContext(UserContext)
  const username = userInfo?.username


  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("")
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({
    "title": "",
    "content": "",
    "tags": [],
    "mentions": [],
    "author": "",
    "summary": "...",
    "createdAt": Date.now()
    // "coverimage":""
  })




  async function getData() {
    const response = await fetch(`http://localhost:5000/posts/${id}`);
    const postData = await response.json()

    return postData;
  }





  useEffect(() => {
    console.log("EDIT POST - UseEffect: " + id)

    getData().then(postData => {
      setPostInfo(postData)
      const rawEditorData = JSON.parse(postData.content)
      if (rawEditorData !== null) {
        const contentState = convertFromRaw(rawEditorData);
        setEditorState(EditorState.createWithContent(contentState));
        setTitle(postData.title)

      }
    }
    )

  }, [])


  async function updatePost(ev) {
    ev.preventDefault();
    const data = {
      "title": title,
      "summary": editorState.getCurrentContent().getPlainText().substring(0, 80) + "...",
      "content": JSON.stringify(convertToRaw(editorState.getCurrentContent())),       //Editor State -> Content State --(ConvtoRaw)--> Raw JSON
      "author": username ? username : "Admin",
      "lastmodifiedAt": Date.now(),
      "tags": hashtags ? hashtags : [],
      "mentions": mentions ? mentions.map(ment => ment.value) : [],
      // "coverimage":""
    }
    const response = await fetch(`http://localhost:5000/posts/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .catch(err => console.log(`Error while creating new Post ${err}`))

    if (response.ok) {
      console.log(response)
      alert("Post Updated Successfully")
      setRedirect(true)
    } else {
      console.log("Response not okay while creating new");
    }
  }

  // <===============================================================================================================>
  //                           REDIRECT TO HOMEPAGE (IF POST CREATED SUCCESSFULLY)
  // <===============================================================================================================>
  if (redirect) return <Navigate to="/" />
  // <===============================================================================================================>




  // <===============================================================================================================>
  //                                <===== Extract Mentions and Hashtags =====>
  // <===============================================================================================================>
  let mentions = [];
  let hashtags = [];

  //Extracting Mentions
  const entityMap = convertToRaw(editorState.getCurrentContent()).entityMap;
  Object.values(entityMap).forEach(
    entity => {
      if (entity.type === 'MENTION') {
        const elementExists = mentions.includes(entity.data);
        if (!elementExists) {

          mentions.push(entity.data);

        }

      }
    });

  // Extracting Hashtags
  // console.log(editorState.getCurrentContent().getPlainText('\u000A'))
  // console.log(editorState.getCurrentContent().getPlainText('\u000A').match(/#[a-z]+/gi))
  hashtags = (editorState.getCurrentContent().getPlainText('\u000A').match(/ #[a-z0-9_]+/gi))
  // <===============================================================================================================>


  return (
    <>
      <>{!username && <Navigate to="/" />}</>
      <>
        <div className="container">
          <div className="card border-0 shadow my-5">
            <div className="card-body p-0">
              <h2 className="text-center">Update Post</h2>
              <form onSubmit={updatePost}>

                <div className="col-md-6 ms-4 text-left">
                  <input type="text" required maxLength="40" className="form-control" id="floatingInput" value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
                </div>
                <DraftEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                  max_char_length={2500}
                />
                <br />
                <div className="row">
                  <div className="col-md-1 ms-4 text-center justify-content-middle ">
                    <label className='text-center '>Author</label>
                  </div>
                  <div className="col-md-4 ms-4 text-left">
                    <input type="text" maxLength="40" className="form-control" id="floatingInput" value={username} placeholder="Author" required disabled />
                  </div>
                </div>

                <div className="col-md-12 text-center mt-2">
                  <button className="btn btn-success btn-lg " type="submit">Update Post</button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card mb-4">                         {/* <!-- Categories widget--> */}
            <div className="card-header">Tags</div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  {hashtags ? hashtags.map((tag, index) => (<span key={"hash" + index}><Badge bg="primary">{tag}</Badge>{" "}</span>)) : <></>}
                </div>

              </div>
            </div>
          </div>
          <div className="card mb-4">                         {/* <!-- Categories widget--> */}
            <div className="card-header">Mentions</div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  {mentions ? mentions.map((mention, index) => (<span key={"ment" + index}><Badge className="pe-2" bg="secondary">{mention.value}</Badge>{" "}</span>)) : <></>}
                </div>

              </div>
            </div>
          </div>
        </div>
      </>


    </>
  )

}

export default EditPost