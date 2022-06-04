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
    console.log('change handler');
    handlerRef.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const eventListener = (...argv: unknown[]) => handlerRef.current?.(...argv);

      console.log('addListener', eventListener);
      element.addEventListener(eventName, eventListener);

      return () => {
        console.log('removeListener', eventListener);

        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element], // Re-run if eventName or element changes
  );
}

export default useEventListener;
