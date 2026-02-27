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

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
    const [createDate, setCreateDate] = React.useState<Date>();
    const [completeDate, setCompleteDate] = React.useState<Date>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for submitting the form would go here
        console.log('Form submitted');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
                    <DialogTitle className="text-xl font-bold text-gray-900">New Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 px-1">
                    {/* Main Select Fields - 2 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Project</label>
                            <Select>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select project" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="project-1">Global Campaign</SelectItem>
                                    <SelectItem value="project-2">Social Media Launch</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Category</label>
                            <Select>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cat-1">Marketing</SelectItem>
                                    <SelectItem value="cat-2">Digital</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Main Task</label>
                            <Select>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select main task" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="task-1">Content Strategy</SelectItem>
                                    <SelectItem value="task-2">Design Phase</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Subtask</label>
                            <Select>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select subtask" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sub-1">Initial Draft</SelectItem>
                                    <SelectItem value="sub-2">Final Review</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Select Subtask Category</label>
                            <Select>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select subtask category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sc-1">Creative</SelectItem>
                                    <SelectItem value="sc-2">Technical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Details (Optional)</label>
                        <Textarea
                            placeholder="Add project details"
                            className="resize-none min-h-[100px] bg-white"
                        />
                    </div>

                    {/* Additional Fields - 2 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Status</label>
                            <Select>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="editing">Editing</SelectItem>
                                    <SelectItem value="review">Review</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Assignee</label>
                            <Select>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sarah">Sarah Chen</SelectItem>
                                    <SelectItem value="michael">Michael Rodriguez</SelectItem>
                                    <SelectItem value="emily">Emily Parker</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Create Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-white h-11",
                                            !createDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {createDate ? format(createDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 border-0 shadow-none bg-transparent" align="start">
                                    <Card className="p-0 border-0 shadow-lg overflow-hidden">
                                        <CardContent className="p-0">
                                            <Calendar
                                                mode="single"
                                                selected={createDate}
                                                onSelect={setCreateDate}
                                                initialFocus
                                            />
                                        </CardContent>
                                    </Card>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Complete Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-white h-11",
                                            !completeDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {completeDate ? format(completeDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 border-0 shadow-none bg-transparent" align="start">
                                    <Card className="p-0 border-0 shadow-lg overflow-hidden">
                                        <CardContent className="p-0">
                                            <Calendar
                                                mode="single"
                                                selected={completeDate}
                                                onSelect={setCompleteDate}
                                                initialFocus
                                            />
                                        </CardContent>
                                    </Card>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Action Buttons */}
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
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
