import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import styled from "styled-components";

const HeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleCont = styled.div`
    border: 2px black solid;
    border-radius: 20px 0px 0px 0px;
  width: 100%;
  padding: 10px;
`;

const SectionCont = styled.div`
  border: 2px black solid;
  border-width: 2px 2px 2px 0px;
  padding: 10px;
  border-radius: 0px 20px 0px 0px;
`;

interface IProps {
    title: string | undefined;
    sectionName: string | undefined;
}

const Header: FC<IProps> = ({title, sectionName}): ReactElement => {
    return (
            <HeaderCont>
                <TitleCont>{title}</TitleCont>
                <SectionCont>{sectionName}</SectionCont>
            </HeaderCont>
    );
};

export default Header;