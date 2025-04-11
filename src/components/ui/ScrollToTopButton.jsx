import { useEffect, useState } from 'react';
import Button from './Button.jsx';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
      }}
    >
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        variant="filled"
        color="#222"
        size="lg"
        aria-label="Scroll to top"
        style={{
          borderRadius: '50%',
          padding: '0.9rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
        }}
      >
        ⬆️
      </Button>
    </div>
  );
}

export default ScrollToTopButton;
