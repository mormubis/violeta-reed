import { useEffect, useRef } from 'react';

type EventListener = (eventName: string, callback: Handler) => void;
type Handler = (...argv: unknown[]) => void;

function useEventListener(
  eventName: string,
  handler: Handler,
  element: { addEventListener: EventListener; removeEventListener: EventListener } = globalThis,
) {
  const handlerRef = useRef<Handler>();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const eventListener = (...argv: unknown[]) => handlerRef.current?.(...argv);

      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element], // Re-run if eventName or element changes
  );
}

export default useEventListener;
