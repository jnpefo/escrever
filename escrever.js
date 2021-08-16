const button = document.querySelector('#button')
const text = document.querySelector('#text')

const recognition = creatRecognition()
let listening = false;

button.addEventListener('click', e => {
  if(!recognition) return;

  listening ? recognition.stop() : recognition.start()

  button.innerHTML = listening ? 'Aperta para falar' : 'Para de escutar';

  button.classList.toggle('bg-purple-200');
  button.classList.toggle('bg-purple-500');
});

function creatRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null

  if(!recognition) {
    text.innerHTML = "Speech Recognition is not found!"
    return null
  }

  recognition.lang = "pt-BR"

  recognition.onstart = () => listening = true;
  recognition.onend = () => listening = false;
  recognition.onerror = (e) => console.log('error', e); 
  recognition.onresult = (e) => text.innerHTML = e.results[0][0].transcript;
  // {  
  //   for(let i = 0; i < e.results; i ++) {
  //     if(e.results[i].isFinal) {
  //       const fala = e.results[0][0].transcript;
  //       text.value += fala;
  //     }
  //   }
  // }

  return recognition;
}
