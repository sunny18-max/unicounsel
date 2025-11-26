export interface UniversityData {
  name: string;
  url: string;
  latitude: number;
  longitude: number;
  address: string;
  country: string;
  city: string;
}

export const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};

export const parseUniversityCSV = (csvContent: string): UniversityData[] => {
  const lines = csvContent.split('\n');
  const universities: UniversityData[] = [];
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const fields = parseCSVLine(line);
    if (fields.length < 5) continue;
    
    const address = fields[4] || '';
    const addressParts = address.split(',').map(p => p.trim());
    const country = addressParts[addressParts.length - 1] || 'Unknown';
    const city = addressParts.length > 1 ? addressParts[addressParts.length - 2] : 'Unknown';
    
    universities.push({
      name: fields[0],
      url: fields[1],
      latitude: parseFloat(fields[2]) || 0,
      longitude: parseFloat(fields[3]) || 0,
      address: address,
      country: country,
      city: city
    });
  }
  
  return universities;
};