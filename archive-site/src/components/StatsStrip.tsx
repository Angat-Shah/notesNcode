import { AnimatedSection } from "./AnimatedSection";
import { stats } from "@/data/semesters";
import { BookOpen, Layers, Calendar } from "lucide-react";

export function StatsStrip() {
  return (
    <AnimatedSection className="py-12 border-y border-border/50 bg-secondary/30">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="text-3xl font-semibold text-foreground">{stats.semesters}</span>
            <span className="text-sm text-muted-foreground">Semesters Covered</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Layers className="h-5 w-5 text-muted-foreground" />
            <span className="text-3xl font-semibold text-foreground">{stats.resourceTypes.length}</span>
            <span className="text-sm text-muted-foreground">Resource Types</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-3xl font-semibold text-foreground">{stats.lastUpdated}</span>
            <span className="text-sm text-muted-foreground">Last Updated</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
