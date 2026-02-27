import { Settings } from 'lucide-react';

export function SettingsView() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-100 rounded-lg">
                    <Settings className="h-6 w-6 text-[#E10600]" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500">Manage your project tracker preferences and configurations.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-900">Notifications</div>
                                <div className="text-sm text-gray-500">Receive alerts for project updates and mentions.</div>
                            </div>
                            <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
