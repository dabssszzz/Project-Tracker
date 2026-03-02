import React from 'react';
import { Edit2, CheckSquare } from 'lucide-react';
import { format } from 'date-fns';

const TaskTable = ({ tasks, onEdit, onStatusChange }) => {
    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'Done/Published': return 'bg-[#10B981] text-white';
            case 'In Progress': return 'bg-[#3B82F6] text-white';
            case 'For Review': return 'bg-[#F59E0B] text-white';
            case 'Cancelled': return 'bg-[#EF4444] text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return (
                <div className="flex flex-col text-[11px] text-gray-800">
                    <span>{format(date, 'MMMM d, yyyy,')}</span>
                    <span>{format(date, 'h:mm a')}</span>
                </div>
            );
        } catch (e) {
            return '-';
        }
    };

    return (
        <div className="overflow-x-auto bg-white border border-gray-300 shadow-sm mt-4">
            <table className="w-full text-left border-collapse min-w-max">
                <thead>
                    <tr className="bg-gray-50 bg-opacity-70">
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[120px]">ID</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[160px]">Project</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[120px]">Category</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[160px]">Main Task</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[140px]">Subtask</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[100px] leading-tight">Subtask<br />Categories</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[200px]">Details</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[160px]">Status</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[120px]">Assignee</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[100px]">Created</th>
                        <th className="px-3 py-3 text-xs font-bold text-gray-700 border border-gray-300 text-center w-[100px]">Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-3 text-xs text-gray-700 font-medium border border-gray-300 break-words">TASK-{task.id}</td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300">{task.projectName}</td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300">{task.categoryName}</td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300">{task.maintaskName}</td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300 text-center">
                                {task.subtaskName ? <span className="text-gray-500">{task.subtaskName}</span> : <span className="text-gray-400 font-medium">(proceed to details)</span>}
                            </td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300 text-center">
                                {task.subtask_CategoryName || '-'}
                            </td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300 relative group">
                                <div className="flex items-center justify-between">
                                    <span className="truncate max-w-[150px]" title={task.details}>{task.details || '-'}</span>
                                    <button onClick={() => onEdit(task)} className="p-1 hover:bg-orange-50 rounded text-[#F97316] opacity-80 hover:opacity-100 transition-opacity ml-1" title="Edit Details">
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300">
                                <div className="flex flex-col items-center gap-1.5">
                                    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium tracking-wide shadow-sm w-[130px] justify-center ${getStatusBadgeVariant(task.statusName)}`}>
                                        {task.statusName === 'Done/Published' && <CheckSquare className="w-3 h-3" />}
                                        {task.statusName}
                                    </span>
                                    <select
                                        value={task.statusId}
                                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                                        className="w-[130px] px-2 py-1 text-[11px] border border-gray-300 rounded text-gray-700 outline-none focus:border-blue-400 bg-white"
                                    >
                                        {/* Status dropdown in table might need the full list too, but for now we map to the existing ones */}
                                        <option value={task.statusId}>{task.statusName}</option>
                                    </select>
                                </div>
                            </td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300">
                                {task.assigneeName ? (
                                    <div className="flex flex-col">
                                        <span>{task.assigneeName.split(' ')[0]}</span>
                                        <span>{task.assigneeName.split(' ').slice(1).join(' ')}</span>
                                    </div>
                                ) : '-'}
                            </td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300 text-center">
                                {formatDate(task.date_Start)}
                            </td>
                            <td className="px-3 py-3 text-xs text-gray-700 border border-gray-300 text-center">
                                {task.statusName === 'Done/Published' ? formatDate(task.date_Completed) : '-'}
                            </td>
                        </tr>
                    ))}
                    {(!tasks || tasks.length === 0) && (
                        <tr>
                            <td colSpan="11" className="px-4 py-12 text-center text-gray-500 italic border border-gray-300">
                                No matching project tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
