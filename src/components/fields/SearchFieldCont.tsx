import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import exp from "constants";

interface IProps {
    searchPlaceholder: string;
    searchText: (text: string) => void;
}

const SearchFieldCont: FC<IProps> = ({searchPlaceholder, searchText}): ReactElement => {
    const [searchInput, setSearchInput] = useState<string>('');

    const handleSearchClick = () => {
        searchText(searchInput);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.currentTarget.value);
    }

    return (
        <div>
            <input placeholder={searchPlaceholder} value={searchInput} onChange={handleSearchChange}/>
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
};
export default SearchFieldCont;