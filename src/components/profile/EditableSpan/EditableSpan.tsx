import React, {useState, KeyboardEvent} from 'react';
import s from './editableSpan.module.css'

const editLogo = require("./../../../assets/icons/Edit.png")


export const EditableSpan = () => {
    let [isEdit, setIsEdit] = useState<boolean>(false)

    const onDoubleClickHandler = () => {
        setIsEdit(!isEdit)
    }
    const onBlurHandler = () => {
        setIsEdit(!isEdit)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEdit(!isEdit)
        }
    }

    return (
        <div>
            {isEdit
                ? (
                    <input type={"text"} onBlur={onBlurHandler} onKeyPress={onEnterHandler} autoFocus/>
                ) : (
                    <div className={s.wrapper}>
                        <span onDoubleClick={onDoubleClickHandler}>Edit Your Name</span>
                        <div className={s.icon}><img src={editLogo} alt="edit"/></div>
                    </div>
                )
            }
        </div>
    );
};
