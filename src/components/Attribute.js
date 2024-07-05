import React from 'react';
import { ActionIcon, Text, Grid } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const Attribute = ({ name, value, onIncrement, onDecrement, modifier }) => (
  <Grid>
    <Grid.Col span={4}>
      {' '}
      <Text size='md'>
        {name}: {value}
      </Text>
    </Grid.Col>
    <Grid.Col span={4}>
      {' '}
      <Text size='sm'>Intelligence Modifier: {modifier}</Text>
    </Grid.Col>
    <Grid.Col span={4}>
      {' '}
      <ActionIcon
        variant='outline'
        color='indigo'
        radius='lg'
        aria-label='Decress'
        onClick={() => onDecrement(name)}
      >
        <IconMinus style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        variant='outline'
        color='indigo'
        radius='lg'
        aria-label='Incress'
        onClick={() => onIncrement(name)}
      >
        <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Grid.Col>
  </Grid>
);

export default Attribute;
