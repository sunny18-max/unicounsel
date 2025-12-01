import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  Calendar,
  Download,
  Eye,
  Trash2
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  verified: boolean;
  deadline?: string;
  notes?: string;
  category: string;
}

const documentsByCountry: Record<string, Document[]> = {
  'USA': [
    { id: '1', name: 'Valid Passport', required: true, uploaded: false, verified: false, category: 'Identity', deadline: '2025-02-01' },
    { id: '2', name: 'I-20 Form', required: true, uploaded: false, verified: false, category: 'Admission', deadline: '2025-02-15' },
    { id: '3', name: 'DS-160 Confirmation', required: true, uploaded: false, verified: false, category: 'Visa', deadline: '2025-03-01' },
    { id: '4', name: 'SEVIS Fee Receipt', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-03-01' },
    { id: '5', name: 'Bank Statements (Last 6 months)', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-02-20' },
    { id: '6', name: 'Sponsor Affidavit', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-02-20' },
    { id: '7', name: 'Academic Transcripts', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '8', name: 'English Proficiency Test Scores', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '9', name: 'Passport-sized Photos', required: true, uploaded: false, verified: false, category: 'Identity', deadline: '2025-03-01' },
    { id: '10', name: 'Previous Visa Copies', required: false, uploaded: false, verified: false, category: 'Visa' },
  ],
  'UK': [
    { id: '1', name: 'Valid Passport', required: true, uploaded: false, verified: false, category: 'Identity', deadline: '2025-02-01' },
    { id: '2', name: 'CAS Letter', required: true, uploaded: false, verified: false, category: 'Admission', deadline: '2025-02-15' },
    { id: '3', name: 'TB Test Certificate', required: true, uploaded: false, verified: false, category: 'Medical', deadline: '2025-02-20' },
    { id: '4', name: 'Financial Evidence', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-02-25' },
    { id: '5', name: 'Academic Qualifications', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '6', name: 'English Language Certificate', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '7', name: 'Passport Photos', required: true, uploaded: false, verified: false, category: 'Identity', deadline: '2025-03-01' },
    { id: '8', name: 'Maintenance Funds Proof', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-02-25' },
  ],
  'Canada': [
    { id: '1', name: 'Valid Passport', required: true, uploaded: false, verified: false, category: 'Identity', deadline: '2025-02-01' },
    { id: '2', name: 'Letter of Acceptance', required: true, uploaded: false, verified: false, category: 'Admission', deadline: '2025-02-15' },
    { id: '3', name: 'Proof of Financial Support', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-02-20' },
    { id: '4', name: 'Statement of Purpose', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '5', name: 'Academic Transcripts', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '6', name: 'Language Test Results', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '7', name: 'Medical Examination', required: true, uploaded: false, verified: false, category: 'Medical', deadline: '2025-03-01' },
    { id: '8', name: 'Police Clearance Certificate', required: true, uploaded: false, verified: false, category: 'Legal', deadline: '2025-03-01' },
    { id: '9', name: 'Biometrics Appointment', required: true, uploaded: false, verified: false, category: 'Visa', deadline: '2025-03-05' },
  ],
  'Germany': [
    { id: '1', name: 'Valid Passport', required: true, uploaded: false, verified: false, category: 'Identity', deadline: '2025-02-01' },
    { id: '2', name: 'University Admission Letter', required: true, uploaded: false, verified: false, category: 'Admission', deadline: '2025-02-15' },
    { id: '3', name: 'Blocked Account Confirmation', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-02-25' },
    { id: '4', name: 'Health Insurance', required: true, uploaded: false, verified: false, category: 'Medical', deadline: '2025-03-01' },
    { id: '5', name: 'Academic Certificates', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '6', name: 'Language Proficiency Certificate', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '7', name: 'Motivation Letter', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '8', name: 'CV/Resume', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
  ],
  'Australia': [
    { id: '1', name: 'Valid Passport', required: true, uploaded: false, verified: false, category: 'Identity', deadline: '2025-02-01' },
    { id: '2', name: 'CoE (Confirmation of Enrollment)', required: true, uploaded: false, verified: false, category: 'Admission', deadline: '2025-02-15' },
    { id: '3', name: 'GTE Statement', required: true, uploaded: false, verified: false, category: 'Visa', deadline: '2025-02-20' },
    { id: '4', name: 'Financial Capacity Evidence', required: true, uploaded: false, verified: false, category: 'Financial', deadline: '2025-02-25' },
    { id: '5', name: 'OSHC (Health Insurance)', required: true, uploaded: false, verified: false, category: 'Medical', deadline: '2025-03-01' },
    { id: '6', name: 'Academic Transcripts', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '7', name: 'English Test Scores', required: true, uploaded: false, verified: false, category: 'Academic', deadline: '2025-02-10' },
    { id: '8', name: 'Medical Examination', required: false, uploaded: false, verified: false, category: 'Medical' },
  ]
};

export const VisaChecklist = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [documents, setDocuments] = useState<Document[]>(documentsByCountry[selectedCountry]);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setDocuments(documentsByCountry[country]);
  };

  const handleToggleUpload = (id: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id ? { ...doc, uploaded: !doc.uploaded } : doc
      )
    );
  };

  const categories = ['all', ...new Set(documents.map(d => d.category))];
  const filteredDocs = filterCategory === 'all' 
    ? documents 
    : documents.filter(d => d.category === filterCategory);

  const stats = {
    total: documents.length,
    uploaded: documents.filter(d => d.uploaded).length,
    verified: documents.filter(d => d.verified).length,
    pending: documents.filter(d => !d.uploaded).length,
    required: documents.filter(d => d.required).length
  };

  const progress = (stats.uploaded / stats.total) * 100;

  const getDaysUntilDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Visa Document Checklist</h1>
        <p className="text-body text-muted-foreground">
          Track and manage all required documents for your visa application
        </p>
      </div>

      {/* Country Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Target Country</CardTitle>
          <CardDescription>Choose the country you're applying to</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-heading-3 text-foreground mb-1">{stats.total}</div>
              <p className="text-body-sm text-muted-foreground">Total Documents</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-heading-3 text-success mb-1">{stats.uploaded}</div>
              <p className="text-body-sm text-muted-foreground">Uploaded</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-heading-3 text-glow-cyan mb-1">{stats.verified}</div>
              <p className="text-body-sm text-muted-foreground">Verified</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-heading-3 text-warning mb-1">{stats.pending}</div>
              <p className="text-body-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-heading-3 text-foreground mb-1">{stats.required}</div>
              <p className="text-body-sm text-muted-foreground">Required</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      <Card className="border-glow-cyan/30">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-heading-4 text-foreground">Overall Progress</h3>
              <span className="text-heading-4 text-glow-cyan">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-body-sm text-muted-foreground">
              {stats.uploaded} of {stats.total} documents uploaded
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={filterCategory === cat ? 'default' : 'outline'}
            onClick={() => setFilterCategory(cat)}
            className={filterCategory === cat ? 'bg-glow-cyan text-background' : ''}
          >
            {cat === 'all' ? 'All Documents' : cat}
          </Button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => {
          const daysUntil = getDaysUntilDeadline(doc.deadline);
          const isUrgent = daysUntil !== null && daysUntil <= 7 && daysUntil >= 0;
          const isOverdue = daysUntil !== null && daysUntil < 0;

          return (
            <Card key={doc.id} className={isUrgent ? 'border-warning/50' : isOverdue ? 'border-destructive/50' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={doc.uploaded}
                    onCheckedChange={() => handleToggleUpload(doc.id)}
                    className="mt-1"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-body font-medium text-foreground">{doc.name}</h4>
                          {doc.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {doc.category}
                          </span>
                          {doc.deadline && (
                            <span className={`flex items-center gap-1 ${
                              isOverdue ? 'text-destructive' : isUrgent ? 'text-warning' : ''
                            }`}>
                              <Calendar className="h-3 w-3" />
                              Due: {new Date(doc.deadline).toLocaleDateString()}
                              {daysUntil !== null && daysUntil >= 0 && ` (${daysUntil} days)`}
                              {isOverdue && ' (Overdue)'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {doc.uploaded && (
                          <Badge className="bg-success text-white gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Uploaded
                          </Badge>
                        )}
                        {doc.verified && (
                          <Badge className="bg-glow-cyan text-background gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        {!doc.uploaded && (
                          <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>

                    {doc.notes && (
                      <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg mb-3">
                        <AlertCircle className="h-4 w-4 text-glow-cyan flex-shrink-0 mt-0.5" />
                        <p className="text-body-sm text-foreground">{doc.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {!doc.uploaded ? (
                        <Button size="sm" className="bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Document
                        </Button>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Embassy Appointment Reminder */}
      <Card className="border-glow-blue/30 bg-glow-blue/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-glow-blue/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-glow-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-heading-4 text-foreground mb-2">Embassy Appointment</h3>
              <p className="text-body text-muted-foreground mb-4">
                Once all required documents are uploaded and verified, schedule your embassy appointment.
              </p>
              <Button className="bg-glow-blue text-white hover:bg-glow-blue/90">
                Schedule Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};