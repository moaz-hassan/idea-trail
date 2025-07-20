const StayUpdatedSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div>

      <div className="absolute top-10 left-20 w-32 h-32 bg-white/20 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-10 right-20 w-24 h-24 bg-white/20 rounded-full animate-bounce delay-1000"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get the latest articles and insights delivered to your inbox weekly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 backdrop-blur-sm border border-white/20"
            />
            <button className="px-8 py-4 bg-white/20 backdrop-blur-xl text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 hover:scale-105 transform cursor-pointer">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-blue-100 mt-4 opacity-75">
            Join 10,000+ tech professionals. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StayUpdatedSection;
