// import React from 'react'
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { useRef } from 'react';

// const Boxes = () => {

//     const yellowBoxRef = useRef();

//     const yellowBox = yellowBoxRef.current;

//     const enterAnimation = () => {
//       gsap.to(yellowBox, {
//         x:100,
//         duration: 0.5,
//         ease: "power3.out"
//     });
// };
// const leaveAnimation = () => {
//     gsap.to(yellowBox, {
//         x:-100,
//         duration: 0.5,
//         ease: "power3.out",
//         delay:2,
//       });
//     };
//   return (
//     <section className='hover_boxes'>
//         <div className="line_of_box">
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         </div>
//         <div className="line_of_box">
//             <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         </div>
//         <div className="line_of_box">
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         </div>
//         <div className="line_of_box">
//         <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
//           <div className="yellow_box" ref={yellowBoxRef}></div>
//         </div>
//         </div>
//       </section>
//   )
// }

// export default Boxes;



import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Boxes = () => {

    useGSAP(() => {
        gsap.fromTo(
      ".hover_boxes",
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        delay: 4.3
      }
    );
    });

  const enterAnimation = (e) => {
    const yellowBox = e.currentTarget.querySelector(".yellow_box");

    gsap.to(yellowBox, {
      x: 0,
      duration: 0.5,
      ease: "ease.in",
      overwrite: "auto"
    });
  };

  const leaveAnimation = (e) => {
    const yellowBox = e.currentTarget.querySelector(".yellow_box");

    gsap.to(yellowBox, {
      x: -100,
      duration: 0.5,
      ease: "ease.in",
      overwrite: "auto",
      delay: 1.5
    });
  };

  return (
    <section className="hover_boxes">

      <div className="line_of_box">
        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>

        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>

        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>

        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>
      </div>

      <div className="line_of_box">
        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>

        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>

        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>
      </div>

      <div className="line_of_box">
        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>

        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>
      </div>

      <div className="line_of_box">
        <div className="hover_box" onMouseEnter={enterAnimation} onMouseLeave={leaveAnimation}>
          <div className="yellow_box"></div>
        </div>
      </div>

    </section>
  );
};

export default Boxes;