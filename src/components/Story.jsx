"use client";
import React, { useRef } from 'react';
import AnimatedTitle from "@/components/AnimatedTitle";
import Image from "next/image";
import gsap from "gsap";
import RoundedCorners from "@/components/RoundedCorners";
import Button from "@/components/Button";

const Story = () => {
    const frameRef = useRef(null);

    const handleMouseLeave = () => {
        const element = frameRef.current;
        if (!element) return;

        gsap.to(element, {
            duration: 0.6,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: "power2.out",
        });
    };

    const handleMouseMove = (e) => {
        const element = frameRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const { clientX, clientY } = e;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * -5;

        gsap.to(element, {
            duration: 0.4,
            rotateX,
            rotateY,
            scale: 1.05,
            transformPerspective: 1000,
            transformOrigin: "center",
            ease: "power2.out",
        });
    };

    return (
        <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
            <div className="flex size-full flex-col items-center py-10 pb-24">
                <p className="text-sm uppercase md:text-[10px]">Our Story</p>

                <div className="relative size-full">
                    <AnimatedTitle
                        title="The Story of Our Journey"
                        sectionId="story"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-4xl md:text-5xl lg:text-6xl"
                    />

                    <div className="story-img-container">
                        <div className="story-img-mask">
                            <div className="story-img-content" style={{ perspective: "1000px" }}>
                                <Image
                                    ref={frameRef}
                                    src="/img/wuthering-waves-rover.webp"
                                    alt="entrance"
                                    className="object-contain will-change-transform"
                                    fill
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                />
                            </div>
                        </div>
                        <RoundedCorners />
                    </div>
                </div>

                <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
                    <div className="flex h-full w-fit flex-col items-center md:items-start">
                        <p className="mt-3 max-w-sm text-center text-violet-50 md:text-start">
                            Explore the enigmatic realms of Wuthering Waves, where mysteries unfold and destinies intertwine.
                            Unveil its secrets and embark on a journey that transcends imagination.
                        </p>
                        <Button
                            id="realm-button"
                            title="discover prologue"
                            containerClass="mt-5"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;
