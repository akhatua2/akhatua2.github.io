import Navigation from "@/components/Navigation";
import Newspaper from "@/components/Newspaper";

export const metadata = {
  title: "Research — Arpan Khatua",
};

export default function Research() {
  return (
    <main>
      <Navigation />
      <div className="pt-20">
        <Newspaper />
      </div>
    </main>
  );
}
