'use client'
import React, { useState } from 'react';

type Category = {
  name: string;
  color: string;
}
type Skill = {
  title: string;
  competency: number;
  category: string[];
}
type SkillsType = {
  skills: Skill[];
  categories: Category[]
}

const CategoryButton = ({ handleClick, active, label }: { handleClick: Function, active: { [k: string]: boolean }, label: string }) => (
  <button
    className={`skillbutton ${active[label] ? 'skillbutton-active' : ''}`}
    type="button"
    onClick={() => handleClick(label)}
  >
    {label}
  </button>
);

const SkillBar = ({ data, categories }: { data: Skill; categories: Category[] }) => {
  const { category, competency, title } = data;

  // TODO: Consider averaging colors
  const titleStyle = {
    background: categories
      .filter((cat) => category.includes(cat.name))
      .map((cat) => cat.color)[0],
  };

  const barStyle = {
    ...titleStyle,
    width: `${String(Math.min(100, Math.max((competency / 5.0) * 100.0, 0)))}%`,
  };

  return (
    <div className="skillbar clearfix">
      <div className="skillbar-title" style={titleStyle}>
        <span>{title}</span>
      </div>
      <div className="skillbar-bar" style={barStyle} />
      <div className="skill-bar-percent">{competency} / 5</div>
    </div>
  );

};
const Skills = ({ skills, categories }: SkillsType) => {
  const initialButtons = Object.fromEntries(
    [['All', false]].concat(categories.map(({ name }) => [name, false])),
  );

  const [buttons, setButtons] = useState(initialButtons);

  const handleChildClick = (label: string) => {
    // Toggle button that was clicked. Turn all other buttons off.
    const newButtons = Object.keys(buttons).reduce(
      (obj, key) => ({
        ...obj,
        [key]: label === key && !buttons[key],
      }),
      {},
    );
    // Turn on 'All' button if other buttons are off
    newButtons.All = !Object.keys(buttons).some((key) => newButtons[key]);
    setButtons(newButtons);
  };

  const getRows = () => {
    // search for true active categories
    const actCat = Object.keys(buttons).reduce(
      (cat, key) => (buttons[key] ? key : cat),
      'All',
    );

    const comparator = (a, b) => {
      let ret = 0;
      if (a.competency > b.competency) ret = -1;
      else if (a.competency < b.competency) ret = 1;
      else if (a.category[0] > b.category[0]) ret = -1;
      else if (a.category[0] < b.category[0]) ret = 1;
      else if (a.title > b.title) ret = 1;
      else if (a.title < b.title) ret = -1;
      return ret;
    };

    return skills
      .sort(comparator)
      .filter((skill) => actCat === 'All' || skill.category.includes(actCat))
      .map((skill) => (
        <SkillBar categories={categories} data={skill} key={skill.title} />
      ));
  };

  const getButtons = () => Object.keys(buttons).map((key) => (
    <CategoryButton
      label={key}
      key={key}
      active={buttons}
      handleClick={handleChildClick}
    />
  ));

  return (
    <div className="skills">
      <div className="link-to" id="skills" />
      <div className="title">
        <h3>Skills</h3>
      </div>

      <p className='mb-2 text-center'>
        Note: I think these sections are silly, but everyone seems to have
        one. Here is a *mostly* honest overview of my skills.
      </p>
      <div className="skill-button-container link-container">{getButtons()}</div>
      <div className="skill-row-container">{getRows()}</div>
    </div>
  );
};

export default Skills;
