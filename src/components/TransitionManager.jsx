import React, { createContext, useContext, useState } from 'react';
import RouteTransition from './RouteTransition';
import { createPortal } from 'react-dom';

const TransitionContext = createContext();

export const useRouteTransition = () => useContext(TransitionContext);

export function TransitionManager({ children }) {
  const [transition, setTransition] = useState(null);

  const triggerTransition = (color = 'transparent', onComplete = () => {}) => {
    setTransition({ color, onComplete });
    document.body.classList.add('is-transitioning');
  };

  const handleComplete = () => {
    transition?.onComplete?.();
    setTransition(null);
    document.body.classList.remove('is-transitioning');
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {transition &&
        createPortal(
          <RouteTransition
            typeColor={transition.color}
            onComplete={handleComplete}
          />,
          document.body
        )}
    </TransitionContext.Provider>
  );
}
