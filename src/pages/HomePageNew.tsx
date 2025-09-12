import React from 'react';
import {
  Users,
  Disc3,
  BookOpen,
  DollarSign,
  Headphones,
  TrendingUp,
  Rocket,
  Bell,
  Target,
  Upload,
  BarChart3,
  Building2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { ProgressBar, Badge } from '../components/ui/UIElements';

interface StatCard {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  desc: string;
  growth: string;
  bgColor: string;
}

interface PerformanceMetric {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  trend: string;
  gradient: string;
  trendIcon: React.ComponentType<{ size?: number; className?: string }>;
}

interface Activity {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  details: string;
  status: string;
}

const HomePageNew: React.FC = () => {
  const stats: StatCard[] = [
    {
      icon: Users,
      title: '25',
      subtitle: 'Active Artists',
      desc: 'New signings this month',
      growth: '+12%',
      bgColor: 'bg-blue-500'
    },
    {
      icon: Disc3,
      title: '45',
      subtitle: 'Total Releases',
      desc: 'Albums & Singles released',
      growth: '+8%',
      bgColor: 'bg-purple-500'
    },
    {
      icon: BookOpen,
      title: '12',
      subtitle: 'Published Books',
      desc: 'Books in our catalog',
      growth: '+15%',
      bgColor: 'bg-green-500'
    },
    {
      icon: DollarSign,
      title: '$125,000',
      subtitle: 'Revenue',
      desc: 'Monthly revenue',
      growth: '+23%',
      bgColor: 'bg-yellow-500'
    }
  ];





  const recentActivities: Activity[] = [
    {
      icon: Disc3,
      title: "New album 'Midnight Dreams' released",
      details: 'by The Synthwave • 2 hours ago',
      status: '✅'
    },
    {
      icon: BookOpen,
      title: "Book 'Digital Future' published",
      details: 'by Alex Chen • 5 hours ago',
      status: '✅'
    },
    {
      icon: BarChart3,
      title: 'Monthly analytics report generated',
      details: '1M+ streams • 1 day ago',
      status: '✅'
    },
    {
      icon: Users,
      title: "New artist 'Neon Beats' signed",
      details: 'Electronic • 2 days ago',
      status: '✅'
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* HERO SECTION with new graphics */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10 flex items-center justify-center">
          <BarChart3 size={128} className="text-white" />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl shadow-lg bg-white bg-opacity-20 flex items-center justify-center">
              <Building2 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome to HardbanRecords Lab</h1>
              <p className="text-xl text-purple-100 mb-6">Your complete music distribution and digital publishing platform</p>

              <div className="flex flex-wrap gap-4">
                <Badge variant="success" size="md">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                  All systems operational
                </Badge>
                <Badge variant="info" size="md">
                  <TrendingUp size={16} className="mr-2" />
                  Revenue up 23% this month
                </Badge>
                <Badge variant="warning" size="md">
                  28 active projects
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center p-2`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <Badge variant="success" size="sm">{stat.growth}</Badge>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.title}</h3>
            <p className="text-lg font-medium text-gray-700 mb-1">{stat.subtitle}</p>
            <p className="text-sm text-gray-500">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Upload size={32} className="text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="primary">
            <Disc3 size={16} />
            Add New Release
          </Button>
          <Button variant="secondary">
            <BookOpen size={16} />
            Publish Book
          </Button>
          <Button variant="pill">
            <BarChart3 size={16} />
            View Analytics
          </Button>
          <Button variant="ghost">
            <Users size={16} />
            Manage Artists
          </Button>
        </div>
      </div>

      {/* PERFORMANCE METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Headphones size={24} />
              <Badge variant="success" size="sm">+18%</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">2.4M</h3>
            <p className="text-lg font-medium opacity-90 mb-3">Total Streams</p>
            <ProgressBar progress={85} color="#ffffff" height={6} showLabel={false} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <BookOpen size={24} />
              <Badge variant="warning" size="sm">+31%</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">1,247</h3>
            <p className="text-lg font-medium opacity-90 mb-3">Book Sales</p>
            <ProgressBar progress={92} color="#ffffff" height={6} showLabel={false} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Rocket size={24} />
              <Badge variant="info" size="sm">+7 new</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">28</h3>
            <p className="text-lg font-medium opacity-90 mb-3">Active Projects</p>
            <ProgressBar progress={67} color="#ffffff" height={6} showLabel={false} />
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY & CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Bell size={24} className="text-gray-700" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <activity.icon size={20} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <div className="text-lg">{activity.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <Target size={28} className="text-white" />
            Ready to create something amazing?
          </h2>
          <p className="text-lg text-indigo-100 mb-6">
            Start your next music release or book publishing project today
          </p>
          <div className="space-y-3">
            <button className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3">
              <Disc3 size={20} />
              Create Music Release
            </button>
            <button className="w-full bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-800 transition-colors flex items-center justify-center gap-3">
              <BookOpen size={20} />
              Publish New Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageNew;
