import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Code, ClipboardList } from "lucide-react";
import { highlightedResources } from "@/data/semesters";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-6 w-6" />,
  Code: <Code className="h-6 w-6" />,
  ClipboardList: <ClipboardList className="h-6 w-6" />,
};

export function HighlightedResources() {
  return (
    <AnimatedSection className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Highlighted Resources
          </h2>
          <p className="text-lg text-muted-foreground">
            Direct access to the most high-impact assets within the archive—curated for their depth, accuracy, and frequent utility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlightedResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Card className="h-full border-border/50 bg-card shadow-soft hover:shadow-card-hover transition-all duration-300 rounded-2xl group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {iconMap[resource.icon]}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
