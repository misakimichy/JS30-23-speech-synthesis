(function(){
    const msg = new SpeechSynthesisUtterance();
    let voices = [];
    const dropdown = document.querySelector('[name="voice"]');
    const options = document.querySelectorAll('[type="range"], [name="text"]');
    const speakButton = document.querySelector('#speak');
    const stopButton = document.querySelector('#stop');
    msg.text = document.querySelector('[name="text"]').value;
    
    const populateVoices = (e) => {
        voices = e.currentTarget.getVoices();
        dropdown.innerHTML = voices.map(voice =>
            `<option value="${voice.name}"> ${voice.name} (${voice.lang})</option>`).join('');
    };

    const setVoice = (e) => {
        msg.voice = voices.find(voice => voice.name === e.currentTarget.value);
        handleStop();
    };

    const handleStop = (startOver = true) => {
        speechSynthesis.cancel();
        if (startOver) {
            speechSynthesis.speak(msg);
        }
    };

    const setOption = (e) => {
        msg[e.currentTarget.name] = e.currentTarget.value;
        handleStop();
    };

    speechSynthesis.addEventListener('voiceschanged', populateVoices);
    dropdown.addEventListener('change', setVoice);
    options.forEach(option => option.addEventListener('change', setOption));
    speakButton.addEventListener('click', handleStop);
    stopButton.addEventListener('click', () => handleStop(false));
}());