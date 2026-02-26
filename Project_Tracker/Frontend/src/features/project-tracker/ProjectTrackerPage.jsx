import React, { useState } from 'react';
import TaskFilters from './components/TaskFilters';
import TaskTable from './components/TaskTable';
import TaskModal from './components/TaskModal';
import { useTasks, useTaskMutations } from './hooks/useProjectTracker';
import { RefreshCw, Plus, BarChart2, Loader2, AlertCircle } from 'lucide-react';

const ProjectTrackerPage = () => {
    const [filters, setFilters] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const { data: tasks, isLoading, isError, error, refetch } = useTasks(filters);
    const { createMutation, updateMutation, deleteMutation } = useTaskMutations();

    const handleCreate = (data) => {
        createMutation.mutate(data);
    };

    const handleUpdate = (data) => {
        updateMutation.mutate({ id: data.id, data });
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleAddNew = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const handleStatusChange = (id, newStatus) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        updateMutation.mutate({ id, data: { ...task, status: newStatus } });
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 font-sans">
            <div className="max-w-[1600px] mx-auto">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">

                    {/* Logo & Title */}
                    <div className="flex items-center gap-3">
                        <div className="text-3xl tracking-tight text-gray-700 flex items-center">
                            <span className="font-extrabold text-[#ED3833]">CO</span>
                            <span className="font-light">RE</span>
                            <span className="ml-3 font-semibold text-gray-800">Marketing Project Tracker</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => refetch()}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4 text-blue-400" />
                            Refresh Table
                        </button>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-500 rounded text-sm font-medium text-white hover:bg-blue-600 transition-colors shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded text-sm font-medium text-cyan-500 hover:bg-blue-50 transition-colors"
                        >
                            <BarChart2 className="w-4 h-4 text-[#3ebf8f]" />
                            Go to Analytics
                        </button>
                    </div>
                </header>

                {/* Filters Section */}
                <TaskFilters
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* Content Section */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded border border-gray-200 shadow-sm">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Loading project data...</p>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded border border-red-100 shadow-sm text-red-600">
                        <AlertCircle className="w-10 h-10 mb-4" />
                        <p className="font-bold">Error loading data</p>
                        <p className="text-sm opacity-80">{error?.message || 'Check if the backend is running.'}</p>
                    </div>
                ) : (
                    <TaskTable
                        tasks={tasks}
                        onEdit={handleEditClick}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                    />
                )}

                <TaskModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={selectedTask ? handleUpdate : handleCreate}
                    task={selectedTask}
                />
            </div>
        </div>
    );
};

export default ProjectTrackerPage;
