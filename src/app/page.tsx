import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Products } from "@/components/sections/Products";
import { Mission } from "@/components/sections/Mission";
import { Contact } from "@/components/sections/Contact";
import { CommandPaletteProvider } from "@/components/ui/CommandPalette";

export default function Home() {
  return (
    <CommandPaletteProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Navigation />
        <main>
          <Hero />
          <Pillars />
          <Products />
          <Mission />
          <Contact />
        </main>
        <Footer />
      </div>
    </CommandPaletteProvider>
  );
}
