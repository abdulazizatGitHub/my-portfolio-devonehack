// src/components/pages/SkillsPage.tsx

import React, { useState } from 'react';
import { Brain, Code, Database, Zap, Cpu } from 'lucide-react';
import { SkillCategory } from '@/types';
import skillsData from '@/data/skills.json';

export const SkillsPage: React.FC = () => {
  const [skills] = useState<SkillCategory[]>(skillsData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(category => category.category.toLowerCase().includes(selectedCategory));

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Tech Stack
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        {/* Skills Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 border-gray-400/30'
                : 'border-gray-400/30 hover:bg-gray-600/20'
            }`}
          >
            <Cpu className="w-5 h-5" />
            <span>All Skills</span>
          </button>
          <button
            onClick={() => setSelectedCategory('ai')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${
              selectedCategory === 'ai'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-400/30'
                : 'border-purple-400/30 hover:bg-purple-600/20'
            }`}
          >
            <Brain className="w-5 h-5" />
            <span>AI/ML</span>
          </button>
          <button
            onClick={() => setSelectedCategory('programming')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${
              selectedCategory === 'programming'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-400/30'
                : 'border-blue-400/30 hover:bg-blue-600/20'
            }`}
          >
            <Code className="w-5 h-5" />
            <span>Programming</span>
          </button>
          <button
            onClick={() => setSelectedCategory('web')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${
              selectedCategory === 'web'
                ? 'bg-gradient-to-r from-green-600 to-green-700 border-green-400/30'
                : 'border-green-400/30 hover:bg-green-600/20'
            }`}
          >
            <Database className="w-5 h-5" />
            <span>Web & Data</span>
          </button>
        </div>

        {/* Skills Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredSkills.map((skillCategory, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all"
            >
              <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {skillCategory.category}
              </h3>
              
              <div className="space-y-6">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-white font-semibold">{skill.name}</span>
                        <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                          {skill.years}y exp
                        </span>
                      </div>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Neural activity indicator */}
                      <div className="absolute -top-1 transition-all duration-300 ease-out" style={{ left: `${skill.level}%` }}>
                        <div className="w-5 h-5 bg-cyan-400 rounded-full border-4 border-black/40 animate-pulse transform -translate-x-1/2 group-hover:scale-125 transition-transform"></div>
                      </div>
                    </div>
                    
                    {skill.description && (
                      <p className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tech Radar */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technology Radar
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Core Technologies */}
            <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl border border-purple-400/20 hover:border-purple-400/50 transition-all">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Core AI/ML</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>PyTorch • TensorFlow</div>
                <div>GANs • CNNs • NLP</div>
                <div>Computer Vision</div>
              </div>
              <div className="mt-4 text-xs text-gray-400">
                Expert Level
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl border border-blue-400/20 hover:border-blue-400/50 transition-all">
              <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Web Technologies</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Next.js • React</div>
                <div>Node.js • Express</div>
                <div>TypeScript • APIs</div>
              </div>
              <div className="mt-4 text-xs text-gray-400">
                Advanced Level
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl border border-green-400/20 hover:border-green-400/50 transition-all">
              <Database className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-green-400 mb-3">Data & Backend</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>PostgreSQL • MongoDB</div>
                <div>Firebase • REST APIs</div>
                <div>Data Processing</div>
              </div>
              <div className="mt-4 text-xs text-gray-400">
                Proficient Level
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-xl border border-orange-400/20 hover:border-orange-400/50 transition-all">
              <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-orange-400 mb-3">Development</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Git • GitHub</div>
                <div>Docker • AWS</div>
                <div>CI/CD • Testing</div>
              </div>
              <div className="mt-4 text-xs text-gray-400">
                Intermediate Level
              </div>
            </div>
          </div>
        </div>

        {/* Certification Timeline */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Learning Journey
          </h3>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-400"></div>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center relative z-10">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">Advanced AI/ML Mastery</h4>
                  <p className="text-gray-400 mb-2">2023 - Present</p>
                  <p className="text-gray-300">Specialized in GANs, Computer Vision, and Deep Learning architectures</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded">PyTorch</span>
                    <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">GANs</span>
                    <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Computer Vision</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center relative z-10">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">Full-Stack Development</h4>
                  <p className="text-gray-400 mb-2">2022 - 2024</p>
                  <p className="text-gray-300">MERN Stack, Next.js, and modern web technologies</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Next.js</span>
                    <span className="text-xs bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">TypeScript</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center relative z-10">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">Software Engineering Fundamentals</h4>
                  <p className="text-gray-400 mb-2">2021 - 2023</p>
                  <p className="text-gray-300">Data structures, algorithms, and software design patterns</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-red-600/20 text-red-300 px-2 py-1 rounded">Java</span>
                    <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">C++</span>
                    <span className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded">Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Visualization */}
        <div className="mt-16 bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Skills Visualization</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.flatMap(category => category.items).slice(0, 12).map((skill, index) => (
              <div key={index} className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-600/30 hover:border-cyan-400/50 transition-all">
                <div className="w-16 h-16 mx-auto mb-3 relative">
                  <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center relative">
                    <div 
                      className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center"
                      style={{ 
                        background: `conic-gradient(from 0deg, #06b6d4 ${skill.level * 3.6}deg, #374151 ${skill.level * 3.6}deg)` 
                      }}
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{skill.name}</h4>
                <p className="text-xs text-gray-400">{skill.years}y experience</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};