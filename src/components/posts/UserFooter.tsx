import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import { FormControl } from 'react-bootstrap';
import styled from "styled-components";
import Header from "./Header";
import PostPreviewData from "./PostPreviewData";

const apiClient = new Client('https://localhost:5001');

interface IProps {
    postVm: PostVm;
}

const UserFooter: FC<IProps> = ({postVm}): ReactElement => {
    return (
        <div>
            {postVm.rate}
        </div>
    );
};

export default UserFooter;