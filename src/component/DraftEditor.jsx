import React, { useState, useRef } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertFromRaw, convertToRaw, EditorState, Modifier } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import "../component/DraftEditor.css"


function DraftEditor(props) {

    const editorState = props.editorState;
    const setEditorState = props.setEditorState;
    // CONFIG
    const MAX_LENGTH = props.max_char_length || 2500;                                // Max Characters

    // DATA & FUNCTIONS
    // ------------------------------------------------- START: Max Characters
    const currentCount = editorState.getCurrentContent().getPlainText().length;

    const _getLengthOfSelectedText = () => {
        const currentSelection = editorState.getSelection();
        const isCollapsed = currentSelection.isCollapsed();

        let length = 0;

        if (!isCollapsed) {
            const currentContent = editorState.getCurrentContent();
            const startKey = currentSelection.getStartKey();
            const endKey = currentSelection.getEndKey();
            const startBlock = currentContent.getBlockForKey(startKey);
            const isStartAndEndBlockAreTheSame = startKey === endKey;
            const startBlockTextLength = startBlock.getLength();
            const startSelectedTextLength =
                startBlockTextLength - currentSelection.getStartOffset();
            const endSelectedTextLength = currentSelection.getEndOffset();
            const keyAfterEnd = currentContent.getKeyAfter(endKey);
            if (isStartAndEndBlockAreTheSame) {
                length +=
                    currentSelection.getEndOffset() - currentSelection.getStartOffset();
            } else {
                let currentKey = startKey;

                while (currentKey && currentKey !== keyAfterEnd) {
                    if (currentKey === startKey) {
                        length += startSelectedTextLength + 1;
                    } else if (currentKey === endKey) {
                        length += endSelectedTextLength;
                    } else {
                        length += currentContent.getBlockForKey(currentKey).getLength() + 1;
                    }

                    currentKey = currentContent.getKeyAfter(currentKey);
                }
            }
        }

        return length;
    };

    const __handleBeforeInput = () => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText("").length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
            console.log("you can type max ten characters");

            return "handled";
        }
        return "not-handled";
    };

    const _removeSelection = () => {
        const selection = editorState.getSelection();
        const startKey = selection.getStartKey();
        const startOffset = selection.getStartOffset();
        const endKey = selection.getEndKey();
        const endOffset = selection.getEndOffset();
        if (startKey !== endKey || startOffset !== endOffset) {
            const newContent = Modifier.removeRange(
                editorState.getCurrentContent(),
                selection,
                "forward"
            );
            const tempEditorState = EditorState.push(
                editorState,
                newContent,
                "remove-range"
            );
            setEditorState(tempEditorState);
            return tempEditorState;
        }
        return editorState;
    };

    const _addPastedContent = (input, editorState) => {
        const inputLength = editorState.getCurrentContent().getPlainText().length;
        let remainingLength = MAX_LENGTH - inputLength;

        const newContent = Modifier.insertText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            input.slice(0, remainingLength)
        );
        setEditorState(
            EditorState.push(editorState, newContent, "insert-characters")
        );
    };
    const __handlePastedText = (pastedText) => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText("").length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (
            currentContentLength + pastedText.length - selectedTextLength >
            MAX_LENGTH
        ) {
            const selection = editorState.getSelection();
            const isCollapsed = selection.isCollapsed();
            const tempEditorState = !isCollapsed ? _removeSelection() : editorState;
            _addPastedContent(pastedText, tempEditorState);

            return "handled";
        }
        return "not-handled";
    };

    // ------------------------------------------------- END: Max Characters

    /* function getMentions() {
        console.log("Get Mentions:")
        const rawEditorContent = convertToRaw(editorState.getCurrentContent());
        const entityMap = rawEditorContent.entityMap;
        Object.values(entityMap).map(entity => {
            console.log(entity.data.mention);
        });
    }

    function getHashtags(){
        const rawEditorContent = convertToRaw(editorState.getCurrentContent());
        console.log(rawEditorContent)
    } */
    return (
        <>
            <div className="cn mb-2">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    placeholder={props.placeholder || "Enter your content here..."}

                    readOnly={props.readOnly || false}
                    toolbarHidden={props.toolbarHidden || false}

                    wrapperClassName={props.wrapperClassName || "wrapper-class"}
                    editorClassName={props.editorClassName || "editor-class"}
                    toolbarClassName={props.toolbarClassName || "toolbar-class"}


                    // Max Char
                    handleBeforeInput={__handleBeforeInput}
                    handlePastedText={__handlePastedText}

                    mention={{
                        separator: ' ',
                        trigger: '@',
                        suggestions: [
                            { text: 'Adam', value: 'adam', url: '' },
                            { text: 'Allen', value: 'allen', url: '' },
                        ],
                    }}
                    hashtag={{
                        separator: ' ',
                        trigger: '#',
                    }}
                />
                {/*-------------------------------- TEST OUTPUT -------------------------------- */}
                {/* <div className="code-view"> */}
                {/* <p>HTML VIEW</p> */}
                {/* <textarea className="text-area" disabled value={"RES"}></textarea> */}

                {/*  <textarea
                        className="text-area"
                        style={{'width':'800px'}}
                        disabled
                        value={(editorState.getCurrentContent())}
                    />
                */}

                {/* </div> */}
                {/* ----------------------------------------------------------------------------- */}
            </div>
            <div style={{ position: "absolute", right: 50 }}>{/* Characters Count for Maximum count */}
                {currentCount}/{MAX_LENGTH} characters
            </div>

            {/* ---------------------------------------------------------------------------------- */}




        </>
    )
}

export default DraftEditor