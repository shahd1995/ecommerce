import React, { useEffect, useState } from 'react'

export default function TemplateName() {
    
    const [first, setfirst] = useState(0)

    useEffect(() => {
      first
    
      return () => {
        second
      }
    }, [third])
    
  return (
    <div>TemplateName</div>
  )
}
