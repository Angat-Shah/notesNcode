import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Code, ClipboardList, HelpCircle, CheckCircle, BookOpen, FolderOpen } from "lucide-react";
import { Semester } from "@/data/semesters";

interface PreviewDialogProps {
  semester: Semester | null;
  onClose: () => void;
}

export function PreviewDialog({ semester, onClose }: PreviewDialogProps) {
  if (!semester) return null;

  const getCategoriesForSemester = () => {
    if (!semester.content) return [];

    const categories = [];
    
    if (semester.content.notes && semester.content.notes.length > 0) {
      categories.push({
        icon: FileText,
        title: "Notes & Study Material",
        items: semester.content.notes,
      });
    }

    if (semester.content.labs && semester.content.labs.length > 0) {
      categories.push({
        icon: Code,
        title: "Laboratory Records",
        items: semester.content.labs,
      });
    }

    if (semester.content.assignments && semester.content.assignments.length > 0) {
      categories.push({
        icon: ClipboardList,
        title: "Academic Assignments",
        items: semester.content.assignments,
      });
    }

    if (semester.content.code && semester.content.code.length > 0) {
      categories.push({
        icon: FolderOpen,
        title: "Code & Projects",
        items: semester.content.code,
      });
    }

    if (semester.content.resources && semester.content.resources.length > 0) {
      categories.push({
        icon: BookOpen,
        title: "Question Banks & Resources",
        items: semester.content.resources,
      });
    }

    if (semester.content.papers && semester.content.papers.length > 0) {
      categories.push({
        icon: HelpCircle,
        title: "Examination Archives",
        items: semester.content.papers,
      });
    }

    return categories;
  };

  const contentCategories = getCategoriesForSemester();

  return (
    <Dialog open={!!semester} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-2xl rounded-2xl border-border/50 shadow-modal max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {semester.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {semester.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Subject tags */}
          <div>
            <p className="text-xs font-medium text-muted-foreground/70 mb-2 uppercase tracking-wide">
              Subjects Covered
            </p>
            <div className="flex flex-wrap gap-2">
              {semester.subjects.map((subject) => (
                <span
                  key={subject}
                  className="text-sm font-medium text-foreground bg-secondary px-3 py-1.5 rounded-full border border-border/50"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Content breakdown */}
          <div className="bg-secondary/40 rounded-xl p-5">
            <p className="text-xs font-medium text-muted-foreground/70 mb-4 uppercase tracking-wide">
              What's Inside
            </p>
            {contentCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentCategories.map(({ icon: Icon, title, items }) => (
                  <div key={title} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm text-foreground">{title}</h4>
                    </div>
                    <ul className="space-y-1 pl-8">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-primary/60 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Content details coming soon.
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-2">
            <Button
              className="rounded-full"
              size="lg"
              asChild
            >
              <a
                href={semester.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in GitHub
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
