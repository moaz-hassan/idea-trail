import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Heart, Target } from "lucide-react";

const About = () => {
  return (
    <div className="mt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IdeaTrail
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              We&apos;re a community of passionate writers, developers, and
              designers sharing knowledge, insights, and experiences to help
              others grow and learn in the ever-evolving world of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At IdeaTrail , we believe that knowledge should be accessible to
                everyone. Our mission is to create a platform where experts and
                beginners alike can share their experiences, learn from each
                other, and build a stronger, more inclusive tech community.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Whether you&apos;re just starting your coding journey or
                you&apos;re a seasoned professional, you&apos;ll find valuable
                content that helps you grow, stay current with industry trends,
                and connect with like-minded individuals.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/WebArticle.jpg"
                alt="Team collaboration"
                width={800}
                height={600}
                priority
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quality Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We prioritize well-researched, practical, and actionable content
                that provides real value to our readers.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Community First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We foster an inclusive environment where everyone feels welcome
                to learn, share, and grow together.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Passion Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our love for technology and helping others drives us to create
                content that inspires and educates.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Impact Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every piece of content we publish aims to make a positive impact
                on our readers&apos; learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Contributors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The talented individuals who make BlogHub possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Mo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Moaz
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                Frontend Developer
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Passionate about React, TypeScript, and creating beautiful user
                experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Mo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Moaz
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                Full Stack Developer
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Expert in Node.js, React, and building scalable web
                applications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Mo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Moaz
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                UX Designer
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Focused on creating intuitive interfaces and improving user
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to start your learning journey? Explore our content, engage
            with our community, and take your skills to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Reading
            </Link>
            <a
              href="/search"
              className="px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
