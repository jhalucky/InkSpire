export default function About() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="h2-title text-3xl sm:text-4xl text-white mb-6">Why InkSpire</h2>
        <p className="muted mb-12">Fast, simple and distraction-free writing and reading, made for everyone.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'Write', desc: 'A clean, minimal editor to focus on your words.' },
            { title: 'Share', desc: 'Publish in one click and reach your audience.' },
            { title: 'Grow', desc: 'Build your readership and track engagement.' },
          ].map((item, i) => (
            <div key={i} className="panel p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


