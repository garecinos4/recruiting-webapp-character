import { IconX } from '@tabler/icons-react';
import { rem, Notification } from '@mantine/core';
import { useEffect } from 'react';

export const FailureAlertComponent = ({ title, message, handleAlertShow }) => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAlertShow(false);
    }, 3600);

    return () => clearTimeout(timer);
  }, [handleAlertShow]);

  return (
    <Notification
      withBorder
      icon={xIcon}
      color='red'
      title={title}
      mt='md'
      onClose={() => handleAlertShow(false)}
    >
      {message}
    </Notification>
  );
};
