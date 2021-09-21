const button = document.querySelector('#button')
const text = document.querySelector('#text')
const text2 = document.querySelector('#text2')

const recognition = creatRecognition()
let listening = false;

function escreve() {
  recognition.start;
}
button.addEventListener('click', e => {
  if(!recognition) return;
  
  listening
    ? recognition.stop(recognition.removeEventListener('end', escreve()))
    : recognition.start(recognition.addEventListener('end', escreve()))

  button.innerHTML = listening ? 'Aperta para falar' : 'Para de escutar';
});

function creatRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if(!recognition) {
    text.innerHTML = "Speech Recognition is not found!";
    return null;
  }

  recognition.lang = "pt_BR";

  recognition.interimResults = true;
  recognition.onstart = () => listening = true;
  recognition.onend = () => listening = false;
  recognition.onerror = (e) => console.log('error', e); 
  recognition.onresult = (e) => text2.innerHTML = e.results[0][0].transcript;

  return recognition;
}
