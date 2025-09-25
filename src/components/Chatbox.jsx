import React, { useState, useRef, useEffect, forwardRef } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

// --- CÁC THÀNH PHẦN PHỤ THUỘC ĐƯỢC TÍCH HỢP TRỰC TIẾP VÀO FILE ---

// Helper function để nối class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Các Component UI (trước đây nằm trong ui.jsx) ---
const Button = forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-red-600 text-white shadow hover:bg-red-700",
    ghost: "hover:bg-white/20",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    icon: "h-9 w-9",
  };
  return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
});
Button.displayName = 'Button';

const Card = forwardRef((props, ref) => <div ref={ref} className={cn("bg-white rounded-lg", props.className)} {...props} />);
Card.displayName = 'Card';

const CardHeader = forwardRef((props, ref) => <div ref={ref} className={cn("p-3", props.className)} {...props} />);
CardHeader.displayName = 'CardHeader';

const Input = forwardRef((props, ref) => <input ref={ref} className={cn("flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500", props.className)} {...props} />);
Input.displayName = 'Input';


// --- Custom Hook (trước đây nằm trong useChatApi.js) ---
function useChatApi() {
  const [isTyping, setIsTyping] = useState(false);
  const sendMessage = async (message) => {
    setIsTyping(true);
    const API_URL = "https://seo-flask-api.azurewebsites.net/ask_gemini_hcm";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return {
        id: Date.now().toString(),
        content: data.answer || "Lỗi: Không nhận được phản hồi.",
        role: "assistant",
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("API Error:", error);
      return {
        id: Date.now().toString(),
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.",
        role: "assistant",
        timestamp: new Date(),
      };
    } finally {
      setIsTyping(false);
    }
  };
  return { sendMessage, isTyping };
}


// --- COMPONENT CHATBOX CHÍNH ---
const quickReplies = [
  { id: "1", text: "Quan điểm của Bác Hồ", message: "Quan điểm của Chủ tịch Hồ Chí Minh về tham nhũng là gì?" },
  { id: "2", text: "Hậu quả tham nhũng", message: "Hậu quả của tham nhũng là gì?" },
  { id: "3", text: "Giải pháp", message: "Các giải pháp chống tham nhũng theo tư tưởng Hồ Chí Minh là gì?" },
  { id: "4", text: "Vai trò nhân dân", message: "Nhân dân có vai trò gì trong công cuộc phòng, chống tham nhũng?" }
];

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [unreadCount, setUnreadCount] = useState(1);

  const { sendMessage, isTyping } = useChatApi();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{
      id: "welcome",
      content: "Xin chào! 👋 Tôi là Trợ lý AI, sẵn sàng giải đáp các thắc mắc về phòng, chống tham nhũng theo tư tưởng Hồ Chí Minh.",
      role: "assistant",
      timestamp: new Date(),
    }]);
  }, []);

  useEffect(() => { if (isOpen) setUnreadCount(0); }, [isOpen]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSendMessage = async (text) => {
    const content = text || inputMessage;
    if (!content.trim()) return;

    const userMsg = { id: Date.now().toString(), content, role: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setShowQuickReplies(false);

    const botMsg = await sendMessage(content);
    setMessages((prev) => [...prev, botMsg]);
    if (!isOpen) setUnreadCount((c) => c + 1);
  };

  const clearChat = () => {
    setMessages((prev) => prev.slice(0, 1));
    setShowQuickReplies(true);
  };

  const formatTime = (date) => date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button onClick={() => setIsOpen(true)} size="icon" className="w-16 h-16 rounded-full bg-[#CB0118] text-white shadow-lg animate-bounce hover:shadow-xl hover:scale-105 transition-all duration-300 relative">
            <MessageCircle className="w-8 h-8" />
          </Button>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-xs text-white font-bold">{unreadCount > 9 ? "9+" : unreadCount}</span>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm">
          <Card className="shadow-2xl border-0 overflow-hidden flex flex-col h-[60vh] max-h-[700px]">
            <CardHeader className="bg-[#CB0118] text-white p-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Bot className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-semibold text-base">Trợ lý AI</h3>
                    <p className="text-xs opacity-80">Đang hoạt động</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="text-white w-8 h-8" onClick={clearChat}><Trash2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-white w-8 h-8" onClick={() => setIsMinimized(!isMinimized)}><Minimize2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-white w-8 h-8" onClick={() => setIsOpen(false)}><X className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`prose prose-sm max-w-[85%] rounded-lg p-3 ${msg.role === "user" ? "bg-[#CB0118] text-white" : "bg-white border shadow-sm"}`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        <div className={`text-xs mt-2 text-right ${msg.role === "user" ? "text-white/70" : "text-gray-400"}`}>{formatTime(msg.timestamp)}</div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start"><div className="bg-white border rounded-lg p-3 shadow-sm"><div className="flex items-center space-x-2"><Bot className="w-4 h-4 text-red-500" /><div className="flex space-x-1"><div className="w-2 h-2 bg-[#CB0118] rounded-full animate-bounce"></div><div className="w-2 h-2 bg-[#CB0118] rounded-full animate-bounce delay-75"></div><div className="w-2 h-2 bg-[#CB0118] rounded-full animate-bounce delay-150"></div></div></div></div></div>
                  )}
                  {showQuickReplies && messages.length <= 1 && (
                    <div className="space-y-2 pt-4">
                      <p className="text-xs text-gray-500 text-center">Câu hỏi gợi ý:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickReplies.map((qr) => (
                          <Button key={qr.id} variant="outline" size="sm" onClick={() => handleSendMessage(qr.message)} className="h-auto py-2 px-3 text-xs">
                            {qr.text}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t bg-white flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Nhập câu hỏi của bạn..." className="flex-1" />
                    <Button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() || isTyping} size="icon" className="bg-[#CB0118] text-white w-9 h-9 flex-shrink-0">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

