'use client';

import { FOOTER_LINKS, PROJECTS, WORK_TIMELINE } from '@constants';

const MobileFallback = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-4">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-white/60">Ayush Giri</p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Frontend Engineer</h1>
          <p className="max-w-2xl font-sans text-sm leading-7 text-white/70">
            Creative developer focused on frontend systems, interactive interfaces, and product-minded builds.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 font-sans text-sm">
          <a className="border border-white/20 px-4 py-2 text-white/90" href="./Ayush_SE_Current.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
          <a className="border border-white/20 px-4 py-2 text-white/90" href="https://github.com/ayushxt25" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="border border-white/20 px-4 py-2 text-white/90" href="https://www.linkedin.com/in/ayush-giri-04544a348/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="mb-8 font-serif text-2xl">Work And Education</h2>
        <div className="space-y-5">
          {WORK_TIMELINE.map((item) => (
            <article key={`${item.year}-${item.title}`} className="border border-white/10 bg-white/[0.03] p-5">
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/50">{item.year}</p>
              <h3 className="mt-2 font-serif text-xl">{item.title}</h3>
              {item.subtitle && (
                <p className="mt-2 font-sans text-sm text-white/65">{item.subtitle}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="mb-8 font-serif text-2xl">Projects</h2>
        <div className="space-y-5">
          {PROJECTS.map((project) => (
            <article key={`${project.title}-${project.date}`} className="border border-white/10 bg-white/[0.03] p-5">
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/50">{project.date}</p>
              <h3 className="mt-2 font-serif text-xl">{project.title}</h3>
              <p className="mt-3 font-sans text-sm leading-7 text-white/70">{project.subtext}</p>
              {project.url && (
                <a className="mt-4 inline-block font-sans text-sm text-white/90 underline underline-offset-4" href={project.url} target="_blank" rel="noreferrer">
                  View project
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-5xl flex-wrap gap-4 px-6 py-16 font-sans text-sm">
        {FOOTER_LINKS.map((link) => (
          <a key={link.name} className="text-white/75 underline underline-offset-4" href={link.url} target="_blank" rel="noreferrer">
            {link.name}
          </a>
        ))}
      </footer>
    </main>
  );
};

export default MobileFallback;
