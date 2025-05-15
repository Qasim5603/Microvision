import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  MessageSquare,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  X,
  MessageSquareText,
} from "lucide-react";

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
};

interface VideoConsultationProps {
  sessionId: string;
  participantName: string;
  otherParticipants: { id: string; name: string; role: string }[];
  onEndCall: () => void;
}

export default function VideoConsultation({
  sessionId,
  participantName,
  otherParticipants,
  onEndCall,
}: VideoConsultationProps) {
  const { toast } = useToast();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  // Format elapsed time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Simulate connected participants
  useEffect(() => {
    // Start timer
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    // Mock initial messages
    setMessages([
      {
        id: "1",
        sender: otherParticipants[0]?.name || "Dr. Johnson",
        text: "Hello, let's discuss your histopathology results.",
        timestamp: new Date(Date.now() - 60000),
      },
    ]);

    // Cleanup
    return () => {
      clearInterval(timer);
    };
  }, []);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    toast({
      title: isCameraOn ? "Camera turned off" : "Camera turned on",
      description: isCameraOn
        ? "Your camera has been disabled"
        : "Your camera is now active",
    });
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast({
      title: isMicOn ? "Microphone muted" : "Microphone unmuted",
      description: isMicOn
        ? "Your microphone has been muted"
        : "Your microphone is now active",
    });
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? "Screen sharing stopped" : "Screen sharing started",
      description: isScreenSharing
        ? "You've stopped sharing your screen"
        : "You're now sharing your screen",
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? "Audio disabled" : "Audio enabled",
      description: isAudioEnabled
        ? "Speaker audio has been disabled"
        : "Speaker audio is now enabled",
    });
  };

  const handleEndCall = () => {
    // Here you would implement actual logic to end the call
    toast({
      title: "Call ended",
      description: "You have ended the video consultation",
    });
    onEndCall();
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      sender: participantName,
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");

    // Here you would send the message to other participants
  };

  return (
    <div className="bg-neutral-900 text-white min-h-[80vh] flex flex-col w-full relative overflow-hidden rounded-lg">
      {/* Video Grid */}
      <div className="flex-grow grid grid-cols-3 grid-rows-2 gap-2 p-2 h-full">
        {/* Main video - Your view */}
        <div
          className={`col-span-2 row-span-2 bg-neutral-800 rounded relative ${
            !isCameraOn && "flex items-center justify-center"
          }`}
        >
          {isCameraOn ? (
            <img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
              alt="Your camera view"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="text-neutral-500 font-medium">Camera is turned off</div>
          )}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded">
            {participantName} (You)
            {!isMicOn && <MicOff className="h-4 w-4 ml-2 inline" />}
          </div>
        </div>

        {/* Participant videos */}
        {otherParticipants.map((participant, index) => (
          <div key={participant.id} className="bg-neutral-800 rounded relative">
            <img
              src={`https://images.unsplash.com/photo-${
                index === 0
                  ? "1551076805-e1869033e561"
                  : "1622253692010-333f2da6031d"
              }?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80`}
              alt={`${participant.name}'s camera view`}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              {participant.name}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-neutral-950 p-4 flex justify-between items-center">
        <div className="text-neutral-300 text-sm">
          <Badge variant="outline" className="bg-primary-800 text-white border-primary-700">
            Session: {sessionId}
          </Badge>
          <span className="ml-3 text-neutral-400">{formatTime(elapsedTime)}</span>
        </div>

        <div className="flex space-x-3">
          {/* Camera toggle */}
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isCameraOn ? "bg-neutral-700 hover:bg-neutral-600" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={toggleCamera}
          >
            {isCameraOn ? (
              <Camera className="h-5 w-5" />
            ) : (
              <CameraOff className="h-5 w-5" />
            )}
          </Button>

          {/* Microphone toggle */}
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isMicOn ? "bg-neutral-700 hover:bg-neutral-600" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={toggleMic}
          >
            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          {/* Screen sharing */}
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isScreenSharing ? "bg-primary" : "bg-neutral-700 hover:bg-neutral-600"
            }`}
            onClick={toggleScreenShare}
          >
            <MonitorUp className="h-5 w-5" />
          </Button>

          {/* Toggle chat */}
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isChatOpen ? "bg-primary" : "bg-neutral-700 hover:bg-neutral-600"
            }`}
            onClick={toggleChat}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Toggle fullscreen */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-neutral-700 hover:bg-neutral-600"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>

          {/* Toggle audio */}
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isAudioEnabled ? "bg-neutral-700 hover:bg-neutral-600" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={toggleAudio}
          >
            {isAudioEnabled ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </Button>

          {/* End call */}
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full bg-red-600 hover:bg-red-700"
            onClick={handleEndCall}
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        <div>
          <Button
            variant="outline"
            className="border-neutral-600 text-white hover:bg-neutral-700"
          >
            View Slides
          </Button>
        </div>
      </div>

      {/* Chat panel */}
      {isChatOpen && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-neutral-800 border-l border-neutral-700 flex flex-col h-full">
          <div className="p-4 border-b border-neutral-700 flex justify-between items-center">
            <h3 className="font-medium">Chat</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-neutral-700"
              onClick={toggleChat}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === participantName
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === participantName
                      ? "bg-primary text-white"
                      : "bg-neutral-700 text-white"
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-neutral-400 mt-1 flex items-center">
                  <span className="font-medium mr-1">{message.sender}</span>
                  <span>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-neutral-700">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow bg-neutral-700 border-none text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                className="rounded-l-none"
                onClick={sendMessage}
                disabled={newMessage.trim() === ""}
              >
                <MessageSquareText className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
