import { convertFromRaw, EditorState } from 'draft-js'
import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
function TestPage() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [post, setPost] = useState(null)
    // 64087c7e5207560da5c0c5ab
    useEffect(() => {
        fetch('http://localhost:5000/posts/64087c7e5207560da5c0c5ab')
            .then(result => result.json().then(setPost(result)))
            .catch(err => console.log(err))

    }, [])

    if (!post){ 
        console.log("No Post")
        return "";

    };
    setEditorState(EditorState.createWithContent(convertFromRaw(post.content)))
    return (
        <>
            <Editor
            // editorState={EditorState.createWithContent(post.content)} 
            />
        </>

    )
}

export default TestPage