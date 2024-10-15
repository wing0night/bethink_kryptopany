"use client";

import { Icon } from "@iconify/react";
import {
  Button,
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  Title,
  Image,
  Alert,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { Notification } from "@mantine/core";

const instructions = [
  {
    number: 1,
    title: "AI Interactions: Unleashing the Potential of Your Data",
    description:
      "The exchange between users and AI companions is creating a realm of data assets unlike any before. Ethical concerns that once hindered the monetization of human-to-human emotional data no longer apply. Now, you can freely control and monetize your data assets without reservation.",
  },
  {
    number: 2,
    title: "Monetizing Emotional Data: A Win-Win for All",
    description:
      "For companionship products, harnessing the emotional data of millions is a challenge in effective commercialization. By sharing this data with CompanionDao, with your consent, these products gain additional profit potential while rewarding you, the user.",
  },
  {
    number: 3,
    title: "Beyond Text: The Voice of Data",
    description:
      "As voice interaction becomes the new paradigm for communication with AI, the value of data once locked in textual mediums will be unlocked. Don't limit your imagination to text alone; the voice of data is the voice of the future.",
  },
];

export default function Page() {
  return (
    <Container>
      <Grid>
        <Title order={3} ff="monospace">
          Monetiza your AI Companion Data with CompanionDAO 
        </Title>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack align="stretch" justify="center" gap="lg">
            {instructions.map((instruction, i) => (
              <Stack gap="sm" key={i} className="card">
                <Text c="brand-2" fw="bold">
                  0{instruction.number}
                </Text>
                <Title order={6} c="brand-2">
                  {instruction.title}
                </Title>
                <Text fw="500">{instruction.description}</Text>
              </Stack>
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }} offset={{ md: 1 }}>
          <Stack align="stretch" justify="center" gap="lg">
            <div style={{
              fontFamily: '"Arial Black", Gadget, sans-serif',
              fontSize: '1.2rem',
              color: '#800080',
              textShadow: '2px 2px #00ff00',
              lineHeight: 1.6,
              opacity: 1,
              marginBottom: '20px',
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}>
              <p>In an era where human connection is increasingly scarce, AI emotional companionship is bridging the gap, becoming an integral part of daily life. As AI companionship products proliferate, the data generated through interactions presents a vast, untapped "gold mine" of new opportunities.</p>
            </div>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
