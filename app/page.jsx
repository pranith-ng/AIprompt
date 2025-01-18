'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/Conversation?number=0')
  }, [])
  return (
    <div></div>
  )
}

export default Page