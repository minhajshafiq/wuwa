import Hero from "@/components/Hero";
import About from "@/components/About";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <main className={"relative min-h-screen w-screen overflow-hidden"}>
            <Navbar/>
            <Hero/>
            <About/>
        </main>
    );
}
