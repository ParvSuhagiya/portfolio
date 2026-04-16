import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineItem from './TimelineItem';
import './Timeline.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const hackathonData = [
  {
    id: 1,
    title: "CRAFTTHON",
    organization: "Gandhinagar University",
    date: "April 2026",
    track: "Ai",
    result: "Participated",
    projectName: "TimeCure",
    description: "Built an autonomous AI agent capable of multi-step reasoning and web browsing. Integrated real-time data synthesis.",
    team: [
        "https://ui-avatars.com/api/?name=PA&background=1a1a1a&color=fff",
        "https://ui-avatars.com/api/?name=JS&background=1a1a1a&color=fff"
    ],
    images: [
        "https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776338682/WhatsApp_Image_2026-04-15_at_5.06.46_PM_pos5mq.jpg",
        "https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776338935/c3c667bd-d55b-4482-a12c-9094fa5ec6d3_f1txrs.jpg",
        "https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776338934/0e6d9ebb-c21a-4300-b9a4-e359a9acab80_mxbpnw.jpg"
    ]
  },
  {
    id: 2,
    title: "InnovaAItion",
    organization: "Intiutive",
    date: "December 2025",
    track: "Finance App",
    result: "Participated",
    projectName: "BizPilot",
    description: "Developed a truly decentralized and non-custodial crypto wallet with multi-sig security and social recovery mechanisms.",
    team: [
        "https://ui-avatars.com/api/?name=PA&background=1a1a1a&color=fff",
        "https://ui-avatars.com/api/?name=JD&background=1a1a1a&color=fff"
    ],
    images: [
        "https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776338682/70a155a1-e2cb-4584-98a2-c4afdce01bb1_xoxery.jpg",
        "https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776338682/WhatsApp_Image_2026-01-17_at_5.31.13_PM_vbecur.jpg",
        "https://res.cloudinary.com/dotryksrv/image/upload/q_auto/f_auto/v1776338786/a23257f8-b554-4ba2-a8db-6e458cf4169e_fwkbuw.jpg"
    ]
  }
];

const Timeline = () => {
  const containerRef = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Animate section header title
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
      }
    );

    // Desktop Animation
    mm.add("(min-width: 901px)", () => {
      const items = gsap.utils.toArray('.timeline-item-wrapper');
      
      // Animate the line stretching down
      gsap.fromTo('.timeline-line', 
        { height: 0 },
        { 
          height: '100%', 
          ease: 'none', 
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: 'top center', 
            end: 'bottom center', 
            scrub: true 
          } 
        }
      );

      // Fade and slide-in items alternating directions
      items.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        
        gsap.fromTo(item, 
          { 
            opacity: 0, 
            x: isLeft ? -50 : 50,
            y: 30
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    // Mobile Animation
    mm.add("(max-width: 900px)", () => {
      const items = gsap.utils.toArray('.timeline-item-wrapper');
      
      gsap.fromTo('.timeline-line', 
        { height: 0 },
        { 
          height: '100%', 
          ease: 'none', 
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: 'top center', 
            end: 'bottom center', 
            scrub: true 
          } 
        }
      );

      items.forEach((item) => {
        gsap.fromTo(item, 
          { 
            opacity: 0, 
            x: 30, 
            y: 30 
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => mm.revert(); // clean up matchMedia
  }, { scope: containerRef });

  return (
    <section className="timeline-section" id="achievements">
      <header className="timeline-header-container" ref={titleRef}>
        <p className="timeline-eyebrow">MILESTONES</p>
        <h2 className="timeline-title">
          Hackathons &amp; <span className="timeline-title-accent">Awards</span>
        </h2>
      </header>
      
      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-line"></div>
        {hackathonData.map((data, index) => (
          <TimelineItem key={data.id} data={data} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
