import { useState, useEffect, useRef, useCallback } from 'react'

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
// Other Custom Hooks:
export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getItems = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setItems(data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getItems();
  }, [url, getItems]);
  return { loading, items };
};