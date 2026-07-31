import { Image as ImageIcon, Video, User, Sparkles, Plus } from 'lucide-react';

interface MediaPlaceholderProps {
  label: string;
  dimensions?: string;
  type?: 'image' | 'video' | 'portrait' | 'diagram';
  aspectRatio?: string;
  className?: string;
  subtext?: string;
}

export function MediaPlaceholder({
  label,
  dimensions = '1200 × 800 px',
  type = 'image',
  aspectRatio = 'aspect-video',
  className = '',
  subtext = 'Media Placeholder — Upload or insert file here'
}: MediaPlaceholderProps) {
  const getIcon = () => {
    switch (type) {
      case 'video':
        return <Video className="w-8 h-8 text-primary/70" />;
      case 'portrait':
        return <User className="w-9 h-9 text-primary/70" />;
      case 'diagram':
        return <Sparkles className="w-8 h-8 text-primary/70" />;
      default:
        return <ImageIcon className="w-8 h-8 text-primary/70" />;
    }
  };

  return (
    <div
      className={`relative group w-full ${aspectRatio} rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        {getIcon()}
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
        <Plus className="w-3 h-3" />
        {type === 'video' ? 'Video Placeholder' : type === 'portrait' ? 'Portrait Placeholder' : 'Image Placeholder'}
      </div>

      <h4 className="font-serif font-medium text-slate-800 dark:text-slate-200 text-sm sm:text-base max-w-xs leading-snug">
        {label}
      </h4>

      {dimensions && (
        <span className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
          Recommended: {dimensions}
        </span>
      )}

      <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500 max-w-xs">
        {subtext}
      </p>
    </div>
  );
}
