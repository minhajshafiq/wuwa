"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom-=100",
                    end: "center bottom",
                    toggleActions: "play none none reverse",
                    markers: false // Activez en debug
                }
            })
                .fromTo(".animated-word",
                    {
                        opacity: 0,
                        transform: "translate3d(0, 50px, 0) rotateY(20deg)"
                    },
                    {
                        opacity: 1,
                        transform: "translate3d(0, 0, 0) rotateY(0deg)",
                        ease: "power2.out",
                        stagger: 0.05,
                        duration: 0.8
                    }
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={clsx("animated-title w-full", containerClass)}>
            <div
                className="flex flex-col justify-center items-center"
                dangerouslySetInnerHTML={{ __html: title }}
            />
        </div>
    );
};

export default AnimatedTitle;