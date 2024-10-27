'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { SignedOut, SignedIn, UserButton, useUser } from '@clerk/nextjs';
import CustomSidebar from '../components/Sidebar';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


import {
  Button,
} from "@/components/ui/button";

export default function Support() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi ${user?.firstName || 'there'}! I'm your personal financial advisor ready to help you make smart financial decisions and achieve a SmartBudget.`,
    },
  ]);

  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return; // Don't send empty messages
    setIsLoading(true);

    // Set initial state for user and assistant messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' }, // Placeholder for the assistant's response
    ]);

    setUserMessage('');

    try {
      // Fetch the response from your API route
      const response = await fetch('/api/chatAssistance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: userMessage }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Read the streamed response from the API
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = ''; // Temporary buffer for the assistant's message

      while (true) {
        const { done, value } = await reader.read();
        if (done) break; // Exit the loop when done

        // Decode and append the partial response to the buffer
        assistantMessage += decoder.decode(value, { stream: true });

        // Temporarily store the message without updating state for each chunk
        setMessages((prevMessages) => {
          const otherMessages = prevMessages.slice(0, prevMessages.length - 1); // All messages except the last one
          return [
            ...otherMessages,
            { role: 'assistant', content: assistantMessage }, // Update only the last message
          ];
        });
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <h1 className="text-lg font-semibold md:text-2xl">Your Fitness and Mental Health Coach</h1>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className="p-3 text-white rounded-lg text-lg mb-5"
                    style={{
                      backgroundColor: message.role === 'assistant' ? 'gray' : 'black',
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="sticky bottom-0 bg-muted/50 p-4">
              <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                  <Button type="button" size="sm" className="ml-auto gap-1.5" onClick={sendMessage}>
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
