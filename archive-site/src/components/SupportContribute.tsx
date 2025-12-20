import { AnimatedSection } from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { Star, GitFork, Heart } from "lucide-react";

const BASE_GITHUB_URL = "https://github.com/Angat-Shah/notesNcode";

export function SupportContribute() {
  return (
    <AnimatedSection className="py-16 px-6">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
          Support & Contribute
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          The value of an open-source resource is amplified by its community. If these materials have facilitated your academic or technical progress, consider supporting the project by validating the repository or contributing to its evolving knowledge base.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-border/50 hover:bg-secondary hover:text-secondary-foreground gap-2"
            asChild
          >
            <a
              href={BASE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="h-4 w-4" />
              Star
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-border/50 hover:bg-secondary hover:text-secondary-foreground gap-2"
            asChild
          >
            <a
              href={`${BASE_GITHUB_URL}/fork`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork className="h-4 w-4" />
              Fork
            </a>
          </Button>
          
          <Button
            variant="default"
            size="lg"
            className="rounded-full gap-2"
            asChild
          >
            <a
              href={`${BASE_GITHUB_URL}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heart className="h-4 w-4" />
              Contribute
            </a>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
