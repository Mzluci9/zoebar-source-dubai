import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const WEBSITE_CONTEXT = `You are an AI assistant for Zoebar Business Group, a Dubai-based company. Here's everything about the company:

COMPANY OVERVIEW:
Zoebar Business Group operates from Dubai and specializes in four main areas:

1. ETHIOPIAN GREEN COFFEE:
- Consistent, traceable Ethiopian green coffee for GCC specialty roasters
- Reliable origin sourcing with quality consistency every shipment
- Transparent traceability from farm to port
- Tailored for small and medium roasters in the UAE and Saudi Arabia
- Professional communication and responsive support
- Full origin documentation provided
- Specialty grade beans for discerning roasters
- Flexible volumes to match roaster needs

2. ORGANIC FRUITS & VEGETABLES:
- Fresh bananas, avocados, potatoes, tomatoes, and seasonal produce
- Harvested to order for maximum freshness
- Shipped within 1-2 weeks
- No synthetic pesticides or preservatives
- Organic certified produce
- Nutritionally superior quality
- Traceable from farm to table
- Support for sustainable agriculture

3. ECOMMERCE SOLUTIONS:
- Full-service online retail platform for premium Ethiopian products
- Beautiful, branded digital storefronts
- Secure payment processing with multiple payment options
- Global shipping and worldwide delivery network
- Real-time order tracking and shipment updates
- Direct-to-consumer sales channel
- Subscription and bulk ordering options
- Multi-currency and multi-language support
- Integrated inventory management

4. SOVEREIGN AI INFRASTRUCTURE:
- Sovereign-grade AI infrastructure company, NOT an AI services agency
- Built for enterprise, government, and regulated industries across UAE and GCC
- AI-native from architecture level — AI decisioning infrastructure, not chatbots or generic automation
- Unified enterprise data platforms and AI-native model lifecycle management
- Model governance, explainability, audit trails, and bias monitoring by design
- Real-time AI decisioning engines for enterprise-scale deployment
- Secure API orchestration — API-first and modular (WSO2, Kong, Apigee, AWS, Azure)
- Cloud-agnostic deployment, UAE sovereign cloud compatible
- Zero-trust security and data localization compliance
- Financial services risk and compliance AI
- Smart city intelligence systems and public-sector AI modernization
- Climate and sustainability risk modeling
- Arabic-first AI modeling capability
- Built specifically for GCC regulatory frameworks
- Responsible AI framework with bias monitoring and explainability by design

CONTACT INFORMATION:
- Based in Dubai, UAE
- Serving customers globally
- Contact page available on website for inquiries
- Professional support team ready to assist

YOUR ROLE:
- Answer questions about products and services
- Help customers understand pricing and availability
- Guide them to appropriate contact methods
- Provide detailed information about any of the four business areas
- Be helpful, professional, and knowledgeable
- Direct users to the contact page for specific quotes or bookings`;

const ChatInterface = () => {
  // Initialize with empty messages - will be cleared on every reload
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm here to help you with information about Zoebar Business Group's Ethiopian green coffee, organic produce, eCommerce solutions, and sovereign AI infrastructure. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: Message) => {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        toast({
          title: "Configuration Error",
          description: "OpenAI API key is not configured.",
          variant: "destructive",
        });
        return;
      }

      // Prepare messages with system context
      const messagesToSend = [
        { role: "system", content: WEBSITE_CONTEXT },
        ...messages.filter(m => m.role !== "system"),
        userMessage
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messagesToSend,
          stream: true,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate Limit",
            description: "Too many requests. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        if (response.status === 401) {
          toast({
            title: "Authentication Error",
            description: "Invalid API key. Please check configuration.",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to start stream");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantContent;
                return newMessages;
              });
            }
          } catch (e) {
            // Skip malformed JSON
            continue;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-2xl shadow-large overflow-hidden border border-border">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="h-6 w-6" />
          AI Support Assistant
        </h3>
        <p className="text-sm text-primary-foreground/80 mt-1">
          Ask me anything about our products and services
        </p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="self-end"
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
