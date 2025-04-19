"use client"
import React, {useEffect, useRef} from 'react';
import Button from "@/components/Button";
import Image from 'next/image';
import gsap from 'gsap';

const ImageClipBox = ({src, clipClass, useObjectFit = true, animationRef = null}) => {
    return (
        <div ref={animationRef} className={clipClass}>
            <Image
                src={src}
                alt={"image"}
                fill={true}
                className={useObjectFit ? "object-cover" : "object-contain"}
            />
        </div>
    );
};

const Contact = () => {
    const floatingImageRef = useRef(null);

    useEffect(() => {
        if (floatingImageRef.current) {
            gsap.to(floatingImageRef.current, {
                y: 15,
                duration: 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        }
    }, []);

    return (
        <div id={"contact"} className={"my-20 min-h-96 w-screen px-10"}>
            <div className={"relative rounded-lg bg-black py-12 text-blue-50 sm:overflow-hidden sm:py-24"}>
                {/* Layout mobile : image en haut */}
                <div className={"flex flex-col md:hidden items-center mb-10 h-64 relative"}>
                    <div className={"relative h-full w-44 z-10"}>
                        <ImageClipBox
                            src={"/img/Changli_Full_Sprite.webp"}
                            clipClass={"relative h-full w-full"}
                            useObjectFit={false}
                            animationRef={floatingImageRef}
                        />
                    </div>
                </div>

                {/* Texte (s'adapte en fonction de l'écran) */}
                <div className={"flex flex-col items-center text-center md:pr-24 lg:pr-32 xl:pr-20 z-20 relative"}>
                    <p className={"text-[10px] uppercase"}>
                        Join Wuthering Waves
                    </p>

                    <p className={"mt-10 w-full text-5xl leading-[0.9] md:text-[6rem]"}>
                        Let's build the new era of gaming together.
                    </p>

                    <Button title={"join us"} containerClass={"mt-10 cursor-pointer"}/>
                </div>

                {/* Image flottante sur les écrans moyens et grands */}
                <div
                    className={"hidden md:block absolute bottom-0 md:right-10 md:h-[80%] md:w-56 lg:h-[95%] lg:w-72 z-10"}>
                    <ImageClipBox
                        src={"/img/Changli_Full_Sprite.webp"}
                        clipClass={"relative h-full w-full"}
                        useObjectFit={false}
                        animationRef={floatingImageRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;