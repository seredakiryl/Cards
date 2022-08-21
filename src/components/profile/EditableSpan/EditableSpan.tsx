import React, {useState, KeyboardEvent} from 'react';
import s from './editableSpan.module.css'

const editLogo = require("./../../../assets/icons/Edit.png")


export const EditableSpan = () => {
    let [isEdit, setIsEdit] = useState<boolean>(false)

    const onDoubleClickHandler = () => {
        setIsEdit(!isEdit)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEdit(!isEdit)
        }
    }
    const onClickHandler = () => {
        setIsEdit(!isEdit)
    }

    return (
        <div>
            {isEdit
                ? (
                    <div className={s.inputBlock}>
                        <input className={s.input} type={"text"} onKeyPress={onEnterHandler} autoFocus/>
                        <button className={s.button} onClick={onClickHandler}>SAVE</button>
                    </div>

                ) : (
                    <div className={s.wrapper} onDoubleClick={onDoubleClickHandler}>
                        <span >Edit Your Name</span>
                        <div className={s.icon}><img src={editLogo} alt="edit"/></div>
                    </div>
                )
            }
        </div>
    );
};
