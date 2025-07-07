import { ArrowRight, Clock, FileText, Sparkles, Star, Zap } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
  return (
          <main className="px-6 py-12 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Powered by AI Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-600 font-medium">Powered by AI</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform PDFs into{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              concise summaries
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get a beautiful summary reel of the document in seconds. 
            Our AI-powered tool transforms lengthy PDFs into digestible insights.
          </p>

          {/* CTA Button */}
          <button className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-16">
            <span className="flex items-center space-x-2">
              <span>Try Sommaire</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process documents in seconds, not minutes. Our AI works at incredible speed.</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Extraction</h3>
              <p className="text-gray-600">Advanced AI identifies key points and creates coherent summaries.</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Time</h3>
              <p className="text-gray-600">Reduce reading time by 90% while retaining all important information.</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 mb-16">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 text-lg mb-4">
              "This tool has revolutionized how I handle research papers. What used to take hours now takes minutes!"
            </p>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                DR
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Dr. Sarah Chen</p>
                <p className="text-sm text-gray-600">Research Scientist</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your PDFs?</h2>
            <p className="text-pink-100 mb-6 text-lg">
              Join thousands of professionals who save hours every week with our AI-powered summaries.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Get Started Free
            </button>
          </div>
        </div>
      </main>
  )
}

export default HeroSection