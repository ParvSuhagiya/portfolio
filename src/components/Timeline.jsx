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
    title: "Global AI Hackathon",
    organization: "OpenAI & Microsoft",
    date: "March 2026",
    track: "Generative AI",
    result: "Winner 🥇",
    projectName: "NexusAI",
    description: "Built an autonomous AI agent capable of multi-step reasoning and web browsing. Integrated real-time data synthesis.",
    team: [
        "https://ui-avatars.com/api/?name=PA&background=1a1a1a&color=fff",
        "https://ui-avatars.com/api/?name=JS&background=1a1a1a&color=fff"
    ],
    images: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&w=300&q=80"
    ]
  },
  {
    id: 2,
    title: "Web3 Buildathon",
    organization: "Ethereum Foundation",
    date: "December 2025",
    track: "DeFi",
    result: "2nd Place 🥈",
    projectName: "BlockVault",
    description: "Developed a truly decentralized and non-custodial crypto wallet with multi-sig security and social recovery mechanisms.",
    team: [
        "https://ui-avatars.com/api/?name=PA&background=1a1a1a&color=fff",
        "https://ui-avatars.com/api/?name=JD&background=1a1a1a&color=fff"
    ],
    images: [
        "https://images.unsplash.com/photo-1621504450181-5d356f153343?auto=format&fit=crop&w=300&q=80"
    ]
  },
  {
    id: 3,
    title: "HackTheNorth",
    organization: "University of Waterloo",
    date: "September 2025",
    track: "FinTech",
    result: "Top 10 Finalist",
    projectName: "SpendSmart",
    description: "A machine learning-powered personal finance dashboard that predicts future expenses based on user spending habits.",
    team: [
        "https://ui-avatars.com/api/?name=PA&background=1a1a1a&color=fff",
        "https://ui-avatars.com/api/?name=AB&background=1a1a1a&color=fff",
        "https://ui-avatars.com/api/?name=CD&background=1a1a1a&color=fff"
    ],
    images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"
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
