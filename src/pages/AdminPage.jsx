import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Save, X, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '',
    liveLink: '',
    githubLink: ''
  });
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Simulated authentication for demo purposes
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real application, you would verify credentials with your backend
    if (loginForm.username === 'admin' && loginForm.password === 'password') {
      setIsLoggedIn(true);
      showAlert('success', 'Login successful!');
    } else {
      showAlert('error', 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Helper function to show alerts
  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  // Fetch projects and messages on component mount
  useEffect(() => {
    // Simulated data for the demo
    // In a real application, you would fetch this from your backend
    setProjects([
      {
        id: 1,
        title: 'E-Commerce Website',
        description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and checkout system.',
        image: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'A drag-and-drop task management application with user authentication and real-time updates.',
        image: 'https://images.pexels.com/photos/6956780/pexels-photo-6956780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        techStack: ['React', 'Firebase', 'Tailwind CSS', 'Context API'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
      },
    ]);

    setMessages([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'Hi Nasir, I would like to discuss a potential project with you. Please let me know when you are available for a call.',
        createdAt: '2023-10-15T14:30:00.000Z',
        read: true
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Collaboration Opportunity',
        message: 'Hello, I came across your portfolio and was impressed by your work. I would love to explore a potential collaboration.',
        createdAt: '2023-10-16T09:15:00.000Z',
        read: false
      }
    ]);
  }, []);

  // Project CRUD operations
  const handleAddProject = () => {
    // Convert comma-separated tech stack to array
    const techStackArray = newProject.techStack.split(',').map(tech => tech.trim());
    
    // In a real application, you would send this data to your backend
    const projectToAdd = {
      id: projects.length + 1,
      ...newProject,
      techStack: techStackArray
    };
    
    setProjects([...projects, projectToAdd]);
    setNewProject({
      title: '',
      description: '',
      image: '',
      techStack: '',
      liveLink: '',
      githubLink: ''
    });
    showAlert('success', 'Project added successfully!');
  };

  const handleEditProject = (project) => {
    setEditingProject({
      ...project,
      techStack: project.techStack.join(', ')
    });
  };

  const handleUpdateProject = () => {
    // Convert comma-separated tech stack to array
    const techStackArray = editingProject.techStack.split(',').map(tech => tech.trim());
    
    // In a real application, you would send this data to your backend
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id 
        ? { ...editingProject, techStack: techStackArray } 
        : project
    );
    
    setProjects(updatedProjects);
    setEditingProject(null);
    showAlert('success', 'Project updated successfully!');
  };

  const handleDeleteProject = (id) => {
    // In a real application, you would send this request to your backend
    setProjects(projects.filter(project => project.id !== id));
    showAlert('success', 'Project deleted successfully!');
  };

  // Message operations
  const handleMarkAsRead = (id) => {
    // In a real application, you would send this request to your backend
    const updatedMessages = messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
  };

  const handleDeleteMessage = (id) => {
    // In a real application, you would send this request to your backend
    setMessages(messages.filter(message => message.id !== id));
    showAlert('success', 'Message deleted successfully!');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Admin Login
            </h2>
          </div>
          
          {alert.show && (
            <div className={`p-4 rounded-md ${
              alert.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 
              'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            } flex items-start gap-2`}>
              <AlertCircle size={20} />
              <p>{alert.message}</p>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>For demo purposes use:</p>
            <p className="font-semibold">Username: admin | Password: password</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {alert.show && (
          <div className={`p-4 mb-6 rounded-md ${
            alert.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 
            'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          } flex items-start gap-2`}>
            <AlertCircle size={20} />
            <p>{alert.message}</p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 font-medium ${
                  activeTab === 'projects'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button
                className={`py-4 px-6 font-medium ${
                  activeTab === 'messages'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                Messages
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                  {messages.filter(msg => !msg.read).length}
                </span>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Manage Projects</h2>
                  <button
                    onClick={() => document.getElementById('addProjectForm').scrollIntoView({ behavior: 'smooth' })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add New Project
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tech Stack</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.title}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{project.description}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {project.techStack.map((tech) => (
                                <span key={tech} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {editingProject && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Project</h3>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <X size={24} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                          <textarea
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={editingProject.image}
                            onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            value={editingProject.techStack}
                            onChange={(e) => setEditingProject({...editingProject, techStack: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Link</label>
                          <input
                            type="text"
                            value={editingProject.liveLink}
                            onChange={(e) => setEditingProject({...editingProject, liveLink: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Link</label>
                          <input
                            type="text"
                            value={editingProject.githubLink}
                            onChange={(e) => setEditingProject({...editingProject, githubLink: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-4"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdateProject}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div id="addProjectForm" className="mt-12 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Add New Project</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={newProject.techStack}
                      onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                      placeholder="React, Node.js, MongoDB, etc."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Link</label>
                      <input
                        type="text"
                        value={newProject.liveLink}
                        onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Link</label>
                      <input
                        type="text"
                        value={newProject.githubLink}
                        onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAddProject}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Project
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Contact Messages</h2>
                
                {messages.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`p-4 rounded-lg ${message.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/10'} border border-gray-200 dark:border-gray-700`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{message.subject}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              From: {message.name} ({message.email})
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!message.read && (
                              <button
                                onClick={() => handleMarkAsRead(message.id)}
                                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
                              >
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{message.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Received: {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;