import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import { Client, TagVm } from '../../api/api';
import Tag from "./Tag";

interface IProps {
    tagsVms: TagVm[],
    callbackTagClicked: (tag: TagVm) => void;
}

const TagList: FC<IProps> = ({tagsVms, callbackTagClicked}): ReactElement => {
    return (
        <div>
            <section>
                {tagsVms?.map((vm) => (
                    <Tag tagVm={vm} callbackTagClicked={callbackTagClicked}/>
                ))}
            </section>
        </div>
    );
};
export default TagList;