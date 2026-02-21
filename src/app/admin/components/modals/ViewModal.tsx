'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Mail, Phone, MapPin, Calendar, FileText, MessageSquare, Clock, Facebook, Home, Zap } from 'lucide-react';
import { format } from 'date-fns';

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
  type: 'contact' | 'quote' | 'facebook';
}

export default function ViewModal({ isOpen, onClose, contact, type }: ViewModalProps) {
  if (!contact) return null;

  // Get lead score color
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Hot Lead';
    if (score >= 40) return 'Warm Lead';
    return 'Standard Lead';
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
              <Dialog.Panel className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div>
                    <Dialog.Title className="text-lg font-semibold text-gray-800">
                      {contact.full_name}
                    </Dialog.Title>
                    <p className="text-sm text-gray-500 mt-1">
                      {type === 'facebook'
                        ? 'Source: Facebook Lead Ads'
                        : `Ref: ${contact.reference_number || 'N/A'}`}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Lead Score (for quotes and facebook) */}
                  {(type === 'quote' || type === 'facebook') && contact.lead_score !== undefined && (
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-xl font-semibold ${getScoreColor(contact.lead_score)}`}>
                        Score: {contact.lead_score} - {getScoreLabel(contact.lead_score)}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    {contact.phone && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Phone size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-800">
                            <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                              {contact.phone}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {contact.email && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Mail size={20} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-800">
                            <a href={`mailto:${contact.email}`} className="hover:text-green-600">
                              {contact.email}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Address (for quotes) */}
                    {contact.address && (
                      <div className="flex items-start gap-3 md:col-span-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <MapPin size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {type === 'facebook' ? 'City' : 'Address'}
                          </p>
                          <p className="font-medium text-gray-800">{contact.address}</p>
                        </div>
                      </div>
                    )}

                    {/* Created Date */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Calendar size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submitted</p>
                        <p className="font-medium text-gray-800">
                          {format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>

                    {/* Inquiry Type / Service Type (not for facebook) */}
                    {type !== 'facebook' && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <FileText size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {type === 'contact' ? 'Inquiry Type' : 'Service Type'}
                          </p>
                          <p className="font-medium text-gray-800">
                            {contact.inquiry_type || contact.service_type || 'N/A'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Facebook-Specific Fields */}
                  {type === 'facebook' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-xl">
                      {contact.ad_name && (
                        <div>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Facebook size={14} /> Ad Name
                          </p>
                          <p className="font-medium text-gray-800">{contact.ad_name}</p>
                        </div>
                      )}
                      {contact.campaign_name && (
                        <div>
                          <p className="text-sm text-gray-500">Campaign</p>
                          <p className="font-medium text-gray-800">{contact.campaign_name}</p>
                        </div>
                      )}
                      {contact.form_name && (
                        <div>
                          <p className="text-sm text-gray-500">Form Name</p>
                          <p className="font-medium text-gray-800">{contact.form_name}</p>
                        </div>
                      )}
                      {contact.zip_code && (
                        <div>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={14} /> Postcode
                          </p>
                          <p className="font-medium text-gray-800">{contact.zip_code}</p>
                        </div>
                      )}
                      {contact.property_ownership && (
                        <div>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Home size={14} /> Property Ownership
                          </p>
                          <p className="font-medium text-gray-800">{contact.property_ownership}</p>
                        </div>
                      )}
                      {contact.quarterly_bill_range && (
                        <div>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Zap size={14} /> Quarterly Bill
                          </p>
                          <p className="font-medium text-gray-800">{contact.quarterly_bill_range}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quote Specific Fields */}
                  {type === 'quote' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                      {contact.property_type && (
                        <div>
                          <p className="text-sm text-gray-500">Property Type</p>
                          <p className="font-medium text-gray-800">{contact.property_type}</p>
                        </div>
                      )}
                      {contact.roof_type && (
                        <div>
                          <p className="text-sm text-gray-500">Roof Type</p>
                          <p className="font-medium text-gray-800">{contact.roof_type}</p>
                        </div>
                      )}
                      {contact.electricity_bill && (
                        <div>
                          <p className="text-sm text-gray-500">Electricity Bill</p>
                          <p className="font-medium text-gray-800">${contact.electricity_bill}/quarter</p>
                        </div>
                      )}
                      {contact.solar_interest && (
                        <div>
                          <p className="text-sm text-gray-500">Solar Interest</p>
                          <p className="font-medium text-gray-800">{contact.solar_interest}</p>
                        </div>
                      )}
                      {contact.battery_interest !== undefined && (
                        <div>
                          <p className="text-sm text-gray-500">Battery Interest</p>
                          <p className="font-medium text-gray-800">{contact.battery_interest ? 'Yes' : 'No'}</p>
                        </div>
                      )}
                      {contact.timeline && (
                        <div>
                          <p className="text-sm text-gray-500">Timeline</p>
                          <p className="font-medium text-gray-800">{contact.timeline}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message */}
                  {(contact.message || contact.other_message) && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                        <MessageSquare size={16} />
                        Message
                      </p>
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {contact.message || contact.other_message}
                      </p>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Clock size={18} />
                      Activity Timeline
                    </h3>
                    <div className="space-y-3">
                      {/* Created */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div className="w-0.5 h-full bg-gray-200" />
                        </div>
                        <div className="pb-4">
                          <p className="font-medium text-gray-800">Lead Created</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>

                      {/* Notes would go here */}
                      {contact.notes && contact.notes.length > 0 && contact.notes.map((note: any) => (
                        <div key={note.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full" />
                            <div className="w-0.5 h-full bg-gray-200" />
                          </div>
                          <div className="pb-4">
                            <p className="font-medium text-gray-800">Note Added</p>
                            <p className="text-sm text-gray-600">{note.content}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(note.created_at), 'MMM d, yyyy h:mm a')}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Emails would go here */}
                      {contact.emails_sent && contact.emails_sent.length > 0 && contact.emails_sent.map((email: any) => (
                        <div key={email.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <div className="w-0.5 h-full bg-gray-200" />
                          </div>
                          <div className="pb-4">
                            <p className="font-medium text-gray-800">Email Sent</p>
                            <p className="text-sm text-gray-600">{email.subject}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(email.sent_at), 'MMM d, yyyy h:mm a')}
                              {email.opened && (
                                <span className="ml-2 text-green-600">
                                  Opened {email.opened_count} time(s)
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Reminders */}
                      {contact.reminders && contact.reminders.length > 0 && contact.reminders.map((reminder: any) => (
                        <div key={reminder.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${reminder.completed ? 'bg-gray-400' : 'bg-orange-500'}`} />
                            <div className="w-0.5 h-full bg-gray-200" />
                          </div>
                          <div className="pb-4">
                            <p className="font-medium text-gray-800">
                              Reminder {reminder.completed ? '(Completed)' : 'Set'}
                            </p>
                            {reminder.message && (
                              <p className="text-sm text-gray-600">{reminder.message}</p>
                            )}
                            <p className="text-sm text-gray-500">
                              Due: {format(new Date(reminder.remind_at), 'MMM d, yyyy h:mm a')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Close
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
