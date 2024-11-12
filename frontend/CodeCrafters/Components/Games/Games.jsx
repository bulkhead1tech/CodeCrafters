import React from "react";
import Card from "./Card";
import { useState, useEffect, useRef } from "react";
function Games() {
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isvRecording, setIsvRecording] = useState(false);
  const audioChunksRef = useRef([]);
  const videoRecorderRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("");
  const videoChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const [send, setsend] = useState(null);
  const handle = () => {
    setsend(!send);
  };
  const initMediaRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunksRef.current = [];
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recorded_audio.webm";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      mediaRecorderRef.current = recorder;
    } catch (error) {
      console.error("Error initializing media recorder:", error);
    }
  };
  const initVideoRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio:true });
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        const videoBlob = new Blob(videoChunksRef.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
        videoChunksRef.current = [];
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recorded_video.webm";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      videoRecorderRef.current = recorder;
    } catch (error) {
      console.error("Error initializing video recorder:", error);
    }
  };
  const sound = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped");
    } else {
      mediaRecorderRef.current.start();
      console.log("Recording started");
    }
    setIsRecording(!isRecording);
  };
  const video = () => {
    if (isvRecording) {
      videoRecorderRef.current.stop();
      console.log("Video recording stopped");
    } else {
      videoRecorderRef.current.start();
      console.log("Video recording started");
    }
    setIsvRecording(!isvRecording);
  };
  useEffect(() => {
    initMediaRecorder();
    initVideoRecorder();
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-cover flex-col bg-colors">
        <div className="h-48 w-screen  flex justify-center items-center">
          <h1 className="font-custom mt-16 text-white  text-9xl ">Services</h1>
        </div>
        <div className=" w-4/5  mt-12 grid grid-rows-1 mx-auto grid-cols-4 gap-x-5">
          <Card
            imageSrc="https://tse2.mm.bing.net/th?id=OIG1.d4kAWYwZ1ckltgrDzWri&pid=ImgGn"
            title="Share Live Location"
            subtitle="Send message"
            ondip={handle}
          />
          <Card
            imageSrc="https://tse2.mm.bing.net/th?id=OIG3.zJzIUmeFUHgvXhbQoMNf&pid=ImgGn"
            title="Sound"
            subtitle="Records Sound"
            ondip={sound}
          />
          <Card
            imageSrc="https://tse1.mm.bing.net/th?id=OIG3.D_Ym0_xT0TpYnk_xegdy&pid=ImgGn"
            title="Video"
            subtitle="Records Video"
            ondip={video}
          />
        </div>
      </div>
      <div className="h-screen w-screen bg-cover flex-col relative bg-colors z-10">
        <div className="h-48 w-screen  flex justify-center items-center">
          <h1 className="font-custom mt-16 text-white  text-9xl ">
            Early Access
          </h1>
        </div>
        <div className=" w-4/5 mt-12 grid grid-rows-1 mx-auto grid-cols-6 gap-x-5">
          <Card imageSrc="https://tse2.mm.bing.net/th?id=OIG3.W9VJEWHmUE6WHuTWXwO5&pid=ImgGn" title="Pawwz" subtitle="Call Dogs" />{" "}
          <Card imageSrc="https://tse2.mm.bing.net/th?id=OIG3.W9VJEWHmUE6WHuTWXwO5&pid=ImgGn" title="Pawwz" subtitle="Call Dogs" />
          <Card imageSrc="https://tse2.mm.bing.net/th?id=OIG3.W9VJEWHmUE6WHuTWXwO5&pid=ImgGn" title="Pawwz" subtitle="Call Dogs" />{" "}
          <Card imageSrc="https://tse2.mm.bing.net/th?id=OIG3.W9VJEWHmUE6WHuTWXwO5&pid=ImgGn" title="Pawwz" subtitle="Call Dogs" />
        </div>
      </div>
    </>
  );
}

export default Games;
