"use client"
import React, { useEffect } from 'react'

const page = () => {
  useEffect(() => {
    window.location.href = 'https://www.heartofceylon.com';
  }, []);

  return (
    <div>
      Redirecting to Heart of Ceylon...
    </div>
  )
}

export default page
