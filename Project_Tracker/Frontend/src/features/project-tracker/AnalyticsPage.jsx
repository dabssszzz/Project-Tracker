import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from './hooks/useProjectTracker';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Loader2, AlertCircle, CheckCircle, Clock, FileText, XCircle } from 'lucide-react';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

const AnalyticsPage = () => {
    const navigate = useNavigate();
    const { data: metrics, isLoading, isError, error } = useAnalytics();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading analytics dashboard...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-red-600">
                <AlertCircle className="w-10 h-10 mb-4" />
                <p className="font-bold">Error loading analytics</p>
                <p className="text-sm opacity-80">{error?.message || 'Check if the backend is running.'}</p>
                <button onClick={() => navigate('/tracker')} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded shrink-0">Go Back</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8 font-sans">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/tracker')}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-3xl font-light text-gray-700">Project <span className="font-bold text-gray-800">Analytics</span></h1>
                    </div>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">TOTAL TASKS</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{metrics.totalTasks}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500"><FileText className="w-6 h-6" /></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">COMPLETED</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{metrics.completedTasks}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500"><CheckCircle className="w-6 h-6" /></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">IN PROGRESS</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{metrics.inProgressTasks}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500"><Clock className="w-6 h-6" /></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">CANCELLED</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{metrics.cancelledTasks}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500"><XCircle className="w-6 h-6" /></div>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* Pie Chart: Tasks by Status */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-6">Tasks by Status</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={metrics.tasksByStatus}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="count"
                                        nameKey="status"
                                    >
                                        {metrics.tasksByStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [value, name]}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {metrics.tasksByStatus.map((entry, index) => (
                                <div key={entry.status} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-xs text-gray-600 font-medium">{entry.status} ({entry.count})</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bar Chart: Top Assignees */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-6">Tasks by Top Assignees</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={metrics.tasksByAssignee} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="assignee" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24}>
                                        {metrics.tasksByAssignee.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Project Progress Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-12">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-700">Project Completion Status</h2>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Project Name</th>
                                    <th className="px-6 py-4 font-medium w-32 text-center">Tasks</th>
                                    <th className="px-6 py-4 font-medium w-64">Progress</th>
                                    <th className="px-6 py-4 font-medium w-24 text-right">% Done</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {metrics.projectProgress.map(proj => (
                                    <tr key={proj.projectName} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{proj.projectName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-center">{proj.completedTasks} / {proj.totalTasks}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${proj.completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${proj.completionPercentage}%` }}>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700 text-right">{proj.completionPercentage}%</td>
                                    </tr>
                                ))}
                                {metrics.projectProgress.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic">No project data available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnalyticsPage;
