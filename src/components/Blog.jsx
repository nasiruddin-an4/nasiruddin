import { motion } from 'framer-motion';
import { Clock, ChevronRight, Tag } from 'lucide-react';
import { blogData } from '../constants';

const BlogCard = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full border-2 border-white/20"
            />
            <div>
              <p className="text-white text-sm font-medium">{post.author.name}</p>
              <p className="text-gray-300 text-xs">{post.author.role}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-400 text-sm">{post.category}</span>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-400 mb-4">{post.excerpt}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
              >
                <Tag size={12} className="inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
            <span className="text-gray-400 text-sm">{post.date}</span>
            <button className="text-blue-400 flex items-center gap-1 text-sm hover:gap-2 transition-all group-hover:text-blue-300">
              Read More <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  return (
    <section className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-blue-400 text-lg mb-4 tracking-wider"
          >
            || LATEST BLOG POSTS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-serif text-white mb-8"
          >
            Recent Articles & News
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Posts
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Blog;