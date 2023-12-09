
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";


const App = () => {
    
    const [isRecorded, setIsRecorded] = useState(false)
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    // const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(transcript, {
        successDuration:1000
    });

    if (!browserSupportsSpeechRecognition) {
        return null
    }
    
    return (
        <>
            <div className="container">
                <h2>JaxUniversal - Meeting Smart</h2>
                <br/>
                <p>More easy more fun 🔥.</p>

                <div className="main-content" style={{"overflow-y": "scroll"}}>
                    {transcript}
                </div>

                <div className="btn-style">
                    <button onClick={setCopied}>
                        {isCopied ? '✅ Copied!' : 'Copy to clipboard'}
                    </button>
                    <button disabled={isRecorded} onClick={() => {
                        setIsRecorded(true)
                        startListening()
                    }}>{isRecorded ? " 🔴 Recording..." : "Start Listening"}</button>

                    {isRecorded && <button onClick={() => { 
                        setIsRecorded(false)
                        SpeechRecognition.stopListening()
                         }}>Stop Listening</button>}
                </div>
            </div>
        </>
    );
};

export default App;