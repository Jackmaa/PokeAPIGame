import React, { createContext, useContext, useState } from 'react';
import RouteTransition from './RouteTransition';

const TransitionContext = createContext();

export const useRouteTransition = () => useContext(TransitionContext);

export function TransitionManager({ children }) {
  const [transition, setTransition] = useState(null);

  const triggerTransition = (
    color = 'transparent',
    onComplete = () => {},
    mode = 'out'
  ) => {
    setTransition({ color, onComplete, mode });
  };

  const handleComplete = () => {
    transition?.onComplete?.();
    setTransition(null);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {transition && (
        <RouteTransition
          typeColor={transition.color}
          mode={transition.mode}
          onComplete={handleComplete}
        />
      )}
    </TransitionContext.Provider>
  );
}
