"use client";
import {useState, useRef, useCallback} from "react";
import {TiLocationArrow} from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = useCallback((event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        setTransformStyle(
            `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
        );
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTransformStyle("");
    }, []);

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = useCallback((event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hoverButtonRef.current.style.setProperty(
            "--cursor-x",
            `${x}px`
        );
        hoverButtonRef.current.style.setProperty(
            "--cursor-y",
            `${y}px`
        );
    }, []);

    const handleMouseEnter = useCallback(() => setHoverOpacity(1), []);
    const handleMouseLeave = useCallback(() => setHoverOpacity(0), []);

    return (
        <div className="relative size-full">
            {src && (
                <video
                    src={src}
                    loop
                    muted
                    autoPlay
                    playsInline
                    className="absolute left-0 top-0 size-full object-cover object-center"
                />
            )}
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                        style={{
                            "--hover-opacity": hoverOpacity,
                        }}
                    >
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => (
    <section className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
                <p className="font-circular-web text-lg text-blue-50">
                    Into the world of Wuthering Waves
                </p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Explorez Solaris, un monde ravagé par les Échos,
                    des phénomènes mystérieux qui ont transformé la planète.
                    Dans ce paysage post-apocalyptique,
                    les Résonateurs comme vous maîtrisent le pouvoir des Échos pour combattre,
                    explorer et dévoiler les secrets d'une civilisation perdue.
                </p>
            </div>

            <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                <BentoCard
                    src="videos/feature-1.mp4"
                    title={
                        <>
                            Wuthering Waves
                        </>
                    }
                    description="Explore Solaris"
                    isComingSoon
                />
            </BentoTilt>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
                <BentoTilt className="border-hsla overflow-hidden rounded-md h-[40vh] md:h-[65vh]">
                    <BentoCard
                        src="videos/feature-6.mp4"
                        title={
                            <>
                                Shorekeeper
                            </>
                        }
                        description="Till the Sea Turns Clear"
                        isComingSoon
                    />
                </BentoTilt>

                <div className="grid grid-rows-2 gap-7 h-full">
                    <BentoTilt className="border-hsla overflow-hidden rounded-md h-full">
                        <BentoCard
                            src="videos/feature-8.mp4"
                            title={
                                <>
                                    Version 2.2
                                </>
                            }
                            description="Tangled Truth in Inverted Tower"
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className="border-hsla overflow-hidden rounded-md h-full">
                        <BentoCard
                            src="videos/feature-7.mp4"
                            title={
                                <>
                                    Abby
                                </>
                            }
                            description="A compagnion for your journey"
                            isComingSoon
                        />
                    </BentoTilt>
                </div>

                <BentoTilt className="border-hsla overflow-hidden rounded-md h-[30vh] bg-blue-300 relative">
                    <BentoCard
                        title={
                            <>
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                            </>
                        }
                    />
                    <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
                        <TiLocationArrow className="text-4xl text-white" />
                    </div>
                </BentoTilt>

                <BentoTilt className="border-hsla overflow-hidden rounded-md h-[30vh]">
                    <video
                        src="videos/hero-4.mp4"
                        loop
                        muted
                        autoPlay
                        playsInline
                        className="size-full object-cover object-center"
                    />
                </BentoTilt>
            </div>
        </div>
    </section>
);

export default Features;