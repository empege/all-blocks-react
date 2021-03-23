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

  const getProducts = useCallback(async () => {
    const response = await fetch(url);
    const products = await response.json();
    setItems(products);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getProducts();
  }, [url, getProducts]);
  return { loading, items };
};