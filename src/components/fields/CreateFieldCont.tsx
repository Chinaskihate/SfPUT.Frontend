import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import exp from "constants";

interface IProps {
    createPlaceholder: string;
    createText: (text: string) => void;
}

const CreateFieldCont: FC<IProps> = ({createPlaceholder, createText}): ReactElement => {
    const [createInput, setCreateInput] = useState<string>('');

    const handleCreateClick = () => {
        createText(createInput);
    };

    const handleCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreateInput(event.currentTarget.value);
    }

    return (
        <div>
            <div>
                <input placeholder={createPlaceholder} value={createInput} onChange={handleCreateChange}/>
                <button onClick={handleCreateClick}>Create</button>
            </div>
        </div>
    );
};
export default CreateFieldCont;