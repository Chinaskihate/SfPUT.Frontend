import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import {Client, CommentVm, TagVm} from '../../api/api';
import {FormControl} from 'react-bootstrap';
import styled from "styled-components";

interface IProps {
    commentVm: CommentVm,
}

const CommentCont = styled.div`
  border-radius: 10px;
  background-color: white;
`;

const Comment: FC<IProps> = ({commentVm}): ReactElement => {
    return (
        <div key={commentVm.id}>
            <CommentCont>
                <p>{commentVm.username}</p>
                <p>{commentVm.content}</p>
            </CommentCont>
        </div>
    );
};
export default Comment;