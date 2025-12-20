import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Code, ClipboardList, HelpCircle } from "lucide-react";

const resourceTypes = [
  {
    icon: FileText,
    title: "Notes & Study Material",
    description: "Modular documentation across core engineering disciplines, synthesized for both conceptual depth and rapid review.",
  },
  {
    icon: Code,
    title: "Technical Lab Records",
    description: "A comprehensive suite of laboratory implementations, encompassing source code, execution logic, and preparatory insights for practical evaluations.",
  },
  {
    icon: ClipboardList,
    title: "Academic Assignments",
    description: "A portfolio of solved problem sets and theoretical submissions, preserved as benchmarks for structured academic writing and problem-solving.",
  },
  {
    icon: HelpCircle,
    title: "Question Papers",
    description: "A longitudinal collection of previous-year inquiry papers, offering a clear perspective on curriculum standards and evaluation patterns.",
  },
];

export function WhatYoullFind() {
  return (
    <AnimatedSection className="py-20 px-6 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            The Core of the Archive
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A multi-faceted collection of academic assets compiled over four years of B.Tech in Computer Science. This repository serves as a functional record of rigorous coursework, meticulously categorized to facilitate clarity and academic continuity for those who follow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resourceTypes.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-card transition-all duration-300 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
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
