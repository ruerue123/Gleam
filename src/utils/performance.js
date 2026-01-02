/**
 * Performance Monitoring Utilities
 * Tracks and logs Core Web Vitals and other performance metrics
 */

/**
 * Reports Core Web Vitals to console (or analytics in production)
 * Note: Requires web-vitals package to be installed
 */
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Optional import - only if web-vitals is installed
    // Commented out to avoid build errors. Uncomment after installing: npm install web-vitals
    /*
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(() => {
      // web-vitals not available, ignore
    });
    */
  }
};

/**
 * Logs performance metrics to console in development
 */
export const logPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  // Wait for page to load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.group('🚀 Performance Metrics');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`Server Response Time: ${connectTime}ms`);
      console.log(`DOM Render Time: ${renderTime}ms`);

      // Log resource timing
      const resources = window.performance.getEntriesByType('resource');
      const imageResources = resources.filter(r => r.initiatorType === 'img');
      const scriptResources = resources.filter(r => r.initiatorType === 'script');

      console.log(`\nResources Loaded:`);
      console.log(`- Images: ${imageResources.length}`);
      console.log(`- Scripts: ${scriptResources.length}`);

      // Find largest images
      const largeImages = imageResources
        .filter(r => r.transferSize > 100000) // > 100KB
        .sort((a, b) => b.transferSize - a.transferSize)
        .slice(0, 5);

      if (largeImages.length > 0) {
        console.warn('\n⚠️ Large Images (>100KB):');
        largeImages.forEach(img => {
          console.warn(`- ${img.name.split('/').pop()}: ${(img.transferSize / 1024).toFixed(0)}KB`);
        });
      }

      console.groupEnd();
    }, 0);
  });
};

/**
 * Mark custom performance points
 */
export const markPerformance = (markName) => {
  if (window.performance && window.performance.mark) {
    window.performance.mark(markName);
  }
};

/**
 * Measure time between two marks
 */
export const measurePerformance = (measureName, startMark, endMark) => {
  if (window.performance && window.performance.measure) {
    try {
      window.performance.measure(measureName, startMark, endMark);
      const measure = window.performance.getEntriesByName(measureName)[0];
      console.log(`⏱️ ${measureName}: ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (error) {
      console.error('Error measuring performance:', error);
    }
  }
  return null;
};

/**
 * Get bundle size estimate
 */
export const getBundleSize = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const scripts = window.performance
    .getEntriesByType('resource')
    .filter(r => r.initiatorType === 'script');

  const totalSize = scripts.reduce((sum, script) => sum + (script.transferSize || 0), 0);

  return {
    totalSize: totalSize,
    totalSizeKB: (totalSize / 1024).toFixed(2),
    scriptCount: scripts.length
  };
};

// Auto-enable performance logging in development
if (import.meta.env.DEV) {
  logPerformanceMetrics();

  // Log bundle size after load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const bundleInfo = getBundleSize();
      if (bundleInfo) {
        console.log(`📦 Total JavaScript: ${bundleInfo.totalSizeKB}KB (${bundleInfo.scriptCount} files)`);
      }
    }, 1000);
  });
}

export default {
  reportWebVitals,
  logPerformanceMetrics,
  markPerformance,
  measurePerformance,
  getBundleSize
};
