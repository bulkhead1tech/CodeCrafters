const [audioUrl, setAudioUrl] = useState("");
const audioChunksRef = useRef([]);
const mediaRecorderRef = useRef(null);



const initMediaRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunksRef.current = [];

        // Automatically download the recorded audio file
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recorded_audio.webm";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      mediaRecorderRef.current = recorder;

      // Start the initial recording
     setTimeout(() => {
      
    mediaRecorderRef.current.stop();
    console.log("Recording stopped");
  
     }, 10000);

    } catch (error) {
      console.error("Error initializing media recorder:", error);
    }
  };

  initMediaRecorder();

  
  mediaRecorderRef.current.start();
  console.log("Recording started");
  
  const startButton = () => {
    mediaRecorderRef.current.start();
    console.log("Recording started");
  
};

const stopButton = () => {
    mediaRecorderRef.current.stop();
    console.log("Recording stopped");
  
};
