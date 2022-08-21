import React from 'react';
import s from './title.module.css'

type TitleType = {
    text: string
}

export const Title = (props: TitleType) => {
    return (
        <div>
            <h3 className={s.title}>{props.text}</h3>
        </div>
    );
};
