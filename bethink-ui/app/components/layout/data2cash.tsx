import { Container, Title, Text, Button, Stack, Grid, Group, Modal, TextInput, Textarea, Paper } from '@mantine/core';
import { useState } from 'react';
import { Leaderboard } from './Leaderboard';
import axios from 'axios';
import { useWalletStore } from "@/app/core";
import { useFileStatus } from "@/app/hooks/useFileStatus";

export default function Data2CashPage() {
  const [copyModalOpened, setCopyModalOpened] = useState(false);
  const [apiModalOpened, setApiModalOpened] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const walletAddress = useWalletStore((state) => state.walletAddress);
  const { addFile } = useFileStatus(null);

  const individualLeaderboard = [
    { rank: 1, name: "John Doe", contribution: 1000 },
    { rank: 2, name: "Jane Smith", contribution: 850 },
    { rank: 3, name: "Bob Johnson", contribution: 720 },
  ];

  const businessLeaderboard = [
    { rank: 1, name: "Tech Corp", contribution: 5000 },
    { rank: 2, name: "Data Inc", contribution: 4200 },
    { rank: 3, name: "Info Systems LLC", contribution: 3800 },
  ];

  const handleSendClick = async () => {
    try {
      await handleAddFile(copiedText);
      setCopyModalOpened(false);
    } catch (error) {
      console.error('Error sending data:', error);
      setResponseMessage(`Failed to send data: ${error.message || 'Unknown error'}`);
    }
  };

  const handleGenerateApiKey = async () => {
    try {
      const newApiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const response = await axios.post('/api/storage/dropbox/etag/routeServer', {
        businessName: businessName,
        walletAddress: walletAddress,
        apiKey: newApiKey,
      });

      console.log('Server response:', response.data);
      setApiKey(newApiKey);
      // 可以在这里添加成功提示
    } catch (error) {
      console.error('Error generating API key:', error);
      // 可以在这里添加错误提示
    }
  };
  
  const handleAddFile = async (data: string) => {
    try {
      // Send data to backend
      const response = await fetch('http://your-backend-url/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url, encryptedKey } = await response.json();

      // Call addFile function from useFileStatus hook
      await addFile(url, encryptedKey);

      setResponseMessage('File added successfully!');
    } catch (error) {
      console.error('Error adding file:', error);
      setResponseMessage(`Failed to add file: ${error.message || 'Unknown error'}`);
    }
  };
  


  return (
    <Container size="xl">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" p="xl" radius="md" style={{ backgroundColor: '#4847ca', height: '100%' }}>
            <Stack spacing="xl" justify="space-between" style={{ height: '100%' }}>
              <Title order={2} align="center" style={{ color: 'white' }}>For individuals, you can:</Title>
              <Group position="center">
                <Button variant="outline" color="white" onClick={() => setCopyModalOpened(true)}>
                  Copy and paste
                </Button>
              </Group>
            </Stack>
          </Paper>
          <Paper mt="xl" shadow="md" p="xl" radius="md" style={{minHeight: '200px'}}>
            <Leaderboard title="Individual Leaderboard" entries={individualLeaderboard} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" p="xl" radius="md" style={{ backgroundColor: '#4847ca', height: '100%' }}>
            <Stack spacing="xl" justify="space-between" style={{ height: '100%' }}>
              <Title order={2} align="center" style={{ color: 'white' }}>For Businesses, you can:</Title>
              <Text align="center" style={{ color: 'white' }}>Generate a custom API key to connect to our server directly</Text>
              <Group position="center">
                <Button variant="outline" color="white" onClick={() => setApiModalOpened(true)}>
                  Generate API key
                </Button>
              </Group>
            </Stack>
          </Paper> 
          <Paper mt="xl" shadow="md" p="xl" radius="md" style={{minHeight: '200px'}}>
            <Leaderboard title="Business Leaderboard" entries={businessLeaderboard} />
          </Paper>
        </Grid.Col>
      </Grid>

      <Modal
        opened={copyModalOpened}
        onClose={() => setCopyModalOpened(false)}
        title="Send Data"
      >
        <Textarea
          placeholder="Paste your text here"
          value={copiedText}
          onChange={(event) => setCopiedText(event.currentTarget.value)}
          minRows={4}
        />
        <Button mt="md" fullWidth onClick={handleSendClick}>
          Send
        </Button>
        {responseMessage && (
          <Text mt="md" color={responseMessage.includes('Error') ? 'red' : 'green'}>
            {responseMessage}
          </Text>
        )}
      </Modal>

      <Modal
        opened={apiModalOpened}
        onClose={() => setApiModalOpened(false)}
        title="Generate API Key"
      >
        <TextInput
          placeholder="Enter your business name"
          value={businessName}
          onChange={(event) => setBusinessName(event.currentTarget.value)}
        />
        <Button mt="md" fullWidth onClick={handleGenerateApiKey}>
          Generate API Key
        </Button>
        {apiKey && (
          <Text mt="md">Your API Key: {apiKey}</Text>
        )}
      </Modal>
    </Container>
  );
}
