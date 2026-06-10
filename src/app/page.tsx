import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Products } from "@/components/sections/Products";
import { Timeline } from "@/components/sections/Timeline";
import { Experiments } from "@/components/sections/Experiments";
import { Journal } from "@/components/sections/Journal";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { StatusBar } from "@/components/ui/StatusBar";
import { CommandPaletteProvider } from "@/components/ui/CommandPalette";

export default function Home() {
  return (
    <CommandPaletteProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Navigation />
        <main>
          <Hero />
          <Ecosystem />
          <Products />
          <Timeline />
          <Experiments />
          <Journal />
          <About />
          <Contact />
        </main>
        <Footer />
        <StatusBar />
      </div>
    </CommandPaletteProvider>
  );
}
