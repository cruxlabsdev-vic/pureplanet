'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, MessageSquare, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
  type: 'contact' | 'quote';
  onSaved: () => void;
}

export default function AddNoteModal({ isOpen, onClose, contact, type, onSaved }: AddNoteModalProps) {
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSave = async () => {
    if (!note.trim()) return;

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const noteData: any = {
        lead_id: contact.id,
        lead_type: type,
        content: note,
      };

      // Set the appropriate foreign key
      if (type === 'quote') {
        noteData.quote_id = contact.id;
      } else {
        noteData.contact_id = contact.id;
      }

      // Only set created_by if user exists - but skip for now due to FK constraint
      // If you add this user to admin_users table, you can re-enable this
      // if (user?.id) {
      //   noteData.created_by = user.id;
      // }

      const { error } = await supabase.from('notes').insert(noteData);

      if (error) {
        console.error('Error inserting note:', error);
        alert(`Failed to save note: ${error.message}`);
        return;
      }

      setNote('');
      onSaved();
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
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
                    <MessageSquare size={20} className="text-purple-600" />
                    Add Note
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Add an internal note for <span className="font-semibold">{contact?.full_name}</span>
                  </p>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={6}
                    placeholder="Enter your note here..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C2F32C] focus:border-transparent transition-all duration-200 outline-none resize-none"
                  />
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
                    disabled={saving || !note.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#062d16] text-white font-medium rounded-xl hover:bg-[#0a4a25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <MessageSquare size={18} />
                        Save Note
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
