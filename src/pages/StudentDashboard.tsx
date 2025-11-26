import React from 'react';
import { Box, Button, Container, Flex, Heading, Text, Card } from '../theme/styled';
import { VoiceAssistant } from '../components/VoiceAssistant';

const StudentDashboard: React.FC = () => {
  const [showVoiceAssistant, setShowVoiceAssistant] = React.useState(false);
  const [matches, setMatches] = React.useState<any[]>([]);

  const handleFindMatches = () => {
    setShowVoiceAssistant(true);
  };

  const handleVoiceAssistantComplete = (matches: any[]) => {
    setShowVoiceAssistant(false);
    setMatches(matches);
  };

  if (showVoiceAssistant) {
    return <VoiceAssistant onComplete={handleVoiceAssistantComplete} />;
  }

  return (
    <Container>
      <Box my="xl">
        <Flex justify="space-between" align="center" style={{ marginBottom: '2rem' }}>
          <div>
            <Heading variant="h1" style={{ marginBottom: '0.5rem' }}>Welcome back, Student</Heading>
            <Text color="text.secondary">Find your perfect study abroad match</Text>
          </div>
          <Button onClick={handleFindMatches}>
            Find Matches
          </Button>
        </Flex>

        {matches.length > 0 ? (
          <Box>
            <Heading variant="h2" style={{ marginBottom: '1rem', fontSize: '2rem' }}>Your Matches</Heading>
            <Flex gap="md" wrap="wrap">
              {matches.slice(0, 3).map((match, index) => (
                <Card key={index} p="lg" style={{ width: '300px' }}>
                  <Heading variant="h3" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{match.university}</Heading>
                  <Text color="text.secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{match.program}</Text>
                  <Text style={{ marginBottom: '0.5rem' }}>Match Score: {match.matchScore}%</Text>
                  <Button size="sm" variant="outline" fullWidth>
                    View Details
                  </Button>
                </Card>
              ))}
            </Flex>
          </Box>
        ) : (
          <Box style={{ textAlign: 'center' }} py="3xl">
            <Box 
              bg="surface" 
              p="xl" 
              borderRadius="lg" 
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <Heading variant="h2" style={{ marginBottom: '1rem', fontSize: '2rem' }}>Get Started</Heading>
              <Text color="text.secondary" style={{ marginBottom: '2rem' }}>
                Click the "Find Matches" button to start your journey to finding the perfect study abroad program.
                Our AI assistant will ask you a few questions to understand your preferences.
              </Text>
              <Button onClick={handleFindMatches}>
                Find Matches
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default StudentDashboard;