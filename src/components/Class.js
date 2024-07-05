import React from 'react';
import { Indicator, Text, Grid } from '@mantine/core';

const Class = ({ name, requirements, isEligible, onClick }) => (
  <Grid justify='flex-start' align='stretch'>
    <Grid.Col span={3} offset={3}>
      <Text size='lg' onClick={() => onClick(name)}>
        {name}
      </Text>
    </Grid.Col>
    <Grid.Col span={3}>
      <Indicator
        disabled={!isEligible}
        processing
        label='Eligible'
        color='green'
        size={15}
        position='middle-start'
      ></Indicator>
    </Grid.Col>
  </Grid>
);

export default Class;
