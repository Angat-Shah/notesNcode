import { AnimatedSection } from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { Github, BookOpen } from "lucide-react";

export function AboutSection() {
  return (
    <AnimatedSection className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-3xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6">
          The Genesis of notesNcode
        </h2>
        
        <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
          notesNcode originated as a personal discipline to synthesize and structure the vast amount of information encountered throughout an engineering degree. Over four years, these files evolved from private study aids into a shared reference utilized by peers and successors. The objective remains straightforward: to eliminate the redundant effort of discovery by providing a transparent, organized archive of high-quality academic documentation.
        </p>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          This project is maintained as an open-access resource on GitHub. It is a living archive, and I welcome contributions that uphold the standard of these materials—whether through the addition of new insights, the refinement of existing code, or the optimization of the repository’s structure.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="rounded-full px-8"
            asChild
          >
            <a
              href="https://github.com/Angat-Shah/notesNcode"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View Repository
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-border/50 hover:bg-secondary hover:text-secondary-foreground"
            asChild
          >
            <a
              href="https://github.com/Angat-Shah/notesNcode#readme"
              target="_blank"
              rel="noopener noreferrer"
            >
              Archive Documentation
            </a>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
