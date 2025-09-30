// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Wait for the layout to mount
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 50); // short delay ensures RootLayout is mounted

    return () => clearTimeout(timer);
  }, []);

  return null; // nothing to render
}