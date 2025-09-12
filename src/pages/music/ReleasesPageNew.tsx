import React, { useState } from 'react';

interface Release {
  id: string;
  title: string;
  artist: string;
  type: 'album' | 'single' | 'ep';
  status: 'draft' | 'processing' | 'live' | 'rejected';
  platforms: string[];
  releaseDate: string;
  streams: number;
  revenue: number;
  cover: string;
}

const ReleasesPageNew: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'draft' | 'live' | 'processing'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const releases: Release[] = [
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'The Synthwave',
      type: 'album',
      status: 'live',
      platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
      releaseDate: '2024-01-15',
      streams: 892000,
      revenue: 4200,
      cover: '🎵'
    },
    {
      id: '2',
      title: 'Electric Pulse',
      artist: 'Neon Beats',
      type: 'single',
      status: 'live',
      platforms: ['All Platforms'],
      releaseDate: '2024-02-10',
      streams: 645000,
      revenue: 3100,
      cover: '🎶'
    },
    {
      id: '3',
      title: 'Urban Vibes',
      artist: 'City Sound',
      type: 'ep',
      status: 'processing',
      platforms: ['Pending'],
      releaseDate: '2024-03-01',
      streams: 0,
      revenue: 0,
      cover: '🎸'
    },
    {
      id: '4',
      title: 'Deep House Session',
      artist: 'DJ Pulse',
      type: 'single',
      status: 'draft',
      platforms: ['None'],
      releaseDate: '2024-03-15',
      streams: 0,
      revenue: 0,
      cover: '🎧'
    }
  ];

  const filteredReleases = releases.filter(release => {
    if (selectedTab === 'all') return true;
    return release.status === selectedTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'album': return 'bg-purple-100 text-purple-800';
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'ep': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🎵 Music Releases</h1>
            <p className="text-gray-600 mt-2">Manage all your music releases and distribution</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add New Release</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
          {(['all', 'live', 'processing', 'draft'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                selectedTab === tab
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 text-xs">
                ({tab === 'all' ? releases.length : releases.filter(r => r.status === tab).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Releases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReleases.map((release) => (
          <div
            key={release.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
          >
            {/* Cover & Basic Info */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                  {release.cover}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{release.title}</h3>
                  <p className="text-sm text-gray-600">{release.artist}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(release.type)}`}>
                      {release.type.toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(release.status)}`}>
                      {release.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 border-b border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Streams</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {release.streams > 0 ? `${(release.streams / 1000).toFixed(0)}K` : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {release.revenue > 0 ? `$${release.revenue.toLocaleString()}` : '—'}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Release Date</p>
                <p className="text-sm font-medium text-gray-900">{new Date(release.releaseDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Platforms */}
            <div className="p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Platforms</p>
              <div className="flex flex-wrap gap-2">
                {release.platforms.map((platform, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {platform}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium py-2 px-3 rounded-md transition-colors">
                  Analytics
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Release Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Add New Release</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Release Title</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter release title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Artist Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter artist name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Release Type</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">Select type</option>
                      <option value="single">Single</option>
                      <option value="ep">EP</option>
                      <option value="album">Album</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Electronic, Pop, Rock, etc."
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Media Files</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Audio File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
                      <p className="text-gray-600">Drag & drop audio file or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">MP3, WAV, FLAC (max 100MB)</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Art</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
                      <p className="text-gray-600">Drag & drop cover image</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG (min 3000x3000px)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribution Platforms */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Distribution Platforms</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Deezer', 'Tidal'].map((platform) => (
                    <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Create Release
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredReleases.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No releases found</h3>
          <p className="text-gray-600 mb-4">
            {selectedTab === 'all' 
              ? "You haven't created any releases yet." 
              : `No releases with status "${selectedTab}".`}
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Create Your First Release
          </button>
        </div>
      )}
    </div>
  );
};

export default ReleasesPageNew;
