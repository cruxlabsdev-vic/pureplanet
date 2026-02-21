'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Send, FileText, Loader2 } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome / Thank You',
    subject: 'Thank you for contacting Pure Planet',
    body: `Hi {{name}},

Thank you for reaching out to Pure Planet! We've received your inquiry and a member of our team will be in touch within 24 hours.

In the meantime, if you have any urgent questions, please don't hesitate to call us at 0450 010 419.

Best regards,
The Pure Planet Team`,
  },
  {
    id: 'followup',
    name: 'Quote Follow-up',
    subject: 'Following up on your solar quote - Pure Planet',
    body: `Hi {{name}},

I hope this email finds you well. I wanted to follow up on the solar quote we prepared for you.

Do you have any questions about the system we recommended? I'd be happy to discuss the details or arrange a call at your convenience.

With the Victorian Solar Rebate still available, now is a great time to make the switch to solar.

Looking forward to hearing from you.

Best regards,
The Pure Planet Team`,
  },
  {
    id: 'rebate',
    name: 'Rebate Information',
    subject: 'Your Victorian Solar Rebate eligibility - Pure Planet',
    body: `Hi {{name}},

Great news! Based on the information you provided, you appear to be eligible for the Victorian Solar Rebate of up to $1,400.

This rebate, combined with the federal STC discount, could save you thousands on your new solar system.

Would you like to schedule a free consultation to discuss your options? We can walk you through the entire process.

Best regards,
The Pure Planet Team`,
  },
  {
    id: 'service',
    name: 'Service Inquiry Response',
    subject: 'Re: Your service inquiry - Pure Planet',
    body: `Hi {{name}},

Thank you for contacting us about your service request.

We've noted your inquiry and our service team will be in touch shortly to arrange a suitable time for assessment.

If this is urgent, please call us directly at 0450 010 419.

Best regards,
The Pure Planet Team`,
  },
  {
    id: 'noresponse',
    name: 'No Response Follow-up',
    subject: 'Still interested in solar? - Pure Planet',
    body: `Hi {{name}},

We reached out recently about your interest in solar panels / heat pumps, but haven't heard back from you.

If you're still considering making the switch to clean energy, we'd love to help. The Victorian Solar Rebate is still available, and electricity prices continue to rise.

Feel free to reply to this email or call us at 0450 010 419 when you're ready to chat.

Best regards,
The Pure Planet Team`,
  },
];

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
  onSent: () => void;
  contactType?: 'contact' | 'quote' | 'facebook';
}

export default function SendEmailModal({
  isOpen,
  onClose,
  contact,
  onSent,
  contactType = 'contact',
}: SendEmailModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = EMAIL_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setBody(template.body.replace(/{{name}}/g, contact?.full_name?.split(' ')[0] || 'there'));
    }
  };

  // Send email
  const handleSend = async () => {
    if (!contact?.email) {
      alert('This contact has no email address');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: contact.email,
          subject,
          body,
          contactId: contact.id,
          contactType: contactType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Email API error:', result);
        alert(`Failed to send email: ${result.error || 'Unknown error'}`);
        return;
      }

      alert('Email sent successfully!');
      onSent();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSending(false);
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
              <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <Dialog.Title className="text-lg font-semibold text-gray-800">
                    Send Email to {contact?.full_name}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Template Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Template
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EMAIL_TEMPLATES.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => applyTemplate(template.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
                                   ${selectedTemplate === template.id
                              ? 'bg-[#062d16] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          <FileText size={16} />
                          {template.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* To */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To
                    </label>
                    <input
                      type="email"
                      value={contact?.email || ''}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter email subject..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C2F32C] focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={10}
                      placeholder="Enter your message..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C2F32C] focus:border-transparent transition-all duration-200 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={sending || !subject || !body}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#062d16] text-white font-medium rounded-xl hover:bg-[#0a4a25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Email
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
