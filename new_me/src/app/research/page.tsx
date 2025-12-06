import Newspaper from "@/components/Newspaper";
import Navigation from "@/components/Navigation";

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
