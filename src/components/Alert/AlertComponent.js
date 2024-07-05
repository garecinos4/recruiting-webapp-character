import React from 'react';
import { SuccessAlertComponent } from './SuccessAlert';
import { FailureAlertComponent } from './FailureAlert';
import { Affix } from '@mantine/core';

const actions = {
  success: SuccessAlertComponent,
  error: FailureAlertComponent,
};

export function AlertComponent({ action, title, message, handleAlertShow }) {
  const ComponentToRender = actions[action];
  return (
    <Affix position={{ top: 60, right: 20 }}>
      <ComponentToRender
        title={title}
        message={message}
        handleAlertShow={handleAlertShow}
      />
    </Affix>
  );
}
