import React from 'react';
import { Group, Button, Text } from '@mantine/core';

const Skill = ({ name, points, attributeModifier, total, onIncrement, onDecrement }) => (
  <Group position="apart" style={{ marginBottom: 10 }}>
    <Button onClick={() => onDecrement(name)} size="xs">-</Button>
    <Text>{name} - points: {points}</Text>
    <Text>modifier ({attributeModifier}): {total - points}</Text>
    <Text>total: {total}</Text>
    <Button onClick={() => onIncrement(name)} size="xs">+</Button>
  </Group>
);

export default Skill;