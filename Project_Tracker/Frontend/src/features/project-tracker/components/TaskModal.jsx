import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useProjects, useCategories, useMainTasks } from '../hooks/useProjectTracker';

const TaskModal = ({ isOpen, onClose, onSave, task = null }) => {
    const [formData, setFormData] = useState({
        projectId: '',
        categoryId: '',
        mainTaskId: '',
        subtask: '',
        subtaskCategories: '',
        details: '',
        status: 'In Progress',
        assignee: ''
    });

    const { data: projects } = useProjects();
    const { data: categories } = useCategories(formData.projectId);
    const { data: mainTasks } = useMainTasks();

    useEffect(() => {
        if (task) {
            setFormData({
                id: task.id,
                projectId: task.projectId,
                categoryId: task.categoryId,
                mainTaskId: task.mainTaskId,
                subtask: task.subtask || '',
                subtaskCategories: task.subtaskCategories || '',
                details: task.details || '',
                status: task.status,
                assignee: task.assignee || ''
            });
        } else {
            setFormData({
                projectId: '',
                categoryId: '',
                mainTaskId: '',
                subtask: '',
                subtaskCategories: '',
                details: '',
                status: 'In Progress',
                assignee: ''
            });
        }
    }, [task, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">{task ? 'Edit Task' : 'New Project Task'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Project</label>
                            <select
                                name="projectId"
                                required
                                value={formData.projectId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            >
                                <option value="">Select Project</option>
                                {projects?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Category</label>
                            <select
                                name="categoryId"
                                required
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Main Task</label>
                            <select
                                name="mainTaskId"
                                required
                                value={formData.mainTaskId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            >
                                <option value="">Select Main Task</option>
                                {mainTasks?.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Status</label>
                            <select
                                name="status"
                                required
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            >
                                <option value="In Progress">In Progress</option>
                                <option value="Done/Published">Done/Published</option>
                                <option value="For Review">For Review</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Subtask Name</label>
                        <input
                            type="text"
                            name="subtask"
                            value={formData.subtask}
                            onChange={handleChange}
                            placeholder="e.g. Design UI components"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Subtask Categories</label>
                        <input
                            type="text"
                            name="subtaskCategories"
                            value={formData.subtaskCategories}
                            onChange={handleChange}
                            placeholder="e.g. Layout, Controls"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Assignee</label>
                        <input
                            type="text"
                            name="assignee"
                            value={formData.assignee}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Details</label>
                        <textarea
                            name="details"
                            rows="3"
                            value={formData.details}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-brand hover:bg-brand-active text-white rounded-md shadow-md font-bold transition-all"
                        >
                            {task ? 'Update Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
