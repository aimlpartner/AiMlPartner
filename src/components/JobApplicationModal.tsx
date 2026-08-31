import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

export function JobApplicationModal({ isOpen, onClose, jobId, jobTitle }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinUrl: '',
    coverLetter: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await addDoc(collection(db, 'job_applications'), {
        jobId,
        jobTitle,
        name: formData.name,
        email: formData.email,
        linkedinUrl: formData.linkedinUrl,
        coverLetter: formData.coverLetter,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', email: '', linkedinUrl: '', coverLetter: '' });
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-white mb-2">Apply for {jobTitle}</h2>
              <p className="text-zinc-400 text-sm">Please provide your details below.</p>
            </div>

            {status === 'success' ? (
              <div className="bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] p-4 text-center font-bold">
                Application submitted successfully! We'll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-[#FF5500] transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-[#FF5500] transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="linkedinUrl" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">LinkedIn / Portfolio URL</label>
                  <input
                    type="url"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    required
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-[#FF5500] transition-colors"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">Cover Letter / Note</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-[#FF5500] transition-colors resize-none"
                    placeholder="Tell us why you're a great fit..."
                  />
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-sm font-bold">
                    An error occurred. Please try again later.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-[#FF5500] hover:bg-white text-black font-display font-black text-xs uppercase tracking-widest px-8 py-4 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  <Send size={15} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
