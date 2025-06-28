import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Bot,
  User,
  Heart,
  Brain,
  Bone,
  Eye,
  Stethoscope,
} from "lucide-react";

const DoctorAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content:
        "Hi there! I'm your health assistant. Just tell me what you're feeling, and I'll do my best to guide you.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const specialties = [
    { name: "Cardiology", icon: Heart, color: "text-red-600 bg-red-100" },
    { name: "Neurology", icon: Brain, color: "text-purple-600 bg-purple-100" },
    { name: "Orthopedics", icon: Bone, color: "text-blue-600 bg-blue-100" },
    { name: "Eye Care", icon: Eye, color: "text-green-600 bg-green-100" },
    {
      name: "General Medicine",
      icon: Stethoscope,
      color: "text-orange-600 bg-orange-100",
    },
  ];

  const quickQuestions = [
    "I've had a headache for days",
    "I'm feeling chest tightness",
    "I can't sleep well",
    "I'm always tired",
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        content: getAIReply(newMessage),
        timestamp: new Date().toLocaleTimeString(),
        rec: {
          specialist: "To be suggested",
          urgency: "TBD",
          suggestions: ["Stay hydrated"],
        },
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);
  };

  const getAIReply = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes("headache")) {
      return "Headaches can be caused by stress, dehydration, or eye strain. Try resting and drinking water. If it keeps up, a GP visit is a good idea.";
    }
    if (m.includes("chest") && m.includes("pain")) {
      return "Chest pain shouldn't be ignored. If it's sharp, tight, or you feel breathless, seek medical help right away.";
    }
    return "Thanks for sharing that. Let me think… maybe some rest, fluids, or talking to a doctor if it doesn’t get better.";
  };

  const handleQuickQuestion = (q) => {
    setNewMessage(q);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold mb-2">Health Chat Assistant</h1>
      <p className="text-gray-600 mb-8">
        Ask about symptoms or get quick advice.
      </p>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 text-blue-600" /> Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}>
                    <div className="flex items-start space-x-2">
                      {msg.sender === "ai" ? (
                        <Bot className="mt-1 text-blue-600" />
                      ) : (
                        <User className="mt-1" />
                      )}
                      <div>
                        <p className="text-sm">{msg.content}</p>
                        {msg.rec && (
                          <div className="mt-2 p-2 bg-blue-50 rounded border">
                            <p>
                              <strong>Specialist:</strong> {msg.rec.specialist}
                            </p>
                            <p>
                              <strong>Urgency:</strong> {msg.rec.urgency}
                            </p>
                            <ul className="list-disc ml-5 mt-1">
                              {msg.rec.suggestions.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="text-xs mt-1 opacity-70">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Describe how you're feeling…"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white">
                  <Send />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full p-2 text-left border rounded hover:bg-gray-50">
                  {q}
                </button>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Specialties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {specialties.map((sp, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                  <div
                    className={`w-8 h-8 rounded ${sp.color} flex items-center justify-center`}>
                    <sp.icon className="h-4 w-4" />
                  </div>
                  <span>{sp.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-1">Disclaimer</h4>
              <p className="text-sm">
                This is just general advice. Please see a doctor for real
                diagnosis and treatment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorAI;