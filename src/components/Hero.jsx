"use client"
import {useEffect, useRef, useState} from "react";
import Button from "./Button";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);
    const mainVideoRef = useRef(null);
    const previewVideoRef = useRef(null);

    const upComingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(upComingVideoIndex);
    }

    useEffect(() => {
        if (loadedVideos >= 3) {
            setIsLoading(false);
        }
    }, [loadedVideos])

    const handleVideoLoad = () => {
        setLoadedVideos(prevLoaded => prevLoaded + 1);
        console.log("Vidéo chargée, total:", loadedVideos + 1);
    }

    useGSAP(() => {
        if (hasClicked) {
            gsap.set("#next-video", {visibility: "visible"});

            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => nextVideoRef.current.play(),
            })

            gsap.from('#current-video', {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            })
        }
    }, {dependencies: [currentIndex], revertOnUpdate: true});

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: 'polygon(0 0, 80% 0%, 100% 100%, 16% 100%)',
            borderRadius: '0 0 40% 10%'
        })

        gsap.from("#video-frame", {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            },
        })
    })

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`

    return (
        <div className="relative h-dvh w-screen overflow-hidden">

            {isLoading && (
                <div className={"flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50"}>
                    <div className={"three-body"}>
                        <div className={"three-body__dot"}/>
                        <div className={"three-body__dot"}/>
                        <div className={"three-body__dot"}/>
                    </div>
                </div>
            )}
            <div id="video-frame" className={"relative z-10 h-dvh w-screen overflow-hidden rounded-lg lg:bg-[#DFDFF2]"}>
                <div>
                    <div
                        className={"mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"}>
                        <div
                            className={"origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"}
                            onClick={handleMiniVideoClick} onKeyUp={handleMiniVideoClick}
                        >
                            <video
                                ref={previewVideoRef}
                                src={getVideoSrc(upComingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className={"size-64 origin-center scale-150 object-cover object-center"}
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id={"next-video"}
                        className={"absolute-center invisible absolute z-20 size-64 object-cover object-center"}
                        onLoadedData={handleVideoLoad}
                    />

                    <video
                        ref={mainVideoRef}
                        src={getVideoSrc(currentIndex)}
                        autoPlay
                        loop
                        muted
                        className={"absolute left-0 top-0 size-full object-cover object-center"}
                        onLoadedData={handleVideoLoad}
                    />

                    <h1 className={"hero-heading absolute bottom-5 right-5 z-40 text-white"}>
                        G<b>a</b>ming
                    </h1>

                    <div className={"absolute left-0 top-0 z-40 fize-full"}>
                        <div className={"mt-24 px-5 sm:px-10"}>
                            <h1 className={"hero-heading text-blue-100"}>
                                League of Legends
                            </h1>
                            <p className={"mb-5 max-w-64 text-blue-100"}>
                                Enter the world of League of Legends<br/>
                                Join the ranks of champions and experience the thrill of victory.<br/>
                            </p>
                            <Button id={"watch-trailer"} title={"Watch Trailer"} leftIcon={<TiLocationArrow/>}
                                    containerClass={"bg-yellow-300 flex-center gap-1"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;