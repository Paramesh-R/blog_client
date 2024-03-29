import { ContentState, convertToRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DraftEditor from './DraftEditor';

function UpdateComment(props) {
    const [show, setShow] = useState(false);
    let contentState = ContentState.createFromText(props.comm.comment ? props.comm.comment : "");
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

    const handleClose = () => {
        setShow(false);
        setEditorState(EditorState.createWithContent(contentState));
    };
    const handleShow = () => setShow(true);


    useEffect(() => { setEditorState(EditorState.createWithContent(contentState)); }, [contentState])

    const updateComment = async (ev) => {
        ev.preventDefault();
        if (!editorState.getCurrentContent().hasText()) { alert("Enter Comments") /* commentRef.current.focus(); */ }
        else {
            const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
            const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
            const blog_id = props.id;
            const comment_id = props.comm._id;
            // const reader = props.comm.postedBy;
            const response = await fetch(`https://draftjs-blog-server.onrender.com/comment/${blog_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "blog_id": blog_id,
                        "comment_id": comment_id,
                        "value": value

                    })
                }).catch(err => console.log('Error creating Comment: ', err));

            if (response.ok) {
                console.log(response)
                // setPostInfo(response.json())
                alert("Comment updated Successfully")
                setShow(false)
                window.location.reload(true);
            } else {
                console.log("Response not okay while updating comment");
            }

        }
    }
    return (
        <>
            <span className="btn btn-warning btn-sm rounded mx-1" onClick={handleShow}><i className="fa fa-edit" /></span>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <input
                            className='form-control mb-3'
                            type="text"
                            disabled={false} //{username ? true : false}
                            placeholder="Name"
                            value={props.comm.postedBy}
                            readOnly
                            required
                            maxLength="20"
                        />
                        <div className="form-floating mb-5">
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateComment}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default UpdateComment