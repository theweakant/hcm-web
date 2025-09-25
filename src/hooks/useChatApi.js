import { useState } from "react"

/**
 * Custom hook để quản lý việc gọi API cho chatbot.
 */
export default function useChatApi() {
  const [isTyping, setIsTyping] = useState(false);

  /**
   * Gửi tin nhắn đến API backend và nhận phản hồi.
   * @param {string} message - Nội dung tin nhắn của người dùng.
   * @returns {Promise<object>} - Một object chứa nội dung phản hồi từ bot.
   */
  const sendMessage = async (message) => {
    try {
      setIsTyping(true);
      
      // --- !!! QUAN TRỌNG: Thay thế URL này bằng API endpoint thật của bạn ---
      const API_URL = "https://seo-flask-api.azurewebsites.net/ask_gemini_hcm";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
        }),
      });

      if (!response.ok) {
          throw new Error(`Lỗi API: ${response.statusText}`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now().toString(),
        content: data.answer || "Không nhận được nội dung hợp lệ từ server.",
        role: "assistant",
        timestamp: new Date(),
      };

      return botMessage;

    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      return {
        id: Date.now().toString(),
        content: "Xin lỗi, đã có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại sau!",
        role: "assistant",
        timestamp: new Date(),
      };
    } finally {
        setIsTyping(false);
    }
  };

  return { sendMessage, isTyping };
}

