import React from 'react';
import {ButtonLogOut} from "./ButtonLogOut/ButtonLogOut";
import s from './profile.module.css'
import {Title} from "./Title/Title";
import {Avatar} from "./Avatar/Avatar";
import {EditableSpan} from "./EditableSpan/EditableSpan";


export const Profile = () => {
    return <div className={s.wrapper}>

        <Title text={'Personal Information'}/>
        <Avatar/>
        <EditableSpan/>
        <div>
            <span className={s.mail}>your-email@gmail.com</span>
        </div>
        <ButtonLogOut/>

    </div>
}