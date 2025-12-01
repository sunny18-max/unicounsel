import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FolderLock, 
  Upload, 
  Download, 
  Eye, 
  Trash2,
  FileText,
  Image as ImageIcon,
  File,
  Share2,
  Lock,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: Date;
  expiryDate?: Date;
  encrypted: boolean;
  shared: boolean;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Passport.pdf',
    type: 'PDF',
    category: 'Identity',
    size: '2.4 MB',
    uploadDate: new Date('2024-01-15'),
    expiryDate: new Date('2030-01-15'),
    encrypted: true,
    shared: false
  },
  {
    id: '2',
    name: 'Student_Visa.pdf',
    type: 'PDF',
    category: 'Visa',
    size: '1.8 MB',
    uploadDate: new Date('2024-02-20'),
    expiryDate: new Date('2026-08-30'),
    encrypted: true,
    shared: false
  },
  {
    id: '3',
    name: 'Degree_Certificate.pdf',
    type: 'PDF',
    category: 'Academic',
    size: '3.2 MB',
    uploadDate: new Date('2024-01-10'),
    encrypted: true,
    shared: true
  },
  {
    id: '4',
    name: 'Bank_Statement_Jan2024.pdf',
    type: 'PDF',
    category: 'Financial',
    size: '1.5 MB',
    uploadDate: new Date('2024-02-01'),
    encrypted: true,
    shared: false
  },
  {
    id: '5',
    name: 'Tuition_Fee_Receipt.pdf',
    type: 'PDF',
    category: 'Financial',
    size: '890 KB',
    uploadDate: new Date('2024-03-01'),
    encrypted: true,
    shared: false
  },
  {
    id: '6',
    name: 'Health_Insurance.pdf',
    type: 'PDF',
    category: 'Medical',
    size: '1.2 MB',
    uploadDate: new Date('2024-02-15'),
    expiryDate: new Date('2025-02-15'),
    encrypted: true,
    shared: false
  },
  {
    id: '7',
    name: 'Vaccination_Certificate.pdf',
    type: 'PDF',
    category: 'Medical',
    size: '650 KB',
    uploadDate: new Date('2024-01-20'),
    encrypted: true,
    shared: false
  },
  {
    id: '8',
    name: 'Accommodation_Contract.pdf',
    type: 'PDF',
    category: 'Housing',
    size: '2.1 MB',
    uploadDate: new Date('2024-02-25'),
    expiryDate: new Date('2025-08-31'),
    encrypted: true,
    shared: false
  }
];

export const DocumentVault = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(documents.map(d => d.category))];
  
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: documents.length,
    encrypted: documents.filter(d => d.encrypted).length,
    shared: documents.filter(d => d.shared).length,
    expiringSoon: documents.filter(d => {
      if (!d.expiryDate) return false;
      const daysUntil = Math.floor((d.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 30 && daysUntil > 0;
    }).length
  };

  const totalSize = documents.reduce((sum, doc) => {
    const size = parseFloat(doc.size);
    const unit = doc.size.includes('MB') ? 1 : 0.001;
    return sum + (size * unit);
  }, 0);

  const getDaysUntilExpiry = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    const daysUntil = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  const getFileIcon = (type: string) => {
    if (type === 'PDF') return FileText;
    if (type.includes('image')) return ImageIcon;
    return File;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Secure Document Vault</h1>
        <p className="text-body text-muted-foreground">
          Store all your important documents in one encrypted, safe place
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-cyan/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-glow-cyan" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{stats.total}</div>
                <p className="text-body-sm text-muted-foreground">Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{stats.encrypted}</div>
                <p className="text-body-sm text-muted-foreground">Encrypted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-blue/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-glow-blue" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{stats.shared}</div>
                <p className="text-body-sm text-muted-foreground">Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{stats.expiringSoon}</div>
                <p className="text-body-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Info */}
      <Card className="border-glow-cyan/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-heading-4 text-foreground">Storage Used</h3>
            <span className="text-body text-glow-cyan">{totalSize.toFixed(1)} MB / 5 GB</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-glow-cyan to-glow-blue"
              style={{ width: `${(totalSize / 5000) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Documents</CardTitle>
          <CardDescription>Upload, search, and organize your files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => {
          const FileIcon = getFileIcon(doc.type);
          const daysUntilExpiry = getDaysUntilExpiry(doc.expiryDate);
          const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 30 && daysUntilExpiry > 0;
          const isExpired = daysUntilExpiry !== null && daysUntilExpiry < 0;

          return (
            <Card key={doc.id} className={isExpiringSoon ? 'border-warning/50' : isExpired ? 'border-destructive/50' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <FileIcon className="h-6 w-6 text-glow-cyan" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h4 className="text-body font-medium text-foreground mb-1">{doc.name}</h4>
                        <div className="flex items-center gap-3 text-body-sm text-muted-foreground flex-wrap">
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploadDate.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {doc.encrypted && (
                          <Badge className="bg-success text-white gap-1">
                            <Lock className="h-3 w-3" />
                            Encrypted
                          </Badge>
                        )}
                        {doc.shared && (
                          <Badge className="bg-glow-blue text-white gap-1">
                            <Share2 className="h-3 w-3" />
                            Shared
                          </Badge>
                        )}
                      </div>
                    </div>

                    {doc.expiryDate && (
                      <div className={`flex items-center gap-2 mb-3 text-body-sm ${
                        isExpired ? 'text-destructive' : isExpiringSoon ? 'text-warning' : 'text-muted-foreground'
                      }`}>
                        {isExpired ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                        <span>
                          {isExpired 
                            ? `Expired ${Math.abs(daysUntilExpiry!)} days ago`
                            : `Expires on ${doc.expiryDate.toLocaleDateString()} (${daysUntilExpiry} days)`
                          }
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderLock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-heading-3 text-foreground mb-2">No Documents Found</h3>
            <p className="text-body text-muted-foreground mb-4">
              Try adjusting your search or upload your first document
            </p>
            <Button className="bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Security Info */}
      <Card className="border-success/30 bg-success/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="text-heading-4 text-foreground mb-2">Bank-Level Security</h3>
              <p className="text-body text-muted-foreground mb-3">
                All your documents are encrypted with AES-256 encryption and stored securely in the cloud. 
                Automatic backups ensure you never lose your important files.
              </p>
              <div className="flex gap-2">
                <Badge className="bg-success text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  256-bit Encryption
                </Badge>
                <Badge className="bg-success text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Auto Backup
                </Badge>
                <Badge className="bg-success text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Secure Access
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};