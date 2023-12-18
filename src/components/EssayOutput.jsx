import Loading from "./Loading"
import GeneratedEssay from "./GeneratedEssay"
import CopyButton from "./CopyButton"
import { useEffect } from "react";
import { useState } from "react";

export default function EssayOutput({essay, data}) {
    const [visible, setVisible] = useState(true);
    const [styleVisible, updateStyleVisible] = useState('visible');
    const [style, setStyle] = useState('visible');

    useEffect(() => {
        setVisible(!visible);
        setStyle(visible ? '' : 'visible');
    }, [essay])

    useEffect(() => {
        if(data) {
            updateStyleVisible('');
        }
    }, [data])

    return (
        <div className={`essay-output ${styleVisible}`}>
            <div className={`effect ${style}`}>
                <Loading></Loading>
            </div>
            <GeneratedEssay essayInfo={essay}></GeneratedEssay>
            <CopyButton essayInfo={essay} visible={visible}></CopyButton>
        </div>
    )
}