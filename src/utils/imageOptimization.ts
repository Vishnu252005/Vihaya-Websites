// Image Optimization Utilities for Vihaya Platform

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  lazy?: boolean;
}

export const optimizeImageUrl = (
  originalUrl: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const {
    width,
    height,
    quality = 85,
    format = 'webp',
    lazy = true
  } = options;

  // If it's an external URL, return as is
  if (originalUrl.startsWith('http')) {
    return originalUrl;
  }

  // For local images, we can add optimization parameters
  let optimizedUrl = originalUrl;
  
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    if (quality !== 85) params.append('q', quality.toString());
    if (format !== 'webp') params.append('f', format);
    
    optimizedUrl += `?${params.toString()}`;
  }

  return optimizedUrl;
};

export const generateImageSrcSet = (
  baseUrl: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return sizes
    .map(size => `${optimizeImageUrl(baseUrl, { width: size })} ${size}w`)
    .join(', ');
};

export const generateResponsiveImage = (
  originalUrl: string,
  alt: string,
  options: ImageOptimizationOptions = {}
): JSX.Element => {
  const {
    width,
    height,
    quality = 85,
    format = 'webp',
    lazy = true
  } = options;

  const optimizedUrl = optimizeImageUrl(originalUrl, options);
  const srcSet = generateImageSrcSet(originalUrl);

  return (
    <picture>
      <source
        srcSet={srcSet}
        type={`image/${format}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <img
        src={optimizedUrl}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </picture>
  );
};

export const preloadCriticalImages = (imageUrls: string[]): void => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

export const lazyLoadImages = (): void => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

export const generateWebPImage = (originalUrl: string): string => {
  // Convert to WebP format for better compression
  return optimizeImageUrl(originalUrl, { format: 'webp', quality: 85 });
};

export const generateThumbnail = (
  originalUrl: string, 
  size: number = 300
): string => {
  return optimizeImageUrl(originalUrl, { 
    width: size, 
    height: size, 
    format: 'webp',
    quality: 75 
  });
};

// SEO-friendly alt text generator
export const generateAltText = (
  context: string,
  description: string,
  includeBrand: boolean = true
): string => {
  let altText = `${context} - ${description}`;
  
  if (includeBrand) {
    altText += ' on Vihaya platform';
  }
  
  return altText;
};

// Image compression utility
export const compressImage = async (
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      const { maxWidth = 1920, maxHeight = 1080, quality = 0.8, format = 'webp' } = options;
      
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => resolve(blob!),
        `image/${format}`,
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
}; 