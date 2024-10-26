'use client'
import { Box, Button, Stack, TextField, Typography, Link } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  

  if (error) return <div>{error.message}</div>;
  // user login and logut
  const router = useRouter();
 //  redirects the user to the home route if logged out
  

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi ${user.name}! I'm your personal fitness coach and mental health coach?`
    }
  ])

  const [message, setMessage] = useState('')
  // const { data: session, status } = useSession()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  
  const sendMessage = async () => {
    console.log(process.env.OPENAI_API_KEY);
    if (!message.trim()) return // Don't send empty messages
    setMessage('')
    setIsLoading(true)
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later."},
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }


  return (
    <div className="flex">
        <Sidebar />
        <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold">Mental Health and Fitness Support</h1>
        <p>Welcome to your dashboard! This is where you can manage your activities.</p>

        </main>
    </div>
  )}