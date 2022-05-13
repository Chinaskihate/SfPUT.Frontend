import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import {Client, CommentVm, TagVm} from '../../api/api';
import Comment from "./Comment";

interface IProps {
    commentVms: CommentVm[],
}

const CommentList: FC<IProps> = ({commentVms}): ReactElement => {
    return (
        <div>
            <section>
                {commentVms?.map((vm) => (
                    <Comment commentVm={vm}/>
                ))}
            </section>
        </div>
    );
};
export default CommentList;