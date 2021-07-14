//global recorder object
recorder = null
startButton = null
audio = null
//use a shared global stream
stream = null

//get user media at page startup
addEventListener('load', function(){
    stream = navigator.mediaDevices.getUserMedia({ audio: true });
})



//record audio definition
const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(await stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

//time sleep definition
const sleep = time => new Promise(resolve => setTimeout(resolve, time));




recording = null
function changeMicrohopneIcon() {
  if (recording == null || recording == false) {
    $("#microphone").css('color', 'red')
    $("#microphone").addClass('fa-stop')
    $("#microphone").removeClass('fa-microphone')
  }
  else {
    recording = false
    $("#microphone").css('color', '')
    $("#microphone").removeClass('fa-stop')
    $("#microphone").addClass('fa-microphone')
  }
}


const startRecording = async () => {
  audio = null;
  recorder = await recordAudio();
  recorder.start();
}

const stopRecording = async () => {
  audio = await recorder.stop();
  sendAudio();
  // audio.play();
}


function recordAction() {
  if (recording == null || recording == false) {
    changeMicrohopneIcon()
    recording = true
    startRecording()
  } else {
    changeMicrohopneIcon()
    recording = false
    stopRecording()
  }
}

const play = async () => {
    audio.play();
}


function sendAudio() {






  // console.log("start sending binary data...");
  // var form = new FormData();
  // blob = audio.audioBlob
  // // blob = new Blob([audio.audioBlob], { type: 'audio/wav; codecs=0' })
  // form.append('audio', blob)



  // $.ajax({
  //   url: faq_url_audio,
  //   type: 'POST',
  //   data: form,
  //   processData: false,
  //   contentType: false,
  //   success: function (data) {
  //       writeMessage(data['request'])
  //       writeMessage(data['response'])
  //       $("#messageArea").val('')
  //   },
  //   error: function (e) {
  //     // handle error case here
  //     alert('error')
  //   }
  // });




  const csrfToken = $.cookie("csrftoken");

  console.log("start sending binary data...");
  var form = new FormData();
  blob = audio.audioBlob
  form.append('audio', blob)

  $.ajax({
      url: '/get_audio/',
      type: 'POST',
      data: form,
      headers: { "X-CSRFToken": csrfToken },
      processData: false,
      contentType: false,
    success: function (data) {
        writeMessage(data['request'])
        writeMessage(data['response'])
        $("#messageArea").val('')
      },
      error: function (e) {
          // handle error case here
          alert('error')
      }
  });



}





function recordActionGoal() {
  if (recording == null || recording == false) {
    changeMicrohopneIcon()
    recording = true
    startRecording()
  } else {
    changeMicrohopneIcon()
    recording = false
    stopRecordingGoal()
  }
}


const stopRecordingGoal = async () => {
  audio = await recorder.stop();
  sendAudioGoal()
}


function sendAudioGoal() {


  console.log("start sending binary data...");
  var form = new FormData();
  blob = audio.audioBlob
  // blob = new Blob([audio.audioBlob], { type: 'audio/wav; codecs=0' })
  form.append('audio', blob)



  $.ajax({
    url: goal_url_audio,
    type: 'POST',
    data: form,
    processData: false,
    contentType: false,
    success: function (data) {
      writeMessage(data['request'])
      arr = convertStringTableToArray(data['response']['content'])
      writeTable(arr)
      $("#messageArea").val('')
    },
    error: function (e) {
      // handle error case here
      alert('error')
    }
  });
}