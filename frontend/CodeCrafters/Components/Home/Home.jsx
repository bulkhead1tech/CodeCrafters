import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import women from "/women.png";
import Card from "../Games/Card";
import WebCam from "react-webcam";

function Home() {
  const [send, setSend] = useState(null);
  const [transcript, setTranscript] = useState("");


  const handle = () => {
    setSend(!send);
  };

    

  useEffect(() => {
    

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
      console.log("Speech recognition service has started");
    };

    recognition.onresult = function (event) {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.start();
    if (transcript === "help") {
      handle();
      
    }

  }, [transcript]); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          axios
            .post("http://localhost:8000/sent", { latitude, longitude })
            .then((res) => {
              console.log(res.data); // Update state or handle response
            })
            .catch((e) => {
              console.log(e);
            });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [send]);

  return (
    <>
      <div className="h-auto md:h-screen w-screen bg-colors flex flex-col md:flex-row items-center justify-center md:items-end md:justify-end bg-cover">
        <div className="md:h-4/5 rounded-3xl flex-col justify-center rounded-br-none p-8 md:p-20 bg-gradient-to-b from-cream to-creame">
          <h1 className="hidden md:block text-red-600 font-custom text-4xl md:text-7xl">
            Immediate Assistance
          </h1>

          <div className="grid justify-self-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 pt-10 md:pt-20">
            <Card
              imageSrc="https://tse2.mm.bing.net/th?id=OIG1.d4kAWYwZ1ckltgrDzWri&pid=ImgGn"
              title="Alert"
              subtitle="Send message"
              ondip={handle}
            />
          </div>
        </div>
        <img src={women} alt="Women" className="hidden md:block h-1/3 md:h-full w-full md:w-auto" />
      </div>

    </>
  );
}

export default Home;
