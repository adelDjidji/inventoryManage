import React, {useEffect, useRef} from 'react'
const { ipcRenderer } = window.require('electron');

export default function Send(message) {
    const ref_ipc = useRef()
    useEffect(() => {
        ref_ipc.current = ipcRenderer;
    }, [])

    const sendAsync= (msg)=> new Promise((resolve) => {
        ref_ipc.current.once('asynchronous-reply', (_, arg) => {
            resolve(arg);
        });
        ref_ipc.current.send('asynchronous-message', msg);
    });

    return {sendAsync}
}