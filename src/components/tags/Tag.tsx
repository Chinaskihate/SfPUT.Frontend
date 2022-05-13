import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import { Client, TagVm } from '../../api/api';
import { FormControl } from 'react-bootstrap';
import styled from "styled-components";

interface IProps {
    tagVm: TagVm,
    callbackTagClicked: (tag: TagVm) => void;
}

const Colors = [
    "#CCCC00",
    "#FFFF66",
    "#FFCC66",
    "#CC9900",
    "#996600",
    "#FF9900",
    "#CC9966",
    "#FF6600",
    "#993300",
    "#CC0000",
    "#FF9999",
    "#CC3333",
    "#CC6699",

    "#9900CC",
    "#993399",
    "#663366",
    "#9966FF",
    "#663366",
    "#9966FF",

    "#6633CC",
    "#6666CC",
    "#6699FF",
    "#0066CC",
    "#66FFCC",
    "#00CC99",
]

const TagCont = styled.div`
  border: 2px solid black;
  padding: 10px;
  border-radius: 20px;
  margin: 10px;
`;

const Tag: FC<IProps> = ({tagVm, callbackTagClicked}): ReactElement => {
    let color = Colors[Math.floor(Math.random()*Colors.length)];

    return (
        <div key={tagVm.id} onClick={(event: any) => {
            callbackTagClicked(tagVm);
        }}>
            <TagCont style={{background: Colors[Math.floor(Math.random()*Colors.length)]}}>
                {tagVm.name}
            </TagCont>
        </div>
    );
};
export default Tag;