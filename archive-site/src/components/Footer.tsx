import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Angat-Shah/notesNcode"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            
            <span className="text-sm text-muted-foreground">
              MIT License
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} notesNcode. Curated by Angat Shah.
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Documenting the journey from foundations to specialized engineering.
        </div>
      </div>
    </footer>
  );
}
