import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { projects } from '../data/projects.js'

function ProjectCard({ project, index }) {
  return (
    <motion.div
      data-cursor-hover
      initial={{ opacity: 0, y: 30, rotate: project.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: project.rotate }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ rotate: 0, scale: 1.03, y: -8 }}
      transition={{ delay: (index % 3) * 0.08, type: 'spring', stiffness: 220, damping: 18 }}
      className="card-stack rounded-[6px] bg-white p-4"
    >
      <div className="flex aspect-[16/10] items-center justify-center rounded-sm bg-secondary">
        <span className="font-hand text-lg text-ink/40">project preview</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <h3 className="font-heading text-xl text-ink">{project.title}</h3>
        <span className="shrink-0 rounded-full bg-accent/50 px-2 py-0.5 font-body text-xs text-ink/70">
          {project.year}
        </span>
      </div>
      <p className="mt-2 font-body text-sm leading-6 text-ink/65">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 font-body text-xs text-ink/60">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <a href={project.github} data-cursor-hover className="flex items-center gap-1 font-body text-xs font-semibold text-ink/70 hover:text-ink">
          <Github className="h-3.5 w-3.5" /> Code
        </a>
        <a href={project.demo} data-cursor-hover className="flex items-center gap-1 font-body text-xs font-semibold text-ink/70 hover:text-ink">
          <ExternalLink className="h-3.5 w-3.5" /> Demo
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <SectionHeading eyebrow="a little museum of" title="things I've built" align="center" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
