import React, { useState } from 'react';

import { Grid, Title, Button, Divider, Paper, Text } from '@mantine/core';

import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts';
import Attribute from '../components/Attribute';
import Class from '../components/Class';
import Skill from '../components/Skill';
import { AlertComponent } from '../components/Alert/AlertComponent';

const STATUS = {
  ERROR: 'error',
  SUCCESS: 'success',
};

const Character = ({ id, character, onSave }) => {
  // Alert Config
  const [alertErrorStatus, setAlertErrorStatus] = useState(false);
  const [alertSuccessStatus, setAlertSuccessStatus] = useState(false);
  const [alertStatusMsg, setAlertStatusMsg] = useState('');

  // Attributes Config
  let attr = character?.attributes
    ? character.attributes
    : {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      };

  const [attributes, setAttributes] = useState(attr);

  const totalAttributePoints = () =>
    Object.values(attributes).reduce((acc, val) => acc + val, 0);

  const handleIncrementAttribute = (attr) => {
    if (totalAttributePoints() < 70) {
      setAttributes((prev) => ({
        ...prev,
        [attr]: prev[attr] + 1,
      }));
    } else {
      setAlertErrorStatus(true);
      setAlertStatusMsg(
        'Over 70, please, decrease one before they can increase another'
      );
    }
  };

  const handleDecremenAttribute = (attr) => {
    if (attributes[attr] > 0) {
      setAttributes({ ...attributes, [attr]: attributes[attr] - 1 });
    }
  };

  // Classes Config
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (selectedClass) => {
    setSelectedClass(selectedClass);
  };

  const meetsClassRequirements = (className) => {
    const requirements = CLASS_LIST[className];
    return ATTRIBUTE_LIST.every(
      (attr) => attributes[attr] >= requirements[attr]
    );
  };

  // Skills Config
  let skillsData = character?.skills
    ? character.skills
    : SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {});

  const [skills, setSkills] = useState(skillsData);

  const calculateModifier = (attrValue) => Math.floor((attrValue - 10) / 2);

  const calculateMaxSkillPoints = () => {
    const intModifier = calculateModifier(attributes['Intelligence']);
    const maxModifierPoints = 4 * intModifier;
    return 10 + maxModifierPoints;
  };
  const [maxSkillPoints, setMaxSkillPoints] = useState(calculateMaxSkillPoints);
  const [pointsSpent, setPointsSpent] = useState(
    Object.values(skills).reduce((acc, val) => acc + val, 0)
  );

  const handleSkillChange = (skill, change) => {
    setMaxSkillPoints(calculateMaxSkillPoints());

    const tempPoints = pointsSpent + change;
    if (tempPoints <= maxSkillPoints) {
      setSkills((prev) => ({
        ...prev,
        [skill]: prev[skill] + change,
      }));
      setPointsSpent(tempPoints);
      return;
    } else if (tempPoints > maxSkillPoints) {
      setAlertErrorStatus(true);
      setAlertStatusMsg(
        `Total skill points is ${pointsSpent}, please, decrease one before they can increase another`
      );
    }
  };

  const handleCharacterChange = (character) => {
    const data = {
      id: character.id,
      attributes: attributes,
      skills: skills,
    };
    onSave(data);
  };
  return (
    <>
      {alertErrorStatus && (
        <AlertComponent
          message={alertStatusMsg}
          title='Alert'
          handleAlertShow={setAlertErrorStatus}
          action={STATUS.ERROR}
        />
      )}
      {alertSuccessStatus && (
        <AlertComponent
          message={alertStatusMsg}
          title='Alert'
          handleAlertShow={setAlertSuccessStatus}
          action={STATUS.SUCCESS}
        />
      )}

      <Paper shadow='md' withBorder p='xl'>
        <Grid justify='center' align='stretch'>
          <Grid.Col span={3}>
            <Title>User {character?.id}</Title>
            <Button onClick={() => handleCharacterChange(character)}>
              Save Character
            </Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Divider label='Attributes' labelPosition='left' />
            {ATTRIBUTE_LIST.map((attr) => (
              <Attribute
                key={attr}
                name={attr}
                value={attributes[attr]}
                modifier={calculateModifier(attributes[attr])}
                onIncrement={() => handleIncrementAttribute(attr)}
                onDecrement={() => handleDecremenAttribute(attr)}
              />
            ))}

            <Divider label='Classes' labelPosition='left' />
            {Object.keys(CLASS_LIST).map((cls) => (
              <Class
                key={cls}
                name={cls}
                requirements={CLASS_LIST[cls]}
                isEligible={meetsClassRequirements(cls)}
                onClick={handleClassClick}
              />
            ))}

            {selectedClass && (
              <div>
                <Divider
                  variant='dashed'
                  label={`${selectedClass} Requirements`}
                  labelPosition='center'
                />
                {ATTRIBUTE_LIST.map((attr) => (
                  <p key={attr}>
                    {attr}: {CLASS_LIST[selectedClass][attr]}
                  </p>
                ))}
              </div>
            )}
          </Grid.Col>
          <Grid.Col span={5}>
            <Title>Skills</Title>
            <Text>Max Skill Points {maxSkillPoints}</Text>
            <Text>Total Points Spent {pointsSpent}</Text>

            {attributes &&
              SKILL_LIST.map((skill) => (
                <Skill
                  key={skill.name}
                  name={skill.name}
                  points={skills[skill.name]}
                  attributeModifier={skill.attributeModifier}
                  total={
                    skills[skill.name] +
                    calculateModifier(attributes[skill.attributeModifier])
                  }
                  onIncrement={() => handleSkillChange(skill.name, 1)}
                  onDecrement={() => handleSkillChange(skill.name, -1)}
                />
              ))}
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default Character;
