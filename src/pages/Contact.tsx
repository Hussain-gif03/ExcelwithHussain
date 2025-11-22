import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const faqs = [
    {
      question: 'How long does it take to complete the course?',
      answer: 'The course is self-paced, so you can complete it at your own speed. On average, students complete all three levels in 4-6 weeks with consistent study.'
    },
    {
      question: 'Do I need any prior Excel experience?',
      answer: 'No prior experience is required! Our Beginner Level starts with the basics and gradually builds your skills.'
    },
    {
      question: 'What happens if I fail a quiz?',
      answer: 'You can retake quizzes as many times as needed. We encourage you to review the lesson material before retaking.'
    },
    {
      question: 'Is the certificate recognized?',
      answer: 'The certificate demonstrates your completion of our comprehensive Excel training program and can be shared on your resume or LinkedIn profile.'
    },
    {
      question: 'Can I access the course on mobile devices?',
      answer: 'Yes! Our platform is fully responsive and works on desktop, tablet, and mobile devices.'
    },
    {
      question: 'How do I track my progress?',
      answer: 'Your dashboard provides detailed progress tracking, showing completed lessons, quiz scores, and overall completion percentage.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-card">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:hussainkhancoc47@gmail.com" 
                className="text-primary hover:underline break-all"
              >
                hussainkhancoc47@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <div className="p-3 bg-secondary/10 rounded-lg w-fit mb-2">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="tel:+918792409839" 
                className="text-primary hover:underline"
              >
                +91 87924 09839
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Mohammed Hussain</p>
              <p className="text-sm text-muted-foreground">Excel Expert</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elegant mb-12">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" size="lg" disabled={submitting}>
                <Send className="h-4 w-4 mr-2" />
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to common questions about our Excel training program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
