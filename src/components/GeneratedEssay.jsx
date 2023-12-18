import React from "react";
import Typewriter from "typewriter-effect";

export default function GeneratedEssay({ essayInfo: { title, essay } }) {
    if(!essay) return;

    return (
        <>
            <h2 className="generated-title">{title}</h2>
            <div className="generated-essay">
                {essay.split('\n\n').map((section, index) => (
                    <React.Fragment key={index}>
                        {section}
                        <br/><br/>
                    </ React.Fragment>
                ))
                }
            </div>
        </>
    );
}
