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

    speechSynthesis.addEventListener('voiceschanged', populateVoices);
}());