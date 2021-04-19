import './style.scss';
import calculateStrength from './calculateStrength.js';
import generatePassword from './generatePassword.js';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

function App() {
    let [copied, setCopied] = useState();
    let [settings, setSettings] = useState({
        maxLength: 64,
        maxDigits: 10,
        maxSymbols: 10,
        length: 12,
        digits: 4,
        symbols: 2,
        ambiguous: true,
    });
    let [password, setPassword] = useState(generatePassword(settings));
    let [strength, setStrength] = useState(calculateStrength(password));
    let [lengthThumbPosition, setLengthThumbPosition] = useState(0);
    let [digitsThumbPosition, setDigitsThumbPosition] = useState(0);
    let [symbolsThumbPosition, setSymbolsThumbPosition] = useState(0);

    function copyToClipboard() {
        let copyElement = document.createElement("textarea");
        copyElement.style.opacity = '0';
        copyElement.style.position = 'fixed';
        copyElement.textContent = password;
        document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        document.body.removeChild(copyElement);

        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 750);
    }

    function onFormKeydown(event) {
        if (event.code === 'Enter') {
            e.preventDefault();
        }
    }

    let onChangeLength = event => setSettings({...settings, length: parseInt(event.target.value, 10)});
    let onChangeDigits = event => setSettings({...settings, digits: parseInt(event.target.value, 10)});
    let onChangeSymbols = event => setSettings({...settings, symbols: parseInt(event.target.value, 10)});

    useEffect(() => {
        setStrength(calculateStrength(password));
    }, [password]);

    useEffect(() => {
        setLengthThumbPosition(((settings.length - 6) / (settings.maxLength - 6)) * 100);
        setDigitsThumbPosition(((settings.digits - 0) / (settings.maxDigits - 0)) * 100);
        setSymbolsThumbPosition(((settings.symbols - 0) / (settings.maxSymbols - 0)) * 100);
        setPassword(generatePassword(settings));
    }, [settings]);

    return (
        <section className="wrapper">
            <h1>The Password Genie</h1>
            <div className="password-box">
                <span id="password" className="password" onClick={copyToClipboard}>{password}</span>
                <span className="regenerate-password" onClick={() => setPassword(generatePassword(settings))}></span>
                <span className="copy-password" onClick={copyToClipboard}></span>
                {copied && <span className="tooltip">Password copied successfuly!</span>}
            </div>
            <form onKeyDown={onFormKeydown}>
                <div className="field-wrap">
                    <label htmlFor="strength-slider">Strength</label>
                    <span className="range-value">{strength.text}</span>
                    <div className={`range-slider_wrapper slider-strength ${strength.text}`}>
                        <span className="slider-bar" style={{width: strength.score + '%'}}></span>
                        <input id="strength-slider" type="range" className="range-slider" min="0" max="100"
                            value={strength.score} disabled readOnly />
                    </div>
                </div>
                <div className="seperator"></div>
                <div className="field-wrap">
                    <label htmlFor="length-slider">Length</label>
                    <span className="range-value">{settings.length}</span>
                    <div className="range-slider_wrapper">
                        <span className="slider-bar" style={{width: lengthThumbPosition + '%'}}></span>
                        <input id="length-slider" type="range" className="range-slider" min="6" max={settings.maxLength}
                            value={settings.length} onChange={onChangeLength} />
                    </div>
                </div>
                <div className="field-wrap">
                    <label htmlFor="digits-slider">Digits</label>
                    <span className="range-value">{settings.digits}</span>
                    <div className="range-slider_wrapper">
                        <span className="slider-bar" style={{width: digitsThumbPosition + '%'}}></span>
                        <input id="digits-slider" type="range" className="range-slider" min="0" max={settings.maxDigits}
                            value={settings.digits} onChange={onChangeDigits} />
                    </div>
                </div>
                <div className="field-wrap">
                    <label htmlFor="symbols-slider">Symbols</label>
                    <span className="range-value">{settings.symbols}</span>
                    <div className="range-slider_wrapper">
                        <span className="slider-bar" style={{width: symbolsThumbPosition + '%'}}></span>
                        <input id="symbols-slider" type="range" className="range-slider" min="0" max={settings.maxSymbols}
                            value={settings.symbols} onChange={onChangeSymbols} />
                    </div>
                </div>
            </form>
        </section>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));