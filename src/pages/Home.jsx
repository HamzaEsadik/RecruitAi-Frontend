import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import heroImage from '../assets/hero.png'

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="max-w-[1250px] mx-auto p-3 md:p-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between pb-8 md:pb-12 pt-16 md:pt-24 gap-6 md:gap-8" data-aos="fade-up">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#015551] mb-4">
            AI-Powered Recruitment Solution
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Streamline your hiring process with our intelligent recruitment platform. 
            Post jobs, screen candidates, and find the perfect match with AI assistance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/post"
              className="px-6 py-3 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all font-medium"
            >
              Post a Job
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-[#015551] text-[#015551] rounded-lg hover:bg-gray-100 transition-all font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="px-0 lg:px-8 xl:px-12">
            <img 
              src={heroImage} 
              alt="RecruitAI Platform" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-8 md:py-12 bg-[#f8f9fa] rounded-lg my-6 md:my-8 p-4 md:p-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#015551] mb-8 text-center">Why Choose RecruitAi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-start mb-3">
              <span className="text-[#015551] font-bold text-xl mr-3">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-[#015551]">AI-powered Matching</h3>
                <p className="text-gray-700 mt-2">
                  Our intelligent algorithms match candidates to your job requirements with unprecedented accuracy.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-start mb-3">
              <span className="text-[#015551] font-bold text-xl mr-3">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-[#015551]">Streamlined Process</h3>
                <p className="text-gray-700 mt-2">
                  Simplify your recruitment workflow with our intuitive platform designed for efficiency.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-start mb-3">
              <span className="text-[#015551] font-bold text-xl mr-3">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-[#015551]">Comprehensive Analytics</h3>
                <p className="text-gray-700 mt-2">
                  Gain valuable insights with detailed metrics and reporting on your recruitment campaigns.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-start mb-3">
              <span className="text-[#015551] font-bold text-xl mr-3">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-[#015551]">Time-Saving Automation</h3>
                <p className="text-gray-700 mt-2">
                  Automate repetitive tasks and focus on what matters most - finding the right talent for your organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8 md:py-12" data-aos="fade-up" id="features">
        <h2 className="text-3xl font-bold text-[#015551] mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-[#015551]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Job Posting</h3>
            <p className="text-gray-700">
              Create detailed job listings with custom requirements, skills, and qualifications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#015551]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">AI Screening</h3>
            <p className="text-gray-700">
              Let our AI analyze resumes and match candidates to your job requirements automatically.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-[#015551]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Analytics</h3>
            <p className="text-gray-700">
              Track application metrics and candidate quality with our comprehensive dashboard.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="400">
            <div className="bg-[#015551]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Interview Scheduling</h3>
            <p className="text-gray-700">
              Coordinate interviews effortlessly with our integrated scheduling system.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-[#015551]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Fast Processing</h3>
            <p className="text-gray-700">
              Process applications quickly with our optimized workflow and automated candidate ranking.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#015551]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Data Security</h3>
            <p className="text-gray-700">
              Keep candidate information secure with our enterprise-grade security protocols.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section - NEW SECTION */}
      <div className="py-8 md:py-12 bg-[#f8f9fa] rounded-lg my-6 md:my-8 p-4 md:p-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#015551] mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-[#015551] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Post Your Job</h3>
            <p className="text-gray-700">
              Create a detailed job listing with all requirements, responsibilities, and qualifications needed.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#015551] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">AI Matches Candidates</h3>
            <p className="text-gray-700">
              Our AI algorithm analyzes applications and ranks candidates based on your specific requirements.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-[#015551] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Interview & Hire</h3>
            <p className="text-gray-700">
              Review top candidates, schedule interviews, and make informed hiring decisions with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FFFDF6] border border-gray-200 rounded-lg p-4 md:p-8 my-8 md:my-12 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#015551] mb-4">Ready to Transform Your Hiring Process?</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Join thousands of companies using RecruitAi to find the best talent faster and more efficiently.
        </p>
        <Link
          to="/post"
          className="px-8 py-3 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all font-medium inline-block"
        >
          Get Started Today
        </Link>
      </div>

      {/* Contact Section */}
      <div className="py-8 md:py-12" id="contact" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#015551] mb-8 text-center">Contact Us</h2>
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-semibold text-[#015551] mb-4">Get in Touch</h3>
              <p className="text-gray-700 mb-6">
                Have questions about our platform? Want to schedule a demo? Our team is here to help you optimize your recruitment process.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>hamza.esadik.m@gmail.com</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#015551] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+212 716-32-6994</span>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#015551] focus:border-[#015551]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#015551] focus:border-[#015551]"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#015551] focus:border-[#015551]"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#015551] focus:border-[#015551]"
                    placeholder="Tell us more about your needs..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#015551] text-white rounded-md hover:bg-[#01403d] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home