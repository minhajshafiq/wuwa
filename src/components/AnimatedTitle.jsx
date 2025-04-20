"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null);
    const linesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation pour chaque ligne
            linesRef.current.forEach((line, lineIndex) => {
                const words = line.querySelectorAll('.animated-word');

                gsap.timeline({
                    scrollTrigger: {
                        trigger: line,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                })
                    .fromTo(words,
                        {
                            opacity: 0,
                            y: '1em',
                            rotateX: -45,
                            filter: 'blur(4px)'
                        },
                        {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            filter: 'blur(0px)',
                            ease: "elastic.out(1, 0.5)",
                            duration: 1.2,
                            stagger: {
                                each: 0.08,
                                from: "center"
                            }
                        }
                    );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={clsx("animated-title w-full", containerClass)}>
            {title.split('<br>').map((line, lineIndex) => (
                <div
                    key={lineIndex}
                    ref={el => linesRef.current[lineIndex] = el}
                    className="line-container block w-full text-center leading-tight"
                >
                    {line.split(' ').map((word, wordIndex) => (
                        <span
                            key={wordIndex}
                            className="animated-word inline-block will-change-transform opacity-0 px-1"
                        >
                            {word}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;