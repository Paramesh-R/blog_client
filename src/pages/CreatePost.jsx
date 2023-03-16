import React, { useState, useContext } from 'react'
import DraftEditor from '../component/DraftEditor'

// Draft JS SETUP
import { convertToRaw, EditorState } from 'draft-js';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Badge } from 'react-bootstrap';


function CreatePost() {
  const { userInfo } = useContext(UserContext)
  const username = userInfo?.username

  // STATES
  const [title, setTitle] = useState("")
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [redirect, setRedirect] = useState(false);

  //ON SUBMIT 
  async function createNewPost(ev) {
    ev.preventDefault();
    const data = {
      "title": title,
      "content": JSON.stringify(convertToRaw(editorState.getCurrentContent())),       //Editor State -> Content State --(ConvtoRaw)--> Raw JSON
      "tags": hashtags ? hashtags : [],
      "mentions": mentions ? mentions.map(ment => ment.value) : [],
      "author": username ? username : "Admin",
      "summary": editorState.getCurrentContent().getPlainText().substring(0, 80) + "...",
      "createdAt": Date.now()
      // "coverimage":""
    }
    const response = await fetch('http://localhost:5000/posts',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .catch(err => console.log(`Error while creating new Post ${err}`))

    if (response.ok) {
      console.log(response)
      alert("Post Created Successfully")
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
        mentions.push(entity.data);
      }
    });
  console.log(mentions)
  hashtags = (editorState.getCurrentContent().getPlainText('\u000A').match(/ #[a-z0-9_]+/gi))
  // <===============================================================================================================>





  return (
    <>

      {username && (
        <>
          <div className="container">
            <div className="card border-0 shadow my-5">
              <div className="card-body p-0">
                <h2 className="text-center">Create New Post</h2>
                <hr className=' mx-5'/><br />
                <form onSubmit={createNewPost}>

                  <div className="col-md-6 mx-4 text-left">
                    <input type="text" required maxLength="40" className="form-control" id="floatingInput" placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div className="col mx-4">
                    <DraftEditor                      
                      editorState={editorState}
                      setEditorState={setEditorState}
                      max_char_length={2500}
                    />
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-1 ms-4 text-center justify-content-middle ">
                      <label className='text-center'>Author</label>
                    </div>
                    {/* <div className="col-md-4 mx-4 text-left"> */}
                    <div className="col mx-4">
                      <input type="text" maxLength="40" className="form-control" id="floatingInput" placeholder="Author" value={username} disabled />
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-12 text-center mt-2">
                    
                    <button className="btn btn-success btn-lg " type="submit">Create Post</button>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card mb-4">                         {/* <!-- Tags widget--> */}
              <div className="card-header">Tags</div>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    {hashtags ? hashtags.map((tag, index) => (<span key={"hash" + index}><Badge bg="primary">{tag}</Badge>{" "}</span>)) : <></>}
                  </div>

                </div>
              </div>
            </div>
            <div className="card mb-4">                         {/* <!-- Mentions widget--> */}
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
      )}
      {!username && (<Navigate to={'/login'} />)}
    </>
  )
}

export default CreatePost