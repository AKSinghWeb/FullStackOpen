const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="message">{message}</div>;
};

const NotificationError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export { NotificationError, Notification };
