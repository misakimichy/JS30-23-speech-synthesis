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
        const voiceOptions = voices.map(voice =>
            `<option value="${voice.name}"> ${voice.name} (${voice.lang})</option>`).join('');
        dropdown.innerHTML = voiceOptions;
    };

    const setVoice = (e) => {
        msg.voice = voices.find(voice => voice.name === e.currentTarget.value);
        cancel();
    };

    const cancel = (startOver = true) => {
        speechSynthesis.cancel();
        if (startOver) {
            speechSynthesis.speak(msg);
        }
    };

    speechSynthesis.addEventListener('voiceschanged', populateVoices);
    dropdown.addEventListener('change', setVoice);
}());