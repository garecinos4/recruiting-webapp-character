import { IconCheck } from '@tabler/icons-react';
import { rem, Notification } from '@mantine/core';
import { useEffect } from 'react';

export const SuccessAlertComponent = ({ title, message, handleAlertShow }) => {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAlertShow(false);
    }, 3600);

    return () => clearTimeout(timer);
  }, [handleAlertShow]);

  return (
    <Notification
      withBorder
      icon={checkIcon}
      color='teal'
      title={title}
      mt='md'
      onClose={() => handleAlertShow(false)}
    >
      {message}
    </Notification>
  );
};
