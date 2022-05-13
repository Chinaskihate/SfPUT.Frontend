import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import Tag from "./Tag";

interface IProps {
    tags: TagVm[] | undefined;
    callbackTagClicked: (tag: TagVm) => void;
}

const PostTagList: FC<IProps> = ({tags, callbackTagClicked}): ReactElement => {
    return (
        <div>
            <section>
                {tags?.map((vm) => (
                    <Tag tagVm={vm} callbackTagClicked={callbackTagClicked}/>
                ))}
            </section>
        </div>
    );
};

export default PostTagList;