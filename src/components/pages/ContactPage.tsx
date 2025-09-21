// src/components/pages/ContactPage.tsx

import React, { useState } from 'react';
import { MessageSquare, Mail, Linkedin, Github, MapPin, Calendar, Activity, Zap, ChevronRight, Send } from 'lucide-react';
import personalData from '@/data/personal.json';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'AI/ML Collaboration',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: 'AI/ML Collaboration', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Let's collaborate on innovative AI/ML projects or discuss exciting opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3" />
                Let's Connect
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group hover:bg-gray-800/30 p-3 rounded-lg transition-all">
                  <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-600/30 transition-all">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Email</h4>
                    <a href={`mailto:${personalData.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                      {personalData.email}
                    </a>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>

                <div className="flex items-center space-x-4 group hover:bg-gray-800/30 p-3 rounded-lg transition-all">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-all">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">LinkedIn</h4>
                    <a href={personalData.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                      Connect with me professionally
                    </a>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>

                <div className="flex items-center space-x-4 group hover:bg-gray-800/30 p-3 rounded-lg transition-all">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/30 transition-all">
                    <Github className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">GitHub</h4>
                    <a href={personalData.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Explore my repositories
                    </a>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>

                <div className="flex items-center space-x-4 group hover:bg-gray-800/30 p-3 rounded-lg transition-all">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600/30 transition-all">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Location</h4>
                    <p className="text-gray-400">{personalData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3" />
                Current Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Available for new opportunities</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400">Open to AI/ML collaborations</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-400">Interested in research partnerships</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-400">Available for freelance projects</span>
                </div>
                
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Response Time:</strong> Usually within 24 hours
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    <strong className="text-white">Best Contact:</strong> Email for detailed discussions
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    <strong className="text-white">Time Zone:</strong> PKT (UTC+5)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3" />
              Send Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Subject
                </label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white"
                >
                  <option>AI/ML Collaboration</option>
                  <option>Job Opportunity</option>
                  <option>Research Partnership</option>
                  <option>Project Discussion</option>
                  <option>Freelance Work</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Message *
                </label>
                <textarea 
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 resize-none transition-all"
                  placeholder="Tell me about your project, opportunity, or what you'd like to discuss..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : submitStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 border-l-2 border-b-2 border-green-600 rotate-[-45deg] transform"></div>
                    </div>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="text-center text-green-400 text-sm">
                  Thank you! I'll get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Neural Network Connection Visualization */}
        <div className="text-center">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Neural Connection Established</h3>
            <div className="grid grid-cols-8 gap-2 max-w-md mx-auto mb-6">
              {Array.from({length: 32}).map((_, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse opacity-60"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationDuration: '2s'
                  }}
                ></div>
              ))}
            </div>
            <p className="text-gray-400 mb-4">
              Ready to process your message through advanced neural pathways
            </p>
            
            {/* Contact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">24h</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-sm text-gray-400">Response Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-sm text-gray-400">Collaborations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};