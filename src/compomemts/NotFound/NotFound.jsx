import React, { useEffect, useState } from 'react'

export default function NotFound() {
    
    const [first, setfirst] = useState(second)

    useEffect(() => {
      first
    
      return () => {
        second
      }
    }, [third])
    
  return (
    <div>NotFound</div>
  )
}
