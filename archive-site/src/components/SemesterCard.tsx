import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Eye, Clock, FileText, Code, ClipboardList, HelpCircle, FolderOpen, BookOpen, ShieldCheck } from "lucide-react";
import { Semester } from "@/data/semesters";

interface SemesterCardProps {
  semester: Semester;
  onPreview: (semester: Semester) => void;
  index: number;
}

export function SemesterCard({ semester, onPreview, index }: SemesterCardProps) {
  const getIncludesList = () => {
    if (!semester.content) {
      return [
        { icon: FileText, label: "Notes" },
        { icon: Code, label: "Labs" },
        { icon: ClipboardList, label: "Assignments" },
        { icon: HelpCircle, label: "Papers" },
      ];
    }

    const includes = [];
    if (semester.content.notes && semester.content.notes.length > 0) {
      includes.push({ icon: FileText, label: "Notes" });
    }
    if (semester.content.labs && semester.content.labs.length > 0) {
      includes.push({ icon: Code, label: "Labs" });
    }
    if (semester.content.assignments && semester.content.assignments.length > 0) {
      includes.push({ icon: ClipboardList, label: "Assignments" });
    }
    if (semester.content.code && semester.content.code.length > 0) {
      includes.push({ icon: FolderOpen, label: "Code" });
    }
    if (semester.content.resources && semester.content.resources.length > 0) {
      includes.push({ icon: BookOpen, label: "Resources" });
    }
    if (semester.content.papers && semester.content.papers.length > 0) {
      includes.push({ icon: HelpCircle, label: "Papers" });
    }

    return includes.length > 0 ? includes : [
      { icon: FileText, label: "Notes" },
      { icon: Code, label: "Labs" },
      { icon: ClipboardList, label: "Assignments" },
      { icon: HelpCircle, label: "Papers" },
    ];
  };

  const includesList = getIncludesList();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="group relative overflow-hidden border-border/50 bg-card shadow-soft hover:shadow-card-hover transition-all duration-300 rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                {semester.title}
                {semester.isComingSoon && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    Coming Soon
                  </span>
                )}
              </CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                {semester.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Subject tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {semester.subjects.slice(0, 4).map((subject) => (
              <span
                key={subject}
                className="text-xs font-medium text-muted-foreground bg-secondary/80 px-3 py-1 rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
          
          {semester.noShareableContent ? (
            <div className="mb-4 py-3 px-4 bg-secondary/40 rounded-xl">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-muted-foreground/70 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Materials are not publicly shared due to the nature of the work. For further details, feel free to get in touch.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5 py-3 px-4 bg-secondary/40 rounded-xl">
                <p className="text-xs font-medium text-muted-foreground/70 mb-2 uppercase tracking-wide">
                  Includes
                </p>
                <div className="flex flex-wrap gap-3">
                  {includesList.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full flex-1 sm:flex-none"
                  asChild
                  disabled={semester.isComingSoon}
                >
                  <a
                    href={semester.isComingSoon ? "#" : semester.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={semester.isComingSoon ? "pointer-events-none opacity-50" : ""}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full flex-1 sm:flex-none border-border/50 hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => onPreview(semester)}
                  disabled={semester.isComingSoon}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
