import React from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../shared/ui/utils';
import { Button } from '../../../shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../../shared/ui/dialog';
import { Card, CardContent } from '../../../shared/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../shared/ui/select';
import { Textarea } from '../../../shared/ui/textarea';
import { Calendar } from '../../../shared/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../../shared/ui/popover';
import {
    useProjects,
    useCategories,
    useMainTasks,
    useSubtasks,
    useSubtaskCategories,
    useAssignees,
    useStatuses,
    useTaskMutations
} from '../../project-tracker/hooks/useProjectTracker';

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
    const [formData, setFormData] = React.useState({
        projectId: '',
        categoryId: '',
        mainTaskId: '',
        subtaskId: '',
        subtaskCategoryId: '',
        details: '',
        statusId: '',
        assigneeId: '',
        createDate: new Date().toISOString(),
        completeDate: ''
    });

    const { data: projects } = useProjects();
    const { data: categories } = useCategories(formData.projectId);
    const { data: mainTasks } = useMainTasks(formData.categoryId);
    const { data: subtasks } = useSubtasks(formData.mainTaskId);
    const { data: subtaskCategories } = useSubtaskCategories(formData.subtaskId);
    const { data: assignees } = useAssignees();
    const { data: statuses } = useStatuses();
    const { createMutation } = useTaskMutations();

    const handleChange = (name: string, value: string) => {
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Cascading reset
            if (name === 'projectId') {
                newData.categoryId = '';
                newData.mainTaskId = '';
                newData.subtaskId = '';
                newData.subtaskCategoryId = '';
            } else if (name === 'categoryId') {
                newData.mainTaskId = '';
                newData.subtaskId = '';
                newData.subtaskCategoryId = '';
            } else if (name === 'mainTaskId') {
                newData.subtaskId = '';
                newData.subtaskCategoryId = '';
            } else if (name === 'subtaskId') {
                newData.subtaskCategoryId = '';
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const selectedProject = (projects as any)?.find((p: any) => p.id.toString() === formData.projectId);
            const selectedCategory = (categories as any)?.find((c: any) => c.id.toString() === formData.categoryId);
            const selectedMainTask = (mainTasks as any)?.find((m: any) => m.id.toString() === formData.mainTaskId);
            const selectedSubtask = (subtasks as any)?.find((s: any) => s.id.toString() === formData.subtaskId);
            const selectedSubCat = (subtaskCategories as any)?.find((sc: any) => sc.id.toString() === formData.subtaskCategoryId);
            const selectedStatus = (statuses as any)?.find((s: any) => s.id.toString() === formData.statusId);
            const selectedAssignee = (assignees as any)?.find((a: any) => a.id.toString() === formData.assigneeId);

            await (createMutation as any).mutateAsync({
                projectId: parseInt(formData.projectId),
                projectName: selectedProject?.name,
                categoryId: parseInt(formData.categoryId),
                categoryName: selectedCategory?.name,
                maintaskId: parseInt(formData.mainTaskId),
                maintaskName: selectedMainTask?.name,
                subtaskId: parseInt(formData.subtaskId),
                subtaskName: selectedSubtask?.name,
                subtask_CategoryId: parseInt(formData.subtaskCategoryId),
                subtask_CategoryName: selectedSubCat?.name,
                assigneeId: parseInt(formData.assigneeId),
                assigneeName: selectedAssignee?.name,
                statusId: parseInt(formData.statusId),
                statusName: selectedStatus?.name,
                details: formData.details,
                date_Start: formData.createDate,
                date_Completed: formData.completeDate ? formData.completeDate : null,
            });
            onClose();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
                    <DialogTitle className="text-xl font-bold text-gray-900">New Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 px-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Project</label>
                            <Select value={formData.projectId} onValueChange={(v) => handleChange('projectId', v)}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select project" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(projects as any)?.map((p: any) => <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Category</label>
                            <Select value={formData.categoryId} onValueChange={(v) => handleChange('categoryId', v)} disabled={!formData.projectId}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(categories as any)?.map((c: any) => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Main Task</label>
                            <Select value={formData.mainTaskId} onValueChange={(v) => handleChange('mainTaskId', v)} disabled={!formData.categoryId}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select main task" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(mainTasks as any)?.map((m: any) => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Subtask</label>
                            <Select value={formData.subtaskId} onValueChange={(v) => handleChange('subtaskId', v)} disabled={!formData.mainTaskId}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select subtask" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(subtasks as any)?.map((s: any) => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Select Subtask Category</label>
                            <Select value={formData.subtaskCategoryId} onValueChange={(v) => handleChange('subtaskCategoryId', v)} disabled={!formData.subtaskId}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select subtask category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(subtaskCategories as any)?.map((sc: any) => <SelectItem key={sc.id} value={sc.id.toString()}>{sc.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Details (Optional)</label>
                        <Textarea
                            placeholder="Add project details"
                            className="resize-none min-h-[100px] bg-white"
                            value={formData.details}
                            onChange={(e) => handleChange('details', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Status</label>
                            <Select value={formData.statusId} onValueChange={(v) => handleChange('statusId', v)}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(statuses as any)?.map((s: any) => (
                                        <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Assignee</label>
                            <Select value={formData.assigneeId} onValueChange={(v) => handleChange('assigneeId', v)}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(assignees as any)?.map((a: any) => <SelectItem key={a.id} value={a.id.toString()}>{a.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date fields simplified for now as Popover + Calendar interaction in TS varies */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Create Date</label>
                            <input
                                type="date"
                                className="w-full flex h-11 rounded-md border border-input bg-white px-3 py-2 text-sm"
                                value={formData.createDate.split('T')[0]}
                                onChange={(e) => handleChange('createDate', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Complete Date</label>
                            <input
                                type="date"
                                className="w-full flex h-11 rounded-md border border-input bg-white px-3 py-2 text-sm"
                                value={formData.completeDate}
                                onChange={(e) => handleChange('completeDate', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6 border-t mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="px-6 h-11 border-gray-300 text-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-8 h-11 bg-[#E10600] text-white hover:bg-[#c40500]"
                            disabled={createMutation.isPending}
                        >
                            {createMutation.isPending ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

