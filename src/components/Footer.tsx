import { Separator } from "@/components/ui/separator"
import { Title } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Side - Logo */}
          <div className="md:w-1/4">
            <span className="text-3xl font-bold text-purple-600">{Title}</span>
          </div>

          {/* Right Side - Three Columns */}
          <div className=" flex grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 - Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Audio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Furniture
                  </a>
                </li>
              </ul>
            </div>
            <Separator orientation="vertical" />
            {/* Column 2 - Collections */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Collections
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Latest Drops
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Weekly Picks
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <Separator orientation="vertical" />
            {/* Column 3 - Code */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Code</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Source code
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SOFN Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
