import React from 'react';
import dynamic from 'next/dynamic';
import {Button, Text } from '@mantine/core';
import {createStyles} from '@mantine/core'
const Overlay = dynamic(() => import('./Mantine/Overlay'));
const Container = dynamic(() => import('./Mantine/Container'));
const Title = dynamic(() => import('./Mantine/Title'));
//const createStyles = dynamic(() => import('./Mantine/createStyle'));
const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 1,
    position: 'relative',
    justifyContent:'center',
    [theme.fn.smallerThan('sm')]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

export default function HeroContentLeft({loggedIn}) {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>A fully decentralized Learning Hub at your fingertips</Title>
        <Text className={classes.description} size="xl" mt="xl">
          A learning Space DAO, made for your freedom and your privacy, Providing you the endless opportinities to learn in the universe of web 3.0
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={"bg-blue-600 mt-4"}>
          {!loggedIn && 'Get started'}
          {loggedIn && 'Enter DAPP'}
        </Button>
      </Container>
    </div>
  );
}