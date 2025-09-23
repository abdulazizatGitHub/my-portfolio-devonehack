// src/components/pages/AboutPage.tsx

import React from 'react';
import { Brain, Award, Briefcase, MapPin, Calendar, Mail, Linkedin, Github, User } from 'lucide-react';
import personalData from '@/data/personal.json';
import profileImage from '@/assets/usre.jpeg';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate AI/ML Engineer crafting the future with neural networks and innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10 sticky top-24">
              <div className="text-center mb-8">
                <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                  <img
                    src={profileImage.src}
                    alt={personalData.name}
                    width={128}
                    height={128}
                    className="w-40 h-40 rounded-full text-white"
                   />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{personalData.name}</h2>
                <p className="text-cyan-400 mb-4">{personalData.title}</p>
                <div className="flex items-center justify-center space-x-2 text-gray-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalData.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Available for opportunities</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <a href={`mailto:${personalData.email}`} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{personalData.email}</span>
                </a>
                <a href={personalData.social.linkedin} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">LinkedIn Profile</span>
                </a>
                <a href={personalData.social.github} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all">
                  <Github className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3" />
                Biography
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>{personalData.bio}</p>
                <p>
                  My expertise spans from theoretical research in deep learning architectures to practical implementations in production environments. 
                  I've had the privilege of working on innovative projects ranging from IoT security systems using novel GAN architectures to 
                  advanced computer vision applications for e-commerce.
                </p>
                <p>
                  When I'm not training neural networks or optimizing algorithms, I enjoy contributing to open-source projects and 
                  sharing knowledge with the developer community. I believe in the power of technology to create positive change 
                  and am always excited to collaborate on projects that push the boundaries of what's possible with AI.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3" />
                Education & Research
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-cyan-400 pl-6">
                  <h4 className="text-xl font-semibold text-white mb-2">{personalData.education.degree}</h4>
                  <p className="text-cyan-400 mb-2">{personalData.education.university}</p>
                  <p className="text-gray-400 mb-3">{personalData.education.duration} • CGPA: {personalData.education.cgpa}</p>
                  <p className="text-gray-300">
                    Specialized in artificial intelligence, machine learning, and software engineering with a focus on 
                    research and practical applications of deep learning technologies.
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Research Project</h4>
                  <p className="text-purple-400 mb-2">Intrusion Detection in IoT Networks using Deep Learning-based GAN Architecture</p>
                  <p className="text-gray-400 mb-3">Sept 2024 – June 2025</p>
                  <p className="text-gray-300">
                    Proposed Dynamic Class-Weighted GAN (DCSW-GAN) with adaptive loss weighting to address class imbalance, 
                    achieving improved minority-class recall and F1-score on UNSW-NB15 and CICIDS-2017 datasets.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3" />
                Professional Experience
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="text-xl font-semibold text-white mb-2">AI/ML Intern</h4>
                  <p className="text-green-400 mb-2">OMNISOLVE AI • Remote</p>
                  <p className="text-gray-400 mb-3">Aug 2025 – Present</p>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Worked on Virtual Try-On E-commerce System using CP-VTON models fine-tuned on proprietary datasets</li>
                    <li>• Developing personalized e-commerce shopbot with human-like conversation capabilities</li>
                    <li>• Implementing context-aware recommendation systems beyond traditional FAQ bots</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Languages</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personalData.languages.map((language, index) => (
                  <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-blue-400 mb-2">{language.name}</h4>
                    <p className="text-gray-300">{language.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};