import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import aboutImage from '../assets/about.png' // Import the about image

function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="max-w-[1250px] mx-auto p-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-12 gap-8" data-aos="fade-up">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#015551] mb-4">
            About RecruitAi
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            We're revolutionizing the recruitment industry with AI-powered solutions that connect the right talent with the right opportunities.
          </p>
        </div>
        <div className="md:w-1/2 lg:px-8 xl:px-12">
          <img 
            src={aboutImage} 
            alt="About RecruitAi" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-12 bg-[#f8f9fa] rounded-lg my-8 p-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#015551] mb-8 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
          At RecruitAi, we're on a mission to transform the hiring process by leveraging artificial intelligence to create more efficient, accurate, and bias-free recruitment experiences for both employers and job seekers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-[#015551]/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Efficiency</h3>
            <p className="text-gray-700">
              Streamlining the recruitment process to save time and resources for organizations of all sizes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#015551]/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Accuracy</h3>
            <p className="text-gray-700">
              Using AI to match candidates with positions based on skills, experience, and cultural fit.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-[#015551]/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#015551]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#015551] mb-3">Inclusivity</h3>
            <p className="text-gray-700">
              Reducing bias in hiring by focusing on qualifications rather than demographic factors.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section - UPDATED */}
      <div className="py-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#015551] mb-8 text-center">Our Story</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4" data-aos="fade-up" data-aos-delay="100">
            RecruitAi started as a side project born from a passion for improving the recruitment process. As job seekers and hiring managers ourselves, we experienced firsthand the frustrations of traditional hiring methods – endless resume sorting, mismatched candidates, and time-consuming processes.
          </p>
          <p className="text-gray-700 mb-4" data-aos="fade-up" data-aos-delay="200">
            This project represents our vision of what recruitment could be: streamlined, efficient, and powered by AI. We're not a large corporation with hundreds of employees – we're a small team of enthusiasts who believe technology can transform how people find jobs and how companies find talent.
          </p>
          <p className="text-gray-700" data-aos="fade-up" data-aos-delay="300">
            While RecruitAi may have started as a side project, we approach it with professional dedication and a genuine desire to create something useful. We're continuously learning, improving, and refining our platform based on user feedback and the latest advancements in AI technology.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FFFDF6] border border-gray-200 rounded-lg p-8 my-12 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#015551] mb-4">Ready to Join the Future of Recruitment?</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Experience the power of AI-driven recruitment and transform how you find talent.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/post"
            className="px-8 py-3 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all font-medium inline-block"
          >
            Post a Job
          </Link>
          <Link
            to="/#contact"
            className="px-8 py-3 border border-[#015551] text-[#015551] rounded-lg hover:bg-gray-100 transition-all font-medium inline-block"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About