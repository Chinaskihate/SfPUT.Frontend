import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import { Rating } from 'react-simple-star-rating';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';

const apiClient = new Client('https://localhost:5001');

interface IProps {
    callbackPostRated: (rate: number) => void;
}

const RateField: FC<IProps> = ({callbackPostRated}): ReactElement => {
    const [rating, setRating] = useState(0);
    const handleRating = (rate: number) => {
        setRating(rate)
        callbackPostRated(rate / 20);
    }
    return (
        <div>
            <Rating onClick={handleRating} ratingValue={rating}/>
        </div>
    );
};

export default RateField;