import React, { useState, useRef, useEffect } from 'react';

export type NotificationType = 'error' | 'success' | 'info' | 'warning';

interface NotificationProps {
  message?: string | null;
  type?: NotificationType;
}

const Notification = ({ message: msg, type = 'success' }: NotificationProps) => {
  const [show, setShow] = useState(msg ? true : false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (msg) {
      setShow(true);
      timeoutRef.current = setTimeout(() => {
        setShow(false);
      }, 2000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [msg, type]);

  const color = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-700',
  }[type];

  return (
    <>
      {show && msg && (
        <div className="notification fixed top-4 w-full grid place-items-center">
          <div className={`max-w-md w-full ${color} p-4 text-semibold`}>{msg}</div>
        </div>
      )}
    </>
  );
};

export const errorNotification = (message: string) => <Notification message={message} type="error" />;
export const successNotification = (message: string) => <Notification message={message} type="success" />;
export const infoNotification = (message: string) => <Notification message={message} type="info" />;
export const warningNotification = (message: string) => <Notification message={message} type="warning" />;

export default Notification;
