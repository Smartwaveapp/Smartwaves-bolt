'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Shield, Trophy, Users, PaperPlane } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Users', value: '50K+', icon: Users },
  { label: 'Total Rewards', value: '$2M+', icon: Trophy },
  { label: 'Tasks Completed', value: '1M+', icon: Shield },
];

const features = [
  {
    title: 'Earn Points',
    description: 'Complete daily social media tasks to earn $SMAV tokens',
    icon: Trophy,
    color: 'purple',
  },
  {
    title: 'Community Tasks',
    description: 'Engage with the community to boost your earnings',
    icon: Users,
    color: 'green',
  },
  {
    title: 'Secure Rewards',
    description: 'Convert your points to $SMAV tokens instantly',
    icon: Shield,
    color: 'pink',
  },
];

export function HomeContent() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,#13111C,#171717)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, purple 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ rotate: -45, x: -50 }}
                animate={{ rotate: 0, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.5
                }}
              >
                <PaperPlane className="w-10 h-10 text-white transform" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold gradient-text mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Smartwave
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Earn <span className="text-purple-400">$SMAV</span> for Social Tasks
          </motion.p>

          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/auth/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 animate-glow">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Login
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 glass-card card-hover">
                <div className="mb-4">
                  <feature.icon className={`w-12 h-12 text-${feature.color}-500`} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 text-${feature.color}-300`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-400">
            Join our{' '}
            <a
              href="https://t.me/smartwave"
              className="text-purple-400 hover:text-purple-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram channel
            </a>{' '}
            for support and updates
          </p>
        </motion.div>
      </div>
    </main>
  );
}