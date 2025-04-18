"use client";
import React, {useRef} from 'react';
import AnimatedTitle from "@/components/AnimatedTitle";
import Image from "next/image";
import gsap from "gsap";
import RoundedCorners from "@/components/RoundedCorners";
import Button from "@/components/Button";

const Story = () => {
    const frameRef = useRef(null);

    const handleMouseLeave = () => {
        const element = frameRef.current;

        gsap.to(element, {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            ease: "power1.inOut"
        })
    }

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const element = frameRef.current;

        if(!element) return;

        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * -15;

        gsap.to(element, {
            duration: 0.5,
            rotateX: rotateY,
            transformPerspective: 800,
            ease: "power1.inOut"
        })
    }

    return (
        <section id={"story"} className={"min-h-dvh w-screen bg-black text-blue-50"}>
            <div className={"flex size-full flex-col items-center py-10 pb-24"}>
                <p className={"text-sm uppercase md:text-[10px]"}>
                    Our Story
                </p>

                <div className={"relative size-full"}>
                    <AnimatedTitle
                        title="The Story of Our Journey"
                        sectionId="story"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-4xl md:text-5xl lg:text-6xl"
                    />

                    <div className={"story-img-container "}>
                        <div className={"story-img-mask"}>
                            <div className={"story-img-content"}>
                                <Image
                                    ref={frameRef}
                                    src={"/img/entrance.webp"}
                                    alt={"entrance"}
                                    className={"object-contain"}
                                    fill={true}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseEnter={handleMouseLeave}
                                    onMouseUp={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                    />
                            </div>
                        </div>

                        <RoundedCorners />
                    </div>
                </div>

                <div className={"-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end"}>
                    <div className={"flex h-full w-fit flex-col items-center md:items-start"}>
                        <p className={"mt-3 max-w-sm text-center text-violet-50 md:text-start"}>
                            Where realms converge, lies Zentry and the boundless pillar.
                            Discover its secrets and shape your fate amidst infinite opportunities.
                        </p>
                        <Button
                            id={"realm-button"}
                            title={"discover prologue"}
                            containerClass={"mt-5"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;