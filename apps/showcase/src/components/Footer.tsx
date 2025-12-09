'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Heart, ExternalLink } from 'lucide-react';

const footerLinks = [
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: 'https://docs-spinozaos.mustafasarac.com' },
      { label: 'GitHub', href: 'https://github.com/mrsarac/spinozaos' },
      { label: 'NPM Package', href: 'https://www.npmjs.com/org/spinozaos' },
      { label: 'Storybook', href: '#' },
    ],
  },
  {
    title: 'Packages',
    links: [
      { label: '@spinozaos/react', href: 'https://www.npmjs.com/package/@spinozaos/react' },
      { label: '@spinozaos/tokens', href: 'https://www.npmjs.com/package/@spinozaos/tokens' },
      { label: '@spinozaos/motion', href: 'https://www.npmjs.com/package/@spinozaos/motion' },
      { label: '@spinozaos/tailwind', href: 'https://www.npmjs.com/package/@spinozaos/tailwind' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Substance', href: 'https://substance.mustafasarac.com' },
      { label: 'Spinoza', href: 'https://spinoza.mustafasarac.com' },
      { label: 'Forge', href: 'https://forge.mustafasarac.com' },
      { label: 'mustafasarac.com', href: 'https://mustafasarac.com' },
    ],
  },
];

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, href: 'https://github.com/mrsarac', label: 'GitHub' },
  { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/mustafasarac', label: 'Twitter' },
  { icon: <Mail className="w-5 h-5" />, href: 'mailto:hello@mustafasarac.com', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-20">
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.3) 20%, rgba(20,184,166,0.3) 50%, rgba(139,92,246,0.3) 80%, transparent)',
        }}
      />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-spinoza-yellow/20 to-spinoza-gold/10 border border-spinoza-yellow/40 flex items-center justify-center">
                  <span className="text-spinoza-yellow font-serif text-xl font-bold">S</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-white tracking-wide">
                    SPINOZA<span className="text-spinoza-yellow">OS</span>
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-400 mb-6 max-w-sm leading-relaxed">
                Design System for the Age of Superintelligence. Built with precision,
                crafted for the future of human-AI interaction.
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-spinoza-yellow/30 hover:bg-spinoza-yellow/10 transition-colors"
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column, columnIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (columnIndex + 1) }}
            >
              <h4 className="text-xs font-mono uppercase tracking-wider text-spinoza-yellow mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-neutral-500 flex items-center gap-1.5"
          >
            Built with <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" /> by{' '}
            <a
              href="https://mustafasarac.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-spinoza-yellow transition-colors"
            >
              Mustafa Saraç
            </a>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <span className="text-xs font-mono text-neutral-600">
              © {new Date().getFullYear()} SpinozaOS
            </span>
            <span className="text-neutral-700">•</span>
            <span className="text-xs font-mono text-neutral-500 italic">
              "More Geometrico"
            </span>
          </motion.div>
        </div>
      </div>

      {/* Very bottom accent */}
      <div className="h-1 bg-gradient-to-r from-spinoza-yellow via-teal-500 to-purple-500 opacity-50" />
    </footer>
  );
}
