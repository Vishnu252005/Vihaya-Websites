import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  Download,
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  thumbnail?: string;
  instructor?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  autoPlay?: boolean;
  showControlsProp?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  thumbnail,
  instructor,
  onProgress,
  onComplete,
  autoPlay = false,
  showControlsProp = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('720p');
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setControlsVisible(true);
      if (controlsTimeout) clearTimeout(controlsTimeout);
      
      const timeout = setTimeout(() => {
        if (isPlaying) setControlsVisible(false);
      }, 3000);
      
      setControlsTimeout(timeout);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        if (controlsTimeout) clearTimeout(controlsTimeout);
      };
    }
  }, [isPlaying, controlsTimeout]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setTotalDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress) {
        onProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    };

    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * totalDuration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, totalDuration));
  };

  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-xl overflow-hidden shadow-2xl group"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        onClick={togglePlay}
      />

      {/* Loading Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !isBuffering && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </motion.div>
        </motion.div>
      )}

      {/* Controls */}
      <AnimatePresence>
        {showControlsProp && (controlsVisible || !isPlaying) && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <div 
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-blue-500 rounded-full relative"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>

                {/* Skip Buttons */}
                <button
                  onClick={() => skip(-10)}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Skip back 10 seconds"
                  title="Skip back 10 seconds"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => skip(10)}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Skip forward 10 seconds"
                  title="Skip forward 10 seconds"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                {/* Volume */}
                <div 
                  className="flex items-center space-x-2"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  
                  <AnimatePresence>
                    {showVolumeSlider && (
                      <motion.div
                        className="w-20 h-2 bg-white/20 rounded-full cursor-pointer"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 80 }}
                        exit={{ opacity: 0, width: 0 }}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percent = (e.clientX - rect.left) / rect.width;
                          handleVolumeChange(percent);
                        }}
                      >
                        <div 
                          className="h-full bg-white rounded-full"
                          style={{ width: `${volume * 100}%` }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Settings */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label={showSettings ? 'Close player settings' : 'Open player settings'}
                    title={showSettings ? 'Close settings' : 'Open settings'}
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        className="absolute bottom-8 right-0 bg-black/90 rounded-lg p-4 min-w-48"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <div className="space-y-3">
                          <div>
                            <p className="text-white text-sm mb-2">Playback Speed</p>
                            <div className="space-y-1">
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                <button
                                  key={speed}
                                  onClick={() => changePlaybackSpeed(speed)}
                                  className={`block w-full text-left px-2 py-1 text-sm rounded ${
                                    playbackSpeed === speed 
                                      ? 'bg-blue-600 text-white' 
                                      : 'text-gray-300 hover:bg-gray-700'
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-white text-sm mb-2">Quality</p>
                            <div className="space-y-1">
                              {['360p', '720p', '1080p'].map(q => (
                                <button
                                  key={q}
                                  onClick={() => setQuality(q)}
                                  className={`block w-full text-left px-2 py-1 text-sm rounded ${
                                    quality === q 
                                      ? 'bg-blue-600 text-white' 
                                      : 'text-gray-300 hover:bg-gray-700'
                                  }`}
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Info */}
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
            {instructor && (
              <p className="text-gray-300 text-sm">by {instructor}</p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button 
          className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors"
          aria-label="Bookmark video"
          title="Bookmark video"
        >
          <Bookmark className="w-4 h-4" />
        </button>
        <button 
          className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors"
          aria-label="Share video"
          title="Share video"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button 
          className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors"
          aria-label="Download video"
          title="Download video"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Video Comments Component
export const VideoComments: React.FC = () => {
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Great explanation of React hooks! This really helped me understand useEffect better.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      replies: 3
    },
    {
      id: '2',
      author: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Could you make a follow-up video about custom hooks? That would be amazing!',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 8,
      replies: 1
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <img
            src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {comment.author}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {comment.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-2">
                <button 
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label={`Like comment (${comment.likes} likes)`}
                  title={`Like comment (${comment.likes} likes)`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                <button 
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
                  aria-label="Dislike comment"
                  title="Dislike comment"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Reply
                </button>
                {comment.replies > 0 && (
                  <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    View {comment.replies} replies
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};