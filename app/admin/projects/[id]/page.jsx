'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

export default function EditProjectPage({ params }) {
  const router = useRouter();
  const id = use(params).id; // Unwrap params
  
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '', 
    category: '',
    featured: false,
    liveUrl: '',
    githubUrl: '',
    image: '', // Existing image URL
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Project not found');
        const data = await res.json();
        setFormData({
          title: data.title || '',
          description: data.description || '',
          tech: Array.isArray(data.tech) ? data.tech.join(', ') : '',
          category: data.category || '',
          featured: data.featured || false,
          liveUrl: data.liveUrl || '',
          githubUrl: data.githubUrl || '',
          image: data.image || '',
        });
        setImagePreview(data.image || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setInitialLoad(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Local preview
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = formData.image;
      
      // Upload to Cloudinary if a NEW file is selected
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const techArray = formData.tech.split(',').map(item => item.trim()).filter(Boolean);

      const payload = {
        ...formData,
        tech: techArray,
        image: imageUrl
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/projects');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update project');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/admin/projects" className="text-gray-500 hover:text-gray-900 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              name="tech"
              required
              placeholder="React JS, Next.js, Tailwind CSS"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.tech}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live URL (optional)</label>
            <input
              type="url"
              name="liveUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.liveUrl}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL (optional)</label>
            <input
              type="url"
              name="githubUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Image (Leave empty to keep existing)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">{imageFile ? 'Local Preview:' : 'Current Image:'}</p>
                <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg border border-gray-200" />
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Featured Project (Shows up on homepage)
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:bg-blue-400 transition-colors"
          >
            {loading ? 'Saving...' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
