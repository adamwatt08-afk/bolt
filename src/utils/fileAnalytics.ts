export interface FileMetadata {
  name: string;
  path: string;
  extension: string;
  size: number;
  lastAccess: Date;
  lastModified: Date;
  createDate: Date;
  fileOwners: string[];
}

export interface FileAnalytics {
  totalFiles: number;
  totalSize: number;
  averageFileSize: number;
  largestFile: { name: string; size: number } | null;
  oldestFile: { name: string; date: Date } | null;
  newestFile: { name: string; date: Date } | null;
  mostRecentlyAccessed: { name: string; date: Date } | null;
  extensionDistribution: { extension: string; count: number; size: number }[];
  ownerDistribution: { owner: string; count: number; size: number }[];
  activityTrend: { period: string; accessed: number; modified: number }[];
  staleness: {
    active: number;
    stale: number;
    dormant: number;
  };
}

export function analyzeFiles(files: FileMetadata[]): FileAnalytics {
  if (files.length === 0) {
    return {
      totalFiles: 0,
      totalSize: 0,
      averageFileSize: 0,
      largestFile: null,
      oldestFile: null,
      newestFile: null,
      mostRecentlyAccessed: null,
      extensionDistribution: [],
      ownerDistribution: [],
      activityTrend: [],
      staleness: { active: 0, stale: 0, dormant: 0 }
    };
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const averageFileSize = totalSize / files.length;

  const largestFile = files.reduce((largest, file) =>
    !largest || file.size > largest.size ? { name: file.name, size: file.size } : largest
  );

  const oldestFile = files.reduce((oldest, file) =>
    !oldest || file.createDate < oldest.date ? { name: file.name, date: file.createDate } : oldest
  );

  const newestFile = files.reduce((newest, file) =>
    !newest || file.createDate > newest.date ? { name: file.name, date: file.createDate } : newest
  );

  const mostRecentlyAccessed = files.reduce((recent, file) =>
    !recent || file.lastAccess > recent.date ? { name: file.name, date: file.lastAccess } : recent
  );

  const extensionMap = new Map<string, { count: number; size: number }>();
  files.forEach(file => {
    const ext = file.extension || 'no extension';
    const current = extensionMap.get(ext) || { count: 0, size: 0 };
    extensionMap.set(ext, { count: current.count + 1, size: current.size + file.size });
  });
  const extensionDistribution = Array.from(extensionMap.entries())
    .map(([extension, data]) => ({ extension, ...data }))
    .sort((a, b) => b.count - a.count);

  const ownerMap = new Map<string, { count: number; size: number }>();
  files.forEach(file => {
    file.fileOwners.forEach(owner => {
      const current = ownerMap.get(owner) || { count: 0, size: 0 };
      ownerMap.set(owner, { count: current.count + 1, size: current.size + file.size });
    });
  });
  const ownerDistribution = Array.from(ownerMap.entries())
    .map(([owner, data]) => ({ owner, ...data }))
    .sort((a, b) => b.count - a.count);

  const activityTrend = calculateActivityTrend(files);

  const staleness = calculateStaleness(files);

  return {
    totalFiles: files.length,
    totalSize,
    averageFileSize,
    largestFile,
    oldestFile,
    newestFile,
    mostRecentlyAccessed,
    extensionDistribution,
    ownerDistribution,
    activityTrend,
    staleness
  };
}

function calculateActivityTrend(files: FileMetadata[]) {
  const now = new Date();
  const periods = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { label: 'Last 180 days', days: 180 },
    { label: 'Last year', days: 365 },
  ];

  return periods.map(period => {
    const cutoff = new Date(now.getTime() - period.days * 24 * 60 * 60 * 1000);
    const accessed = files.filter(f => f.lastAccess >= cutoff).length;
    const modified = files.filter(f => f.lastModified >= cutoff).length;
    return { period: period.label, accessed, modified };
  });
}

function calculateStaleness(files: FileMetadata[]) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const active = files.filter(f => f.lastAccess >= thirtyDaysAgo).length;
  const stale = files.filter(f => f.lastAccess < thirtyDaysAgo && f.lastAccess >= ninetyDaysAgo).length;
  const dormant = files.filter(f => f.lastAccess < ninetyDaysAgo).length;

  return { active, stale, dormant };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
