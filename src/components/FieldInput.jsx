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
            getEssay({ title: data.topic, essay: resultString });

            // getEssay( {
            //    "title": "Question: Yoasobi",
            //    "essay": "Yoasobi is a Japanese pop rock band formed in 2008 by two high school classmates, Yoho and Yoshitaka, in Tokyo, Japan. They are known for their catchy melodies and emotional lyrics that often deal with the struggles and triumphs of adolescence. Their debut single \"Kimi to Boku\" quickly became a hit, reaching the top of the Oricon charts and earning them a large following among teenagers. Since then, Yoasobi has released numerous singles, EPs, and albums, including their debut full-length album \"Hikari\" in 2010 and their second full-length album \"Morning Sun\" in 2012.\n\nThe band's music style is characterized by its use of electric guitars, keyboards, and drums, with Yoho playing lead vocals and Yoshitaka providing backing vocals and rhythm guitar. Their sound is often compared to that of other Japanese pop rock bands such as Utada Hikaru and Ayumi Hamasaki, but with a unique twist that sets them apart. In addition to their music, Yoasobi is also known for their energetic live performances and their close relationship with their fans, often interacting with them through social media and live events.\n\nDespite their success, Yoasobi faced several challenges throughout their career, including the loss of their lead guitarist in 2011 and the cancellation of their tour in 2015 due to Yoho's health issues. However, they have continued to persevere, releasing new music and going on tour whenever possible. In 2019, they released their third full-length album \"Sakura\" to critical and commercial success, with the lead single \"Morizo no Uta\" becoming their highest-charting song to date.\n\nOverall, Yoasobi is a talented and dedicated band that has captured the hearts of millions of fans around the world with their catchy music and heartfelt lyrics. Their story is a testament to the power of friendship and determination in the face of adversity, and their music continues to inspire and uplift listeners of all ages."
            // } )
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