import React from 'react';
import dynamic from 'next/dynamic';
import { createStyles, Col } from '@mantine/core';
//import { ReceiptOff, FileCode, Affiliate, BrandTripadvisor } from 'tabler-icons-react';
import ReceiptOff from 'tabler-icons-react/dist/icons/receipt-off';
import FileCode from 'tabler-icons-react/dist/icons/file-code';
import Affiliate from 'tabler-icons-react/dist/icons/affiliate';
import BrandTripadvisor from 'tabler-icons-react/dist/icons/brand-tripadvisor';
const Title = dynamic(() => import('../../components/Mantine/Title'));
const SimpleGrid = dynamic(() => import('../../components/Mantine/SimpleGrid'));
const Text = dynamic(() => import('../../components/Mantine/Text'));
const Button = dynamic(() => import('../../components/Mantine/Button'));
const ThemeIcon = dynamic(() => import('../../components/Mantine/ThemeIcon'));
const Grid = dynamic(() => import('../../components/Mantine/Grid'));

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: ReceiptOff,
    title: 'No Monopoly',
    description: 'The platform is designed to give you ownership of your data, We value your effort and give you the max outcom as possible',
  },
  {
    icon: FileCode,
    title: 'Open Source',
    description: 'Our Platform is open source, so anyone can contribute and spread positivity',
  },
  {
    icon: Affiliate,
    title: 'Decenterlized ',
    description:
      'A totally decentralized system, that gives you a huge freedom, so you focus on your things',
  },
  {
    icon: BrandTripadvisor,
    title: 'Privacy',
    description:
      'Your data and activity is private to everyone , we value your privacy',
  },
];

export default function FeaturesTitle() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon size={26} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            Why Publish Projects on Skillz Stack?
          </Title>
          <Text color="dimmed">
            We value your time and effors. We do our best, to get you max outcome of your work, The ecofriendly solution
            whole primary focus is to satisfy you and so you are motive to do , what is you are supposed to do
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Get started
          </Button>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>
  );
}