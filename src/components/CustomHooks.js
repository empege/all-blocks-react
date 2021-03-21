import React, { useState, useEffect, useRef } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize;
}
export const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current;
}