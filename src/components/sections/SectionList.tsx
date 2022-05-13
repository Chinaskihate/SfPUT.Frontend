import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, SectionVm, TagVm} from '../../api/api';
import { FormControl } from 'react-bootstrap';
import Section from "./Section";

interface IProps {
    sections: SectionVm[],
    callbackSectionClicked: (section: SectionVm) => void;
}

const SectionList: FC<IProps> = ({sections, callbackSectionClicked}): ReactElement => {
    return (
        <div>
            <section>
                {sections?.map((vm) => (
                    <Section sectionVm={vm} callbackSectionClicked={callbackSectionClicked}/>
                ))}
            </section>
        </div>
    );
};
export default SectionList;