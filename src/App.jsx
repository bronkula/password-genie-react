import './style.scss';
import calculateStrength from './calculateStrength.js';
import generatePassword from './generatePassword.js';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


const Slider = ({
        type,
        label,
        text,
        value,
        min=0,
        max=100,
        onChange=()=>{},
        disabled=false,
        readOnly=false
    }) => {

    return (<div className="field-wrap">
        <label htmlFor={`${type}-slider`}>{label}</label>
        <span className="range-value">{text}</span>
        <div className={`range-slider_wrapper slider-${type} ${text}`}>
            <span className="slider-bar" style={{width: Math.round((value-min)/(max-min)*100) + '%'}}></span>
            <input id={`${type}-slider`} type="range" className="range-slider" min={min} max={max}
                value={value} disabled={disabled} readOnly={readOnly} onChange={onChange} />
        </div>
    </div>);
}



// Since this function is made outside the scope, we curry a function into it
const copyToClipboard = (password,fn) => () => {
    let copyElement = document.createElement("textarea");
    copyElement.style.opacity = '0';
    copyElement.style.position = 'fixed';
    copyElement.textContent = password;
    document.body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    document.body.removeChild(copyElement);

    fn(true);
    setTimeout(() => {
        fn(false);
    }, 750);
}

const onFormKeydown = (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
    }
}


const handleChange = fn => event => fn(parseInt(event.target.value, 10));


function App() {
    let [copied, setCopied] = useState('');
    
    const maxLength = 64;
    const maxDigits = 10;
    const maxSymbols = 10;
    let [length, setLength] = useState(12);
    let [digits, setDigits] = useState(4);
    let [symbols, setSymbols] = useState(2);

    let [password, setPassword] = useState(generatePassword({length,digits,symbols}));
    let [strength, setStrength] = useState(calculateStrength(password));
    
    useEffect(() => {
        setStrength(calculateStrength(password));
    }, [password]);

    useEffect(() => {
        setPassword(generatePassword({length,digits,symbols}));
    }, [length,digits,symbols]);

    return (
        <section className="wrapper">
            <h1>The Password Genie</h1>
            <div className="password-box">
                <span id="password" className="password" onClick={copyToClipboard(password,setCopied)}>{password}</span>
                <span className="regenerate-password" onClick={() => setPassword(generatePassword({length,digits,symbols}))}></span>
                <span className="copy-password" onClick={copyToClipboard(password,setCopied)}></span>
                {copied && <span className="tooltip">Password copied successfuly!</span>}
            </div>
            <form onKeyDown={onFormKeydown}>
                <Slider
                    type="strength"
                    label="Strength"
                    text={strength.text}
                    value={strength.score}
                    disabled={true}
                    readOnly={true}
                    />

                <div className="seperator"></div>

                <Slider
                    type="length"
                    label="Length"
                    text={length}
                    min="6"
                    max={maxLength}
                    value={length}
                    onChange={handleChange(setLength)} />

                <Slider
                    type="digits"
                    label="Digits"
                    text={digits}
                    min="0"
                    max={maxDigits}
                    value={digits}
                    onChange={handleChange(setDigits)} />

                <Slider
                    type="symbols"
                    label="Symbols"
                    text={symbols}
                    min="0"
                    max={maxSymbols}
                    value={symbols}
                    onChange={handleChange(setSymbols)} />
            </form>
        </section>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));