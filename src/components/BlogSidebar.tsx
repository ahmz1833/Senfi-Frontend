import React from 'react';
import { FaClock, FaTag, FaCalendar } from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  created_at: string;
  readingTime?: string;
  tags?: string[];
  excerpt?: string;
  url: string;
}

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: { name: string; count: number }[];
  onCategoryClick: (category: string) => void;
  selectedCategory?: string;
  statsTitle?: string; // NEW PROP
}

export default function BlogSidebar({ 
  recentPosts, 
  categories, 
  onCategoryClick, 
  selectedCategory,
  statsTitle = 'آمار بلاگ', // default
}: BlogSidebarProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <aside className="blog-sidebar">
      {/* Recent Posts Section */}
      <div className="blog-sidebar-section">
        <h3 className="blog-sidebar-title">
          <FaClock className="blog-sidebar-icon" />
          آخرین مطالب
        </h3>
        <div className="blog-sidebar-recent-posts">
          {recentPosts.map((post) => (
            <article key={post.id} className="blog-sidebar-post">
              <h4 className="blog-sidebar-post-title">
                <a href={post.url} className="blog-sidebar-post-link">
                  {post.title}
                </a>
              </h4>
              <div className="blog-sidebar-post-meta">
                <time className="blog-sidebar-post-date">
                  <FaCalendar className="blog-sidebar-meta-icon" />
                  {formatDate(post.created_at)}
                </time>
                {post.readingTime && (
                  <span className="blog-sidebar-post-reading-time">
                    <FaClock className="blog-sidebar-meta-icon" />
                    {post.readingTime}
                  </span>
                )}
              </div>
              {post.excerpt && (
                <p className="blog-sidebar-post-excerpt">
                  {post.excerpt.length > 100 
                    ? `${post.excerpt.substring(0, 100)}...` 
                    : post.excerpt
                  }
                </p>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="blog-sidebar-section">
        <h3 className="blog-sidebar-title">
          <FaTag className="blog-sidebar-icon" />
          دسته‌بندی‌ها
        </h3>
        <div className="blog-sidebar-categories">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryClick(category.name)}
              className={`blog-sidebar-category-btn ${
                selectedCategory === category.name ? 'blog-sidebar-category-active' : ''
              }`}
            >
              <span className="blog-sidebar-category-name">
                {category.name}
              </span>
              <span className="blog-sidebar-category-count">
                ({category.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Stats */}
      <div className="blog-sidebar-section">
        <h3 className="blog-sidebar-title">{statsTitle}</h3>
        <div className="blog-sidebar-stats">
          <div className="blog-sidebar-stat">
            <span className="blog-sidebar-stat-label">کل مطالب:</span>
            <span className="blog-sidebar-stat-value">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </span>
          </div>
          <div className="blog-sidebar-stat">
            <span className="blog-sidebar-stat-label">دسته‌بندی‌ها:</span>
            <span className="blog-sidebar-stat-value">
              {categories.length}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
} 