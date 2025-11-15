import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitContactForm = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return false;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        setIsSubmitting(false);
        return false;
      }

      // Insert into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone ? formData.phone.trim() : null,
            subject: formData.subject.trim(),
            message: formData.message.trim(),
          },
        ]);

      if (error) {
        console.error('Error submitting contact form:', error);
        toast.error('Failed to submit form. Please try again.');
        setIsSubmitting(false);
        return false;
      }

      // Success
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setIsSuccess(true);
      setIsSubmitting(false);
      return true;

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
      return false;
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
  };

  return {
    submitContactForm,
    isSubmitting,
    isSuccess,
    resetForm,
  };
};
