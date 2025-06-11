// import CreateTeamForm from '@/containers/CreateTeamForm'
// import DynamicButtons from '@/containers/DynamicButtons'
// import { TeamsList } from '@/containers/TeamsList'
// import { useTeamsCtx } from '@/hooks/TeamsContext'
// import { useHiddenContentState } from '@/hooks/useHiddenContentState'
// import { useRouter } from 'next/navigation'
// import { useEffect, useRef, useState } from 'react'

import Education from '@/containers/Resume/Education';
import Experience from '@/containers/Resume/Experience';
import Skills from '@/containers/Resume/Skills';

import degrees from '@/data/resume/degrees';
import work from '@/data/resume/work';
import { skills, categories } from '@/data/resume/skills';
// import Link from 'next/link'



// export default function Home() {
//   const { addTeam, resetOnGoingMatchState } = useTeamsCtx()
//   const router = useRouter()
//   const { isContentHidden, onMouseDown, onMouseUp } = useHiddenContentState({ onMouseUp: () => router.push('/history') })
//   const [hideInstallButton, setHideInstallButton] = useState<boolean>(true);

//   const installPrompt = useRef<any>()

//   function disableInAppInstallPrompt() {
//     installPrompt.current = null;
//     setHideInstallButton(true)
//   }

//   useEffect(() => {
//     resetOnGoingMatchState()

//     const onBefore = (event: Event) => {
//       event.preventDefault();
//       installPrompt.current = event;
//       setHideInstallButton(false)
//     }
//     window.addEventListener("beforeinstallprompt", onBefore);
//     window.addEventListener("appinstalled", disableInAppInstallPrompt);
//     return () => {
//       window.removeEventListener('beforeinstallprompt', onBefore)
//       window.removeEventListener("appinstalled", disableInAppInstallPrompt);
//     }
//   }, [])


//   return (
//     <main >
//       <DynamicButtons buttons={[{
//         label: 'History',
//         onMouseDown, onMouseUp,
//         onTouchStart: onMouseDown,
//         onTouchEnd: onMouseUp
//       }, {
//         label: 'Install',
//         onClick: async () => {
//           if (!installPrompt.current) {
//             return;
//           }
//           await installPrompt.current.prompt?.();
//           disableInAppInstallPrompt();
//         },
//         hidden: hideInstallButton,
//         className: 'd_shake'
//       },
//       {
//         label: 'Strategies',
//         onClick: () => router.push('/strategy'),
//         hidden: isContentHidden,
//         className: 'd_shake'
//       }]} />

//       <CreateTeamForm onSubmit={addTeam} />

//       <TeamsList />
//     </main>
//   )
// }


// NOTE: sections are displayed in order defined.

const sections = {
  Experience: () => <Experience data={work} />,
  Education: () => <Education data={degrees} />,
  Skills: () => <Skills skills={skills} categories={categories} />,
  // Courses: () => <Courses data={courses} />,
  // References: () => <References />,
};


const Resume = () => (
  <article className="post page-wrapper md:px-[2.5rem] px-3" id="resume">
    <header>
      <div className="title">
        <h2>
          Resume
        </h2>
        <div className="link-container">
          {Object.keys(sections).map((sec) => (
            <h4 key={sec}>
              <a href={`#${sec.toLowerCase()}`}>{sec}</a>
            </h4>
          ))}
        </div>
      </div>
    </header>
    {Object.entries(sections).map(([name, Section]) => (
      <Section key={name} />
    ))}
  </article>
);

Resume.getStaticProps = () => ({
  props: {
    hello: 'world',
  },
})

export default Resume;

// export const getStaticProps = () => {
//   return {
//     props: {
//     },
//   };
// }