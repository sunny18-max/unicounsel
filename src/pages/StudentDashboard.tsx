import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Flex, Heading, Text, Card } from '../theme/styled';
import { VoiceAssistant } from '../components/VoiceAssistant';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
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
    <Container maxWidth="xl">
      <Box my="xl">
        <Flex justifyContent="space-between" alignItems="center" mb="xl">
          <div>
            <Heading as="h1" mb="sm">Welcome back, Student</Heading>
            <Text color="text.secondary">Find your perfect study abroad match</Text>
          </div>
          <Button onClick={handleFindMatches}>
            Find Matches
          </Button>
        </Flex>

        {matches.length > 0 ? (
          <Box>
            <Heading as="h2" mb="md" fontSize="xl">Your Matches</Heading>
            <Flex gap="md" flexWrap="wrap">
              {matches.slice(0, 3).map((match, index) => (
                <Card key={index} p="lg" width="300px">
                  <Heading as="h3" fontSize="lg" mb="sm">{match.university}</Heading>
                  <Text color="text.secondary" fontSize="sm" mb="md">{match.program}</Text>
                  <Text mb="sm">Match Score: {match.matchScore}%</Text>
                  <Button size="sm" variant="outline" width="100%">
                    View Details
                  </Button>
                </Card>
              ))}
            </Flex>
          </Box>
        ) : (
          <Box textAlign="center" py="3xl">
            <Box 
              bg="background.paper" 
              p="xl" 
              borderRadius="lg" 
              maxWidth="600px" 
              mx="auto"
            >
              <Heading as="h2" mb="md" fontSize="xl">Get Started</Heading>
              <Text color="text.secondary" mb="xl">
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
