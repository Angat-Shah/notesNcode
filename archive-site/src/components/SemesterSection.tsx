import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { SemesterCard } from "./SemesterCard";
import { PreviewDialog } from "./PreviewDialog";
import { semesters, Semester } from "@/data/semesters";

export function SemesterSection() {
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);

  return (
    <AnimatedSection id="semesters" className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            The Academic Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive traversal of the B.Tech curriculum, organized chronologically. This section catalogs the evolution from fundamental scientific principles to specialized computational research.
          </p>
        </div>

        <div className="space-y-4">
          {semesters.map((semester, index) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onPreview={setSelectedSemester}
              index={index}
            />
          ))}
        </div>
      </div>

      <PreviewDialog
        semester={selectedSemester}
        onClose={() => setSelectedSemester(null)}
      />
    </AnimatedSection>
  );
}
