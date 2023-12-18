import { useState } from "react";
import ComboBox from "./ComboBox"

export default function FieldInput({essay : {essay}, getEssay, getData}) {
    const [input, changeInput] = useState('');
    const [data, changeData] = useState({topic : '', language: 'english', type : 'academic'});
    const [prevData, changePrevData] = useState();


    const generateEssay = async () => {
        const url = 'https://open-ai25.p.rapidapi.com/ask';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'f9a5d4a052mshe3fa0b8198e125cp1846f6jsn88c6ca178a3a',
                'X-RapidAPI-Host': 'open-ai25.p.rapidapi.com'
            },
            body: JSON.stringify({
                query: `Generate an essay on ${data.topic} in ${data.language} with a focus on ${data.type}. 
                Include at least three paragraphs covering key points. 
                Add escape literal(\n) for each section
                `
            })
        };


        try {
            const response = await fetch(url, options);
            const resData = await response.json();
            const resultString = resData.response;
            getEssay({ title: `Question: ${data.topic}`, essay: resultString });
        } catch (error) {
            getEssay({ title: 'Error', essay: 'Sorry, an error occurred while generating the essay. Please try again.' });
        }
    } 

    const upDatePrev = () => {
        changePrevData(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!data.topic) {
            return;
        }
        if(prevData) {
            getEssay({ title: '', essay: '' });
        }
        getData(true);
        await generateEssay();
        changeInput('');
        upDatePrev();
    }

    const handleInput = (topic) => {
        changeData((prevInput) => ({ ...prevInput, topic }));
        changeInput(topic);
    }

    const handleChangeLanguage = (language) => {
        changeData((prevInput) => ({ ...prevInput, language }));
    } 

    const handleChangeType = (type) => {
        changeData((prevInput) => ({ ...prevInput, type }));
    } 
    
    return (
        <>
            <form className="input-field" onSubmit={(e) => handleSubmit(e)}>
                <input value={input} type="text" placeholder="Enter essay topic here..." onChange={(e) => handleInput(e.target.value)}/>
                <input type="submit" value="generate" />
            </form>

            <div className="options-field">
                <div className="option-main">
                    <p>Language</p>
                    <ComboBox handle={handleChangeLanguage} options={['english', 'filipino', 'japanese', 'korean', 'spanish', 'french', 'italian', 'chinese']} ></ComboBox>
                </div>

                <div className="option-main">
                    <p>Type</p>
                    <ComboBox handle={handleChangeType} options={['academic', 'narrative', 'argumentative', 'expository', 'descriptive', 'persuasive', 'informative', 'personal-narrative', 'reflective', 'synthesis']} ></ComboBox>
                </div>
            </div>
        </>
    )
}
