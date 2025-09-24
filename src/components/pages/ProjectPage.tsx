// src/components/pages/ProjectsPage.tsx

import React, { useState, useEffect } from 'react';
import { Brain, Code, Database, ChevronRight, ExternalLink, Github, Eye, Filter } from 'lucide-react';
import { Project } from '@/types';
import projectsDataJson from '@/data/projects.json';
import personalDataJson from '@/data/personal.json';
const projectsData = projectsDataJson as Project[];

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [projects] = useState<Project[]>(projectsData);
  const [githubStats, setGithubStats] = useState<{
    repos: number;
    commits: number;
    stars: number;
  } | null>(null);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          setGithubStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub stats:", err);
      }
    };
    fetchGithubStats();
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Filter, color: 'gray' },
    { id: 'ai-ml', label: 'AI/ML', icon: Brain, color: 'purple' },
    { id: 'web-dev', label: 'Web Development', icon: Code, color: 'blue' },
    { id: 'research', label: 'Research', icon: Database, color: 'green' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400';
      case 'in-progress': return 'bg-yellow-400';
      case 'research': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai-ml': return 'bg-purple-800/50 text-purple-300 border-purple-400/20';
      case 'web-dev': return 'bg-blue-800/50 text-blue-300 border-blue-400/20';
      case 'research': return 'bg-green-800/50 text-green-300 border-green-400/20';
      default: return 'bg-gray-800/50 text-gray-300 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Innovative solutions powered by AI, machine learning, and cutting-edge technology
          </p>
        </div>

        {/* Project Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r from-${category.color}-600 to-${category.color}-700 border-${category.color}-400/30`
                  : `border-${category.color}-400/30 hover:bg-${category.color}-600/20`
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group"
            >
              {/* Project Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${getStatusColor(project.status)}`}></div>
                      <span className={`text-sm px-3 py-1 rounded-full border ${getCategoryColor(project.category)}`}>
                        {project.category === 'ai-ml' ? 'AI/ML' : 
                         project.category === 'web-dev' ? 'Web Dev' : 'Research'}
                      </span>
                      {project.featured && (
                        <span className="text-sm px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-300 border border-yellow-400/20">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 text-sm bg-gray-800/70 text-gray-300 rounded-full border border-gray-600/50 hover:border-cyan-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-3">Key Highlights:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, hlIndex) => (
                      <li key={hlIndex} className="flex items-start space-x-2 text-sm text-gray-300">
                        <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/50 transition-all group/link"
                    >
                      <Github className="w-4 h-4 text-gray-400 group-hover/link:text-white" />
                      <span className="text-gray-400 group-hover/link:text-white">Code</span>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover/link:text-gray-300" />
                    </a>
                  )}
                  
                  {project.demo && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 rounded-lg border border-cyan-400/50 transition-all group/link"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400">Demo</span>
                      <ExternalLink className="w-3 h-3 text-cyan-300" />
                    </a>
                  )}
                </div>
              </div>

              {/* Neural Network Visualization for each project */}
              <div className="h-20 bg-gradient-to-r from-black/20 via-gray-900/20 to-black/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="grid grid-cols-8 gap-2">
                    {Array.from({length: 24}).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          project.category === 'ai-ml' ? 'bg-purple-400' :
                          project.category === 'web-dev' ? 'bg-blue-400' : 'bg-green-400'
                        }`}
                        style={{
                          animationDelay: `${i * 100}ms`,
                          animationDuration: '2s'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Project Status Indicator */}
                <div className="absolute top-2 right-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} animate-pulse`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Integration Section */}
        <div className="text-center">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Explore More on GitHub</h3>
            <p className="text-gray-400 mb-6">
              Discover additional projects, contributions, and code snippets in my GitHub repositories
            </p>
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{githubStats?.repos ?? "--"}</div>
                <div className="text-sm text-gray-400">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{githubStats?.commits ?? "--"}</div>
                <div className="text-sm text-gray-400">Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{githubStats?.stars ?? "--"}</div>
                <div className="text-sm text-gray-400">Stars</div>
              </div>
            </div>
            <div className="mt-6">
              <a 
                href={personalDataJson.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all"
              >
                <Github className="w-5 h-5" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};