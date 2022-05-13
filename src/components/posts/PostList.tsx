import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, PostVm, TagVm} from '../../api/api';
import Post from "./Post";

interface IProps {
    postVms: PostVm[],
    callbackPostClicked: (post: PostVm) => void;
}

const PostList: FC<IProps> = ({postVms, callbackPostClicked}): ReactElement => {
    return (
        <div>
            <section>
                {postVms?.map((vm) => (
                    <Post postVm={vm} callbackPostClicked={callbackPostClicked} refreshPosts={() => {}}/>
                ))}
            </section>
        </div>
    );
};
export default PostList;