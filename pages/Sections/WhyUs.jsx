import React from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import Check  from 'tabler-icons-react/dist/icons/check';
import image from './image.svg';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'light' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

export default function HeroBullets() {
  const { classes } = useStyles();
  return (
    <div className='bg-gray-800 text-white'>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
             Why Us? <br /> The Power of Web 3.0    
            </Title>
            <Text color="dimmed" mt="md">
              In decentralized ecosystem, you are the owner of your data, No Trackers, No privacy leakage and safe payment gateway. Our DAO has following to offer
            </Text>

            <List
            className='text-gray-300'
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Platform Token</b> – Our Platform crypto tokens allows you spend in the platform, a fixed supply crypto token that holds your rights
              </List.Item>
              <List.Item>
                <b>Peer 2 Peer Payment GateWay</b> – Instead of Dealing with organization, directly deal with course publisher
              </List.Item>
              <List.Item>
                <b>Very less commision</b> – Just 10% of commision of your each sale
              </List.Item>
              <List.Item>
                <b>Community Voting</b> – Vote for the prosperity of the DAO by staking tokens and vote what is better for everyone
              </List.Item>
            </List>

            <Group mt={30} className={'flex justify-center bg-blue-500 rounded-2xl w-1/3 hover:w-full hover:rounded-[0] duration-300'}>
              <button className='p-2'>Get Started</button>
            </Group>
          </div>
          <Image src={image.src} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}