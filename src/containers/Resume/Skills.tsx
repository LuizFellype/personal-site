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
  color?: string;
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

// Perceived brightness (YIQ, 0-255) of a hex color, used to pick a readable text color.
const isLightColor = (hex: string) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((ch) => ch + ch).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 150;
};

const SkillBar = ({ data, categories }: { data: Skill; categories: Category[] }) => {
  const { category, competency, title, color } = data;

  // Prefer the skill's own brand color; fall back to the color of its first category.
  const background = color
    ?? categories
      .filter((cat) => category.includes(cat.name))
      .map((cat) => cat.color)[0];

  const titleStyle = {
    background,
    color: background && isLightColor(background) ? '#1a1a1a' : '#fff',
  };

  const barStyle = {
    background,
    width: `${String(Math.min(100, Math.max((competency / 10.0) * 100.0, 0)))}%`,
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
    const newButtons: { [key: string]: any } = Object.keys(buttons).reduce(
      (obj, key) => ({
        ...obj,
        [key]: label === key && !buttons[key],
      }),
      {},
    );
    // Turn on 'All' button if other buttons are off
    setButtons({...newButtons, All: !Object.keys(buttons).some((key) => newButtons[key])});
  };

  const getRows = () => {
    // search for true active categories
    const actCat = Object.keys(buttons).reduce(
      (cat, key) => (buttons[key] ? key : cat),
      'All',
    );

    const comparator = (a: Skill, b: Skill) => {
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
