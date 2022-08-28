import React, {useEffect} from 'react';
import s from './Packs.module.css'
import { PacksHeader } from "./PacksHeader/PacksHeader";
import {packsAPI} from "../../Api/packs-api";

export const Packs = () => {
    useEffect(() => {
        packsAPI.getPack().then((res) => {
            console.log(res.data)
        })
    })
    return (
        <div className={s.wrapper}>
            <PacksHeader />
        </div>
    );
};
