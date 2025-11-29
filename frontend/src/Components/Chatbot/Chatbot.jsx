import { useEffect, useRef, useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to our store. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Log to verify component is mounted
  useEffect(() => {
    console.log('Chatbot component loaded');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'Show products',
    'Track order',
    'Return policy',
    'Contact support'
  ];

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return 'Hello! How can I assist you with your shopping today? 😊';
    }
    
    if (message.includes('product') || message.includes('show') || message.includes('items')) {
      return 'You can browse our products by category: Men\'s, Women\'s, and Kids\' fashion. Check out our new collections and popular items on the homepage!';
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return 'Our products range from $50 to $150. We have great deals and discounts available. Would you like to see our latest offers?';
    }
    
    if (message.includes('order') || message.includes('track')) {
      return 'To track your order, please log in to your account and visit the "My Orders" section. You can see the current status and expected delivery date there.';
    }
    
    if (message.includes('return') || message.includes('refund')) {
      return 'We offer a 30-day return policy on all items. Products must be unused and in original packaging. Would you like more details about the return process?';
    }
    
    if (message.includes('shipping') || message.includes('delivery')) {
      return 'We offer free shipping on orders over $100. Standard delivery takes 3-5 business days. Express shipping is also available!';
    }
    
    if (message.includes('payment') || message.includes('pay')) {
      return 'We accept all major credit cards, debit cards, and PayPal. All payments are secure and encrypted. 🔒';
    }
    
    if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return 'You can reach our support team at support@ecommerce.com or call us at 1-800-SHOP-NOW. We\'re here Monday-Friday, 9 AM - 6 PM EST.';
    }
    
    if (message.includes('cart') || message.includes('checkout')) {
      return 'To complete your purchase, add items to your cart and click the cart icon at the top. Then proceed to checkout to enter your shipping details.';
    }
    
    if (message.includes('discount') || message.includes('coupon') || message.includes('sale')) {
      return 'Check out our New Collections for the latest deals! Sign up for our newsletter to receive exclusive discount codes. 🎉';
    }
    
    if (message.includes('size') || message.includes('fit')) {
      return 'Each product page has a detailed size guide. You can also check customer reviews for fit information. Need help with a specific item?';
    }
    
    if (message.includes('account') || message.includes('login') || message.includes('signup')) {
      return 'Click the "Login" button at the top of the page to sign in or create a new account. Creating an account allows you to track orders and save favorites!';
    }
    
    if (message.includes('thank')) {
      return 'You\'re welcome! Happy shopping! 🛍️ Is there anything else I can help you with?';
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return 'Thank you for chatting with me! Have a great day and happy shopping! 👋';
    }
    
    return 'I\'m here to help! You can ask me about products, orders, shipping, returns, or any other questions. What would you like to know?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputValue),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            <circle cx="12" cy="10" r="1"/>
            <circle cx="8" cy="10" r="1"/>
            <circle cx="16" cy="10" r="1"/>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>💬 Shopping Assistant</h3>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-bubble">{message.text}</div>
                <div className="message-time">{message.time}</div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="chatbot-send"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
