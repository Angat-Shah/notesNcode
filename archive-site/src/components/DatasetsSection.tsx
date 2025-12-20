import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, ExternalLink, Leaf, Sparkles } from "lucide-react";

const BASE_GITHUB_URL = "https://github.com/Angat-Shah/notesNcode";

interface Dataset {
  id: string;
  title: string;
  description: string;
  count: string;
  icon: typeof Leaf;
  githubUrl: string;
  isComingSoon?: boolean;
}

const datasets: Dataset[] = [
  {
    id: "brinjal",
    title: "Solanum Melongena (Brinjal) Phenotyping",
    description: "A high-resolution image corpus of brinjal plant foliage, suitable for image analysis and plant health–related research applications.",
    count: "1,000 Annotated Images",
    icon: Leaf,
    githubUrl: "https://drive.google.com/drive/folders/171PqasmI5j-T6Na-I6_ueneLc7BCRk3W",
  },
  {
    id: "tulsi",
    title: "Ocimum Tenuiflorum (Tulsi) Dataset",
    description: "A specialized botanical dataset of Holy Basil leaf imagery, intended for use in fine-grained visual categorization and medicinal plant research.",
    count: "250 High-Fidelity Images",
    icon: Leaf,
    githubUrl: "https://drive.google.com/drive/folders/11WJ1qwy7zIhaV8_aylrgj-SjGZ77mYkU",
  },
  {
    id: "more",
    title: "More Coming Soon",
    description: "Ongoing collation of advanced datasets, research templates, and multi-disciplinary resources to support the next wave of technical exploration. Active Archival.",
    count: "In Progress",
    icon: Sparkles,
    githubUrl: BASE_GITHUB_URL,
    isComingSoon: true,
  },
];

export function DatasetsSection() {
  return (
    <AnimatedSection className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Database className="h-4 w-4" />
            Resources & Datasets
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Beyond the Curriculum
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of specialized resources and proprietary datasets. These materials support advanced coursework, independent projects, and exploratory learning beyond the standard undergraduate syllabus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {datasets.map((dataset, index) => (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className={`h-full border-border/50 bg-card shadow-soft hover:shadow-card transition-all duration-300 rounded-2xl ${dataset.isComingSoon ? 'opacity-70' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-2">
                    <dataset.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {dataset.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {dataset.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {dataset.count}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                      asChild
                      disabled={dataset.isComingSoon}
                    >
                      <a
                        href={dataset.isComingSoon ? "#" : dataset.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={dataset.isComingSoon ? "pointer-events-none" : ""}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
