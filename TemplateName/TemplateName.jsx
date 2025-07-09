import React, { useEffect, useState } from 'react'

export default function TemplateName() {
    
    const [first, setfirst] = useState(second)

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
