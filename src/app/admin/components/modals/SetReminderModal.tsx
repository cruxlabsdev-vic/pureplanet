'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Clock, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

interface SetReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
  type: 'contact' | 'quote';
  onSaved: () => void;
}

const QUICK_OPTIONS = [
  { label: '1 Hour', hours: 1 },
  { label: '4 Hours', hours: 4 },
  { label: 'Tomorrow', hours: 24 },
  { label: '3 Days', hours: 72 },
  { label: '1 Week', hours: 168 },
];

export default function SetReminderModal({ isOpen, onClose, contact, type, onSaved }: SetReminderModalProps) {
  const [remindAt, setRemindAt] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleQuickSelect = (hours: number) => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    setRemindAt(date.toISOString().slice(0, 16));
  };

  const handleSave = async () => {
    if (!remindAt) return;

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      await supabase.from('follow_up_reminders').insert({
        lead_id: contact.id,
        lead_type: type,
        [type === 'quote' ? 'quote_id' : 'contact_id']: contact.id,
        remind_at: remindAt,
        message: message || null,
        created_by: user?.id,
      });

      setRemindAt('');
      setMessage('');
      onSaved();
    } catch (error) {
      console.error('Error saving reminder:', error);
      alert('Failed to save reminder. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <Dialog.Title className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Clock size={20} className="text-purple-600" />
                    Set Follow-up Reminder
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <p className="text-sm text-gray-600">
                    Set a reminder for <span className="font-semibold">{contact?.full_name}</span>
                  </p>

                  {/* Quick Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quick Options
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_OPTIONS.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => handleQuickSelect(option.hours)}
                          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Date/Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or Choose Custom Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={remindAt}
                      onChange={(e) => setRemindAt(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C2F32C] focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminder Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Add a note about what to follow up on..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C2F32C] focus:border-transparent transition-all duration-200 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={onClose}
                    disabled={saving}
                    className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !remindAt}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#062d16] text-white font-medium rounded-xl hover:bg-[#0a4a25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Clock size={18} />
                        Set Reminder
                      </>
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
