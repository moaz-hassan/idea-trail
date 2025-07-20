import Link from "next/link";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold">BlogHub</span>
            </div>
            <p className="text-gray-400 max-w-md">
              A modern blog platform for sharing ideas, tutorials, and insights about technology, 
              design, and development. Join our community of writers and readers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-gray-400 hover:text-white transition-colors">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/trends" className="text-gray-400 hover:text-white transition-colors">
                  Trends
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/technology" className="text-gray-400 hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-gray-400 hover:text-white transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/category/development" className="text-gray-400 hover:text-white transition-colors">
                  Development
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 BlogHub. Built with 💻 by the BlogHub Team
          </p>
        </div>
      </div>
    </footer>
    );
}

export default Footer;
