"use client"
import { Shield, Users, Eye, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Footer from "./HelpingComponents/Footer"

const CopConnectLanding = () => {
  const portalOptions = [
    {
      title: "Police",
      icon: Shield,
      description: "Law enforcement portal access",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      title: "Citizen",
      icon: Users,
      description: "Public services and reporting",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Anonymous",
      icon: Eye,
      description: "Submit anonymous tips",
      gradient: "from-teal-400 to-cyan-500",
    },
    {
      title: "Admin",
      icon: Settings,
      description: "System administration",
      gradient: "from-indigo-600 to-purple-600",
    },
  ]

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Shield className="text-blue-400 h-8 w-8" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                CopConnect
              </span>
            </div>
            <Link
              href="/supportPages/about"
              className="text-blue-300 hover:text-blue-100 transition-colors flex items-center space-x-1 group"
            >
              <span>About Us</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Welcome to CopConnect
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">
            Select your portal to access dedicated services and features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {portalOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/login?role=${option.title.toLowerCase()}`} className="block group">
                <div
                  className={`p-6 rounded-xl bg-gradient-to-r ${option.gradient} 
                   hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300
                   border border-blue-400/20 cursor-pointer relative overflow-hidden`}
                >
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">{option.title}</h2>
                      <p className="text-blue-100 mt-1">{option.description}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
    <Footer />
    </>
  )
}

export default CopConnectLanding

