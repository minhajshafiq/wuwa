import Hero from "@/components/Hero";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Story from "@/components/Story";

export default function Home() {
    return (
        <main className={"relative min-h-screen w-screen overflow-hidden"}>
            <Navbar/>
            <Hero/>
            <About/>
            <Features/>
            <Story />
        </main>
    );
}
