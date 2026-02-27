import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useProjects, useCategories, useMainTasks } from '../hooks/useProjectTracker';

const TaskModal = ({ isOpen, onClose, onSave, task = null }) => {
    const [formData, setFormData] = useState({
        projectId: '',
        categoryId: '',
        mainTaskId: '',
        subtaskId: '',
        subtaskCategoryId: '',
        details: '',
        status: 'In Progress',
        assigneeId: '',
        createDate: new Date().toISOString().split('T')[0],
        completeDate: ''
    });

    const { data: projects } = useProjects();
    const { data: categories } = useCategories(formData.projectId);
    const { data: mainTasks } = useMainTasks(formData.categoryId);
    const { data: subtasks } = useSubtasks(formData.mainTaskId);
    const { data: subtaskCategories } = useSubtaskCategories(formData.subtaskId);
    const { data: assignees } = useAssignees();

    useEffect(() => {
        if (task) {
            setFormData({
                id: task.id,
                projectId: task.projectId,
                categoryId: task.categoryId,
                mainTaskId: task.mainTaskId,
                subtaskId: task.subtaskId,
                subtaskCategoryId: task.subtaskCategoryId,
                details: task.details || '',
                status: task.status,
                assigneeId: task.assigneeId || '',
                createDate: task.createDate ? task.createDate.split('T')[0] : '',
                completeDate: task.completeDate ? task.completeDate.split('T')[0] : ''
            });
        } else {
            resetForm();
        }
    }, [task, isOpen]);

    const resetForm = () => {
        setFormData({
            projectId: '',
            categoryId: '',
            mainTaskId: '',
            subtaskId: '',
            subtaskCategoryId: '',
            details: '',
            status: 'In Progress',
            assigneeId: '',
            createDate: new Date().toISOString().split('T')[0],
            completeDate: ''
        });
    };

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newState = { ...prev, [name]: value };

            // Reset children when parent changes
            if (name === 'projectId') {
                newState.categoryId = '';
                newState.mainTaskId = '';
                newState.subtaskId = '';
                newState.subtaskCategoryId = '';
            } else if (name === 'categoryId') {
                newState.mainTaskId = '';
                newState.subtaskId = '';
                newState.subtaskCategoryId = '';
            } else if (name === 'mainTaskId') {
                newState.subtaskId = '';
                newState.subtaskCategoryId = '';
            } else if (name === 'subtaskId') {
                newState.subtaskCategoryId = '';
            }

            return newState;
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">{task ? 'Edit Project' : 'New Project'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Select Project</label>
                            <select
                                name="projectId"
                                required
                                value={formData.projectId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            >
                                <option value="">Select project</option>
                                {projects?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Select Category</label>
                            <select
                                name="categoryId"
                                required
                                value={formData.categoryId}
                                onChange={handleChange}
                                disabled={!formData.projectId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none disabled:bg-gray-50"
                            >
                                <option value="">Select category</option>
                                {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Select Main Task</label>
                            <select
                                name="mainTaskId"
                                required
                                value={formData.mainTaskId}
                                onChange={handleChange}
                                disabled={!formData.categoryId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none disabled:bg-gray-50"
                            >
                                <option value="">Select main task</option>
                                {mainTasks?.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Select Subtask</label>
                            <select
                                name="subtaskId"
                                required
                                value={formData.subtaskId}
                                onChange={handleChange}
                                disabled={!formData.mainTaskId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none disabled:bg-gray-50"
                            >
                                <option value="">Select subtask</option>
                                {subtasks?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Select Subtask Category</label>
                            <select
                                name="subtaskCategoryId"
                                required
                                value={formData.subtaskCategoryId}
                                onChange={handleChange}
                                disabled={!formData.subtaskId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none disabled:bg-gray-50"
                            >
                                <option value="">Select subtask category</option>
                                {subtaskCategories?.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Details (Optional)</label>
                        <textarea
                            name="details"
                            rows="3"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Add project details"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Select Status</label>
                            <select
                                name="status"
                                required
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            >
                                <option value="">Select status</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done/Published">Done/Published</option>
                                <option value="For Review">For Review</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Select Assignee</label>
                            <select
                                name="assigneeId"
                                value={formData.assigneeId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            >
                                <option value="">Select assignee</option>
                                {assignees?.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Create Date</label>
                            <input
                                type="date"
                                name="createDate"
                                value={formData.createDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Complete Date</label>
                            <input
                                type="date"
                                name="completeDate"
                                value={formData.completeDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand outline-none"
                            />
                        </div>
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
                            className="px-8 py-2 bg-[#E11D00] hover:bg-[#B31700] text-white rounded-md shadow-md font-bold transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default TaskModal;
