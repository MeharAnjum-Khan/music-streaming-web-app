import React, { useState } from 'react';
import { 
  Upload, 
  Music, 
  Mic, 
  FileAudio, 
  Image as ImageIcon,
  X, 
  Check, 
  AlertCircle,
  Calendar,
  Clock,
  User,
  Globe,
  Lock,
  Tag,
  FileText
} from 'lucide-react';

const AdminUpload = () => {
  // ========== STATE MANAGEMENT ==========
  const [uploadType, setUploadType] = useState('music'); // 'music' or 'podcast'
  const [uploadStep, setUploadStep] = useState(1); // 1: File, 2: Details, 3: Review
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  // Form state for music
  const [musicForm, setMusicForm] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseDate: '',
    duration: '',
    explicit: false,
    visibility: 'public',
    tags: ''
  });
  
  // Form state for podcast
  const [podcastForm, setPodcastForm] = useState({
    title: '',
    host: '',
    description: '',
    category: '',
    episodeNumber: '',
    duration: '',
    visibility: 'public',
    tags: ''
  });

  // ========== GENRES AND CATEGORIES ==========
  const musicGenres = [
    'Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Electronic', 'Classical', 
    'R&B', 'Country', 'Reggae', 'Metal', 'Indie', 'Folk'
  ];
  
  const podcastCategories = [
    'Technology', 'Business', 'Comedy', 'News', 'Education',
    'Health', 'Sports', 'Entertainment', 'Science', 'Arts'
  ];

  // ========== EVENT HANDLERS ==========
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const audioFiles = files.filter(file => 
      file.type.startsWith('audio/') || 
      file.name.match(/\.(mp3|wav|m4a|flac|aac)$/i)
    );
    
    if (audioFiles.length > 0) {
      setUploadedFiles(audioFiles);
      setUploadStep(2);
    } else {
      alert('Please select valid audio files (MP3, WAV, M4A, FLAC, AAC)');
    }
  };

  const handleMusicFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMusicForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePodcastFormChange = (e) => {
    const { name, value } = e.target;
    setPodcastForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length === 1) {
      setUploadStep(1);
    }
  };

  const handleGoBack = () => {
    if (uploadStep > 1) {
      setUploadStep(uploadStep - 1);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadStep(3);
    simulateUpload();
  };

  const handleReset = () => {
    setUploadStep(1);
    setUploadedFiles([]);
    setMusicForm({
      title: '',
      artist: '',
      album: '',
      genre: '',
      releaseDate: '',
      duration: '',
      explicit: false,
      visibility: 'public',
      tags: ''
    });
    setPodcastForm({
      title: '',
      host: '',
      description: '',
      category: '',
      episodeNumber: '',
      duration: '',
      visibility: 'public',
      tags: ''
    });
    setUploadProgress(0);
    setIsUploading(false);
  };

  // ========== RENDER FUNCTIONS ==========
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map(step => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === uploadStep
              ? 'bg-cyan-500 text-white'
              : step < uploadStep
              ? 'bg-emerald-500 text-white'
              : 'bg-white/10 text-slate-400'
          }`}>
            {step < uploadStep ? <Check className="w-4 h-4" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-1 mx-2 ${
              step < uploadStep ? 'bg-emerald-500' : 'bg-white/10'
            }`}></div>
          )}
        </div>
      ))}
      <div className="ml-6 text-sm text-slate-400">
        Step {uploadStep} of 3: {uploadStep === 1 ? 'Upload Files' : uploadStep === 2 ? 'Enter Details' : 'Review & Publish'}
      </div>
    </div>
  );

  const renderFileUpload = () => (
    <div className="text-center">
      <div className="mb-6">
        <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 mb-4">
          <button
            onClick={() => setUploadType('music')}
            className={`px-4 py-2 rounded-full transition ${
              uploadType === 'music'
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4 inline mr-2" />
            Music
          </button>
          <button
            onClick={() => setUploadType('podcast')}
            className={`px-4 py-2 rounded-full transition ${
              uploadType === 'podcast'
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4 inline mr-2" />
            Podcast
          </button>
        </div>
      </div>

      <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 hover:border-cyan-500/50 transition cursor-pointer mb-6">
        <input
          type="file"
          id="file-upload"
          multiple
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
            <Upload className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Drop audio files here or click to browse</h3>
          <p className="text-slate-400 mb-4">
            {uploadType === 'music' 
              ? 'Supported formats: MP3, WAV, M4A, FLAC, AAC'
              : 'Upload podcast episodes in audio format'
            }
          </p>
          <div className="px-6 py-3 bg-white/5 rounded-full inline-block">
            Select Files
          </div>
        </label>
      </div>

      <div className="text-sm text-slate-500">
        <AlertCircle className="w-4 h-4 inline mr-2" />
        Maximum file size: 100MB per file. Total upload limit: 1GB
      </div>
    </div>
  );

  const renderDetailsForm = () => {
    if (uploadType === 'music') {
      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Music className="w-4 h-4 inline mr-2" />
                Track Title *
              </label>
              <input
                type="text"
                name="title"
                value={musicForm.title}
                onChange={handleMusicFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Artist *
              </label>
              <input
                type="text"
                name="artist"
                value={musicForm.artist}
                onChange={handleMusicFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Album
              </label>
              <input
                type="text"
                name="album"
                value={musicForm.album}
                onChange={handleMusicFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Genre *
              </label>
              <select
                name="genre"
                value={musicForm.genre}
                onChange={handleMusicFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                required
              >
                <option value="">Select a genre</option>
                {musicGenres.map(genre => (
                  <option key={genre} value={genre} className="bg-slate-900">
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Release Date
              </label>
              <input
                type="date"
                name="releaseDate"
                value={musicForm.releaseDate}
                onChange={handleMusicFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={musicForm.duration}
                onChange={handleMusicFormChange}
                placeholder="e.g., 3:45"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="explicit"
                name="explicit"
                checked={musicForm.explicit}
                onChange={handleMusicFormChange}
                className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10 rounded focus:ring-cyan-500/20"
              />
              <label htmlFor="explicit" className="ml-2 text-sm text-slate-300">
                Contains explicit content
              </label>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Visibility
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={musicForm.visibility === 'public'}
                    onChange={handleMusicFormChange}
                    className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10"
                  />
                  <span className="ml-2 text-sm text-slate-300">Public</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={musicForm.visibility === 'private'}
                    onChange={handleMusicFormChange}
                    className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10"
                  />
                  <span className="ml-2 text-sm text-slate-300">Private</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={musicForm.tags}
                onChange={handleMusicFormChange}
                placeholder="e.g., chill, study, workout"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>
          
          <div className="flex justify-between pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-3 text-slate-400 hover:text-white"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-full font-semibold"
            >
              Continue to Review
            </button>
          </div>
        </form>
      );
    } else {
      // Podcast form
      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Mic className="w-4 h-4 inline mr-2" />
                Episode Title *
              </label>
              <input
                type="text"
                name="title"
                value={podcastForm.title}
                onChange={handlePodcastFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Host *
              </label>
              <input
                type="text"
                name="host"
                value={podcastForm.host}
                onChange={handlePodcastFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-400 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <textarea
                name="description"
                value={podcastForm.description}
                onChange={handlePodcastFormChange}
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Category *
              </label>
              <select
                name="category"
                value={podcastForm.category}
                onChange={handlePodcastFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                required
              >
                <option value="">Select a category</option>
                {podcastCategories.map(category => (
                  <option key={category} value={category} className="bg-slate-900">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Episode Number
              </label>
              <input
                type="number"
                name="episodeNumber"
                value={podcastForm.episodeNumber}
                onChange={handlePodcastFormChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={podcastForm.duration}
                onChange={handlePodcastFormChange}
                placeholder="e.g., 45:30"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Visibility
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={podcastForm.visibility === 'public'}
                    onChange={handlePodcastFormChange}
                    className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10"
                  />
                  <span className="ml-2 text-sm text-slate-300">Public</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={podcastForm.visibility === 'private'}
                    onChange={handlePodcastFormChange}
                    className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10"
                  />
                  <span className="ml-2 text-sm text-slate-300">Private</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={podcastForm.tags}
                onChange={handlePodcastFormChange}
                placeholder="e.g., technology, business, interviews"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>
          
          <div className="flex justify-between pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-3 text-slate-400 hover:text-white"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-full font-semibold"
            >
              Continue to Review
            </button>
          </div>
        </form>
      );
    }
  };

  const renderReview = () => {
    const formData = uploadType === 'music' ? musicForm : podcastForm;
    
    return (
      <div className="space-y-6">
        {/* Upload Progress */}
        {isUploading ? (
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4">Uploading Files...</h3>
            <div className="space-y-4">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-center text-slate-400">
                {uploadProgress}% Complete
              </div>
              <div className="text-sm text-slate-500 text-center">
                Please don't close this window during upload
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Uploaded Files */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <FileAudio className="w-5 h-5 text-cyan-400 mr-3" />
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-slate-400">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content Details */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">
                {uploadType === 'music' ? 'Music Details' : 'Podcast Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => {
                  if (typeof value === 'boolean') {
                    return (
                      <div key={key} className="text-sm">
                        <span className="text-slate-400 capitalize">{key}: </span>
                        <span className="text-slate-300">{value ? 'Yes' : 'No'}</span>
                      </div>
                    );
                  }
                  if (value && key !== 'tags') {
                    return (
                      <div key={key} className="text-sm">
                        <span className="text-slate-400 capitalize">{key}: </span>
                        <span className="text-slate-300">{value}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-6 border-t border-white/10">
              <button
                onClick={handleGoBack}
                className="px-6 py-3 text-slate-400 hover:text-white"
              >
                ← Edit Details
              </button>
              <div className="space-x-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 text-slate-400 hover:text-white"
                >
                  Start Over
                </button>
                <button
                  onClick={() => alert('Content published successfully!')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-full font-semibold"
                >
                  <Check className="w-5 h-5 inline mr-2" />
                  Publish {uploadType === 'music' ? 'Music' : 'Podcast'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 md:p-8">
      {/* ========== HEADER ========== */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Admin Upload
          </span>
        </h1>
        <p className="text-slate-400">Upload and manage music or podcast content</p>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Content Area */}
        <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
          {uploadStep === 1 && renderFileUpload()}
          {uploadStep === 2 && renderDetailsForm()}
          {uploadStep === 3 && renderReview()}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Files Ready</p>
                <p className="text-2xl font-bold">{uploadedFiles.length}</p>
              </div>
              <FileAudio className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Content Type</p>
                <p className="text-2xl font-bold capitalize">{uploadType}</p>
              </div>
              {uploadType === 'music' ? (
                <Music className="w-8 h-8 text-purple-400" />
              ) : (
                <Mic className="w-8 h-8 text-emerald-400" />
              )}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Size</p>
                <p className="text-2xl font-bold">
                  {uploadedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024) > 1024
                    ? `${(uploadedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024 * 1024)).toFixed(2)} GB`
                    : `${(uploadedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(2)} MB`}
                </p>
              </div>
              <Upload className="w-8 h-8 text-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;